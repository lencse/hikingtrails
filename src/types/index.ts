export interface Point {
    lat: number
    lon: number
}

export interface Stamp {
    coordinate: Point
    name: string
    checkpointId: string,
    description: string,
    url: string,
    id: number
}

interface WithPathNodes {
    nodeIdx: number
}

export interface StampWithPathNodes extends Stamp, WithPathNodes {}

export interface Hike {
    key: string
    track: Point[]
    checkpoints: Checkpoint[]
}

export interface Data {
    hikes: Hike[]
}

export interface Checkpoint extends WithPathNodes {
    name: string
    id: string
    stamps: Stamp[]
}

export interface Part {
    track: Point[],
    stamps: Stamp[],
    color: string,
    ids: number[]
}

//////////

export interface PointWithElevation {
    lat: number
    lon: number
    elevation: meters
}

export type PathWithInformation = {
    length: meters
    points: PointWithElevation[]
    elevationDifference: {
        from: meters
        to: meters
    }
}

export type Path = PointWithElevation[]

export type meters = number

export interface HasDescription {
    description: string
}

export interface HasShortDescription {
    shortDescription: string
}

export interface HasName {
    name: string
}

export interface HasId {
    id: string
}

export interface HikingTrail extends HasId, HasName, HasDescription, HasShortDescription {
    path: PathWithInformation
}

export interface HikingTrailLoader extends HasId, HasName, HasDescription, HasShortDescription {
    getGpx(): Promise<string>
}

export type Checkpoint2 = {

}

export interface StampingLocation {
    point: Point
    description: string
    pointIdx: number
}


export interface Data2 {
    hikingTrails: HikingTrail2[]
}

export interface SectionEndpoint {
    name: string
    stampingLocations: StampingLocation[]
}

export interface Checkpoint3 {
    name: string
    sectionEndpoints: SectionEndpoint[]
}

export interface HikingTrail2 {
    checkpoints: Checkpoint3[],
    id: string
    name: string
    circular: boolean
    path: PointWithElevation[]
}
