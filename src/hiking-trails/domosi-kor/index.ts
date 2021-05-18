import { promises } from "fs";
import { sep, resolve } from "path";
import { fileContent } from "../../files";
import { distanceInMeters } from "../../map/path";
import { PointWithElevation, HikingTrail, HikingTrailLoader } from "../../types";
import { parseXml } from "../../xml";
import { pointsFromGpx } from "../../xml/gpx";
import getCheckpoints from "./checkpoints";

// export async function load(): Promise<HikingTrail> {
//     return {
//         name: 'Dömösi kör',
//         id: __dirname.split(sep).pop(),
//         description: 'Nagyon faszipántos túra',
//         shortDescription: 'Faszipántos túra',
//         path: {
//             length: 0,
//             nodes: [],
//             elevationDifference: {
//                 from: 0,
//                 to: 0
//             }
//         }
//     }
// }

// export async function gpx(): Promise<string> {
//     return 's   '
// }


class Loader implements HikingTrailLoader {

    id = id

    name = 'DD'

    description = 'DK'

    shortDescription = 'DK'

    public async getGpx(): Promise<string> {
        return promises.readFile(resolve(process.cwd(), `src/hiking-trails/${id}/track.gpx`), 'utf-8').then(r => r.toString())
    }

}

const id: string = __dirname.split(sep).pop()

const meta = {
    id,
    name: 'Dobogókő-Prédikálószék kör Dömösről'
}


async function load() {
    const init = `src/hiking-trails/${id}/track.gpx`
    let d: any = await fileContent(init)
    d = await pointsFromGpx(d)
    d = ((coordinates: PointWithElevation[]): any => {
        return {
            checkpoints: getCheckpoints(),
            path: coordinates
        }
    })(d)
    d = ((args: any): any => {
        return {
            ...args,
            checkpoints: args.checkpoints.map(cp => {
                return {
                    ...cp,
                    stampingLocations: cp.stampingLocations
                    .map(stamp => {
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
            })
        }
    })(d)
    d = ((args: any): any => ({
        ...args,
        ...meta,
    }))(d)
    return d
}

export default {
    Loader,
    load
}

