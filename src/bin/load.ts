import { writeFileSync } from 'fs'
import { hikingTrails } from '../hiking-trails'
import { resolve as pathResolve } from 'path'


export async function main() {
    const data = {
        hikingTrails: await hikingTrails()
    }
    writeFileSync(pathResolve(process.cwd(), 'public/data/data.json'), JSON.stringify(data))
    // console.log(res.map(h => ({
    //     ...h,
    //     path: {
    //         ...h.path,
    //         nodes: h.path.nodes.length,
    //         ...h.path.elevationDifference
    //     }
    // })))
}
