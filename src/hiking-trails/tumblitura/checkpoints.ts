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
            name: 'Nagymaros',
            stampingLocations: [
                {
                    point: {
                        lat: 47.791153,
                        lon: 18.959194
                    },
                    description: 'Nagymaros, vasútállomás',
                }
            ]
        },
        {
            name: 'Julianus-kilátó',
            stampingLocations: [
                {
                    point: {
                        lat: 47.784103,
                        lon: 18.933575
                    },
                    description: 'Julianus-kilátó',
                }
            ]
        },
        {
            name: 'Törökmező turistaház',
            stampingLocations: [
                {
                    point: {
                        lat: 47.831027,
                        lon: 18.943356
                    },
                    description: 'Törökmező tursitaház',
                }
            ]
        },
        {
            name: 'Monarchia Rétesház',
            stampingLocations: [
                {
                    point: {
                        lat: 47.803494,
                        lon: 18.913466
                    },
                    description: 'Monarchia Rétesház, Zebegény',
                }
            ]
        },
        {
            name: 'Zebegény',
            stampingLocations: [
                {
                    point: {
                        lat: 47.800114,
                        lon: 18.909518
                    },
                    description: 'Zebegény, vasútállomás',
                }
            ]
        },
    ]
}
