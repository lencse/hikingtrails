import { parseXml } from "."
import { PointWithElevation } from "../types"

export async function pointsFromGpx(gpx: string): Promise<PointWithElevation[]> {
    const data = await parseXml(gpx)
    return data.gpx
        .trk[0]
        .trkseg[0]
        .trkpt
        .map((node: any) => ({
            lat: Number(node.$.lat),
            lon: Number(node.$.lon),
            elevation: Number(node.ele ?? 0)
        }))
}
