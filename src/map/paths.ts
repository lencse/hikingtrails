import { getPreciseDistance } from 'geolib'
import { Coordinate } from '../types'

export const distanceInCentimeters = (coord1: Coordinate, coord2: Coordinate): number =>
    Math.round(getPreciseDistance(
        { longitude: coord1.lon, latitude: coord1.lat },
        { longitude: coord2.lon, latitude: coord2.lat },
        0.01
    ) * 100)
