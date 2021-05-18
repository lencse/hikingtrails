import { Point, PointWithElevation, HikingTrail, HikingTrailLoader } from "../types";
import domosiKor from "./domosi-kor";
import okt from "./okt";
import ak from "./ak";
import ddk from "./ddk";
import kohegyiPiknik from "./kohegyi-piknik";
import tumblitura from "./tumblitura";
import { parseXml } from "../xml";
import { distanceInMeters } from "../map/path";
import { inspect } from 'util'

const coordinatesFromGpx = async (gpx: string): Promise<PointWithElevation[]> => {
    const data: any = await parseXml(gpx)
    return data.gpx
        .trk[0]
        .trkseg[0]
        .trkpt
        .map((node) => ({
            lat: Number(node.$.lat),
            lon: Number(node.$.lon),
            elevation: 0
        }))
}

export async function hikingTrails(): Promise<HikingTrail[]> {
    const result = await Promise.all([
        domosiKor.load(),
        okt.load(),
        ddk.load(),
        ak.load(),
        kohegyiPiknik.load(),
        tumblitura.load(),
    ])
    let d: any = result
    d = d.map(h => ({
        ...h,
        circular: distanceInMeters(h.path[0], h.path[h.path.length - 1]) < 50
    }))
    d = d.map(h => {
        const c = h.checkpoints
        c[0] = {
            ...c[0],
            stampingLocations: c[0].stampingLocations.map(s => ({
                ...s,
                pointIdx: 0
            }))
        }
        c[c.length - 1] = {
            ...c[c.length - 1],
            stampingLocations: c[c.length - 1].stampingLocations.map(s => ({
                ...s,
                pointIdx: c.circular ? 0 : h.path.length - 1
            }))
        }
        return {
            ...h,
            checkpoints: c
        }
    })
    d = d.map(h => {
        return {
            ...h,
            checkpoints: h.checkpoints.map(c => ({
                name: c.name,
                sectionEndpoints: [{
                    name: c.name,
                    stampingLocations: c.stampingLocations
                }]
            }))
        }
    })
    // console.log(d)
    // console.log('-----------------------------')
    // console.log(d[1].checkpoints[0])
    // console.log(d[1].checkpoints[1])
    // console.log(d[1].checkpoints[d[1].checkpoints.length - 2])
    // console.log(d[1].checkpoints[d[1].checkpoints.length - 1])
    // console.log('-----------------------------')
    // console.log(d[0].checkpoints[0])
    // console.log(d[0].checkpoints[1])
    // console.log(d[0].checkpoints[d[0].checkpoints.length - 2])
    // console.log(d[0].checkpoints[d[0].checkpoints.length - 1])
    return d
    // const loaders: HikingTrailLoader[] = [
    //     new domosiKor.Loader(),
    //     new ddk.Loader(),
    // ]
    // return Promise.all(loaders.map(async loader => {
    //     return {
    //         name: loader.name,
    //         id: loader.id,
    //         description: loader.description,
    //         shortDescription: loader.shortDescription,
    //         path: {
    //             length: 0,
    //             nodes: await coordinatesFromGpx((await loader.getGpx())),
    //             elevationDifference: {
    //                 from: 0,
    //                 to: 0
    //             }
    //         }
    //     }
    // }))
}
