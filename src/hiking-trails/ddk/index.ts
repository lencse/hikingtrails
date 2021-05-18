import { load as cheerioLoad } from "cheerio";
import { readFileSync } from "fs";
import { writeFileSync } from "fs";
import { sep, resolve } from "path";
import { httpGet } from "../../http";
import { distanceInMeters } from "../../map/path";
import { HikingTrail, HikingTrailLoader } from "../../types";
import { parseXml } from "../../xml";
import { pointsFromGpx } from "../../xml/gpx";
import getCheckpoints from "../domosi-kor/checkpoints";


const findByPattern = (links: string[], pattern: RegExp): string => links.filter(link => link.match(pattern))[0]

const stampsFromGpx = async (gpx: string): Promise<any[]> => {
    const data: any = await parseXml(gpx)
    return data.gpx
        .wpt
        .map((node) => ({
            point: {
                lat: Number(node.$.lat),
                lon: Number(node.$.lon),
                elevation: 0
            },
            description: String(node.desc[0]),
            name: String(node.name[0])
        }))
}

const id: string = __dirname.split(sep).pop()

const meta = {
    id,
    name: 'Rockenbauer Pál Dél Dunántúri Kéktúra'
}

const getLinkUrlsFromHtml = (html: string): { links: string[] } => {
    const dom = cheerioLoad(html)
    const links: any = dom('a[href]')
    const result = []
    for (let i = 0; i < links.length; ++i) {
        result.push(links[i].attribs.href)
    }
    return {
        links: result
    }
}

async function load() {
    const init = 'https://www.kektura.hu/rpddk-szakaszok'
    let d: any = await httpGet(init)
    d = getLinkUrlsFromHtml(d)
    d = ((args: any): any => ({
        pathGpxUrl: findByPattern(args.links, /rpddk_teljes_[0-9_]+\.gpx/),
        stampGpxUrl: findByPattern(args.links, /rpddk_bh_[0-9_]+\.gpx/)
    }))(d)
    d = await (async (args: any): Promise<any> => ({
        pathGpx: await httpGet(args.pathGpxUrl),
        stampGpx: await httpGet(args.stampGpxUrl),
    }))(d)
    d = await (async (args: any): Promise<any> => ({
        path: (await pointsFromGpx(args.pathGpx)),
        // path: (await pointsFromGpx(args.pathGpx)).filter((p, idx) => 0 === idx % 300),
        stampingLocations: (await stampsFromGpx(args.stampGpx))
    }))(d)
    d = ((args: any): any => {
        return  {
            ...args,
            stampingLocations: args.stampingLocations.map(stamp => {
                let minDistance = Infinity
                let nearestIdx = -1
                args.path.forEach((point, idx) => {
                    const distance = distanceInMeters(point, stamp.point)
                    if (distance < minDistance) {
                        minDistance = distance
                        nearestIdx = idx
                    }
                })
                return {
                    ...stamp,
                    pointIdx: nearestIdx
                }
            })
        }
    })(d)
    d = ((args: any): any => {
        const cp = new Map<string, any>()
        args.stampingLocations.forEach((stamp) => {
            if (!cp.has(stamp.name)) {
                cp.set(stamp.name, {
                    name: stamp.name,
                    stampingLocations: []
                })
            }
            const c = cp.get(stamp.name)
            c.stampingLocations.push(stamp)
        })
        const result = []
        for (const i of cp.values()) {
            result.push(i)
        }
        // console.log(result[2])
        // console.log(result.filter(c => c.name === 'Sirok')[0])
        return {
            path: args.path,
            checkpoints: result
        }
    })(d)
    // writeFileSync('/tmp/x.json', JSON.stringify(d))
    // let d = JSON.parse(readFileSync('/tmp/x.json').toString())
    d = ((args: any): any => {
        return ({
            ...args,
            checkpoints: args.checkpoints.sort((cp1, cp2) => cp1.stampingLocations[0].pointIdx - cp2.stampingLocations[0].pointIdx)
        })
    })(d)
    d = ((args: any): any => ({
        ...args,
        ...meta,
    }))(d)    // console.log(d7)
    return d
}

export default {
    load
}

