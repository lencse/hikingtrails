import { LatLon } from '../types'

export interface DistanceCalculator {
    getDistance: (point1: LatLon, point2: LatLon) => number
}
