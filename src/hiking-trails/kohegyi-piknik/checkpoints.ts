import { Point } from '../../types'

export default function getCheckpoints(): {
    name: string,
    stampingLocations: {
        point: Point,
        description: string
    }[]
}[] {
    return [
        {
            name: 'Pomáz',
            stampingLocations: [
                {
                    point: {
                        lat: 47.642633,
                        lon: 19.032804
                    },
                    description: 'Pomáz, HÉV-megálló',
                }
            ]
        },
        {
            name: 'Petőfi-pihenő',
            stampingLocations: [
                {
                    point: {
                        lat: 47.673285,
                        lon: 19.016827
                    },
                    description: 'Petőfi-pihenő',
                }
            ]
        },
        {
            name: 'Czibulka János menedékház',
            stampingLocations: [
                {
                    point: {
                        lat: 47.675665,
                        lon: 19.018443
                    },
                    description: 'Czibulka János menedékház',
                }
            ]
        },
        {
            name: 'Szentendre',
            stampingLocations: [
                {
                    point: {
                        lat: 47.660649,
                        lon: 19.075383
                    },
                    description: 'Szentendre, HÉV-megálló',
                }
            ]
        },
    ]
}
