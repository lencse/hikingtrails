import { getPreciseDistance } from 'geolib'
import { meters, Path, Point } from '../types'

export const distanceInMeters = (coord1: Point, coord2: Point): meters =>
    getPreciseDistance(
        { longitude: coord1.lon, latitude: coord1.lat },
        { longitude: coord2.lon, latitude: coord2.lat },
        0.001
    )

export const pathData = (path: Path): {
    length: meters,
    elevationDiff: {
        from: meters
        to: meters
    }
} => {
    const result = {
        length: 0,
        elevationDiff: {
            from: 0,
            to: 0
        }
    }
    for (let i = 1; i < path.length; ++i) {
        const diff = path[i].elevation - path[i -1].elevation
        result.length += Math.sqrt(Math.pow(distanceInMeters(path[i], path[i - 1]), 2) + Math.pow(diff, 2))
        if (diff > 0 ) {
            result.elevationDiff.from += Math.abs(diff)
        } else {
            result.elevationDiff.to += Math.abs(diff)
        }
    }
    return result
}
