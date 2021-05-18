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
            name: 'Dömös',
            stampingLocations: [
                {
                    point: {
                        lat: 47.763911,
                        lon: 18.910500
                    },
                    description: 'Dömös, templom - buszmegálló',
                }
            ]
        },
        {
            name: 'Rám-hegy',
            stampingLocations: [
                {
                    point: {
                        lat: 47.730893,
                        lon: 18.897077
                    },
                    description: 'Rám-hegy',
                }
            ]
        },
        {
            name: 'Dobogókő',
            stampingLocations: [
                {
                    point: {
                        lat: 47.720020,
                        lon: 18.899028
                    },
                    description: 'Dobogókő, kilátó',
                }
            ]
        },
        {
            name: 'Prédikálószék',
            stampingLocations: [
                {
                    point: {
                        lat: 47.739492,
                        lon: 18.920627
                    },
                    description: 'Prédikálószék',
                }
            ]
        },
        {
            name: 'Dömös',
            stampingLocations: [
                {
                    point: {
                        lat: 47.763695,
                        lon: 18.911188
                    },
                    description: 'Dömös, templom - buszmegálló',
                }
            ]
        },
    ]
}
