import { MapContainer, TileLayer, Marker, Popup, Polyline } from 'react-leaflet'
import useSWR, { ConfigInterface, RevalidateOptionInterface, revalidateType } from 'swr'
import React, { useState } from 'react'
import { Data2, Stamp, StampingLocation } from '../types'
import * as L from 'leaflet'

const leafletMapId = 'mapbox/outdoors-v11'

const fetcher = (input, init) => fetch(input, init).then(res => res.json())

interface LoadingState {
    isLoading: boolean
    isLoaded: boolean
    isLoadingSlow: boolean
}

interface Track {
    hikeKey: string
    startIndex: number
    endIndex: number
}

interface AppState {
    data: Data2
    loadingState: LoadingState
    tracks: Track[]
}

export default class App extends React.Component<{}, AppState> {

    constructor(props) {
        super(props)
        this.state = {
            data: {
                hikingTrails: []
            },
            tracks: [],
            loadingState: {
                isLoading: false,
                isLoaded: false,
                isLoadingSlow: false
            }
        }
    }

    render() {
        return (
            <>
                <DataLoader
                    onSuccess={(data) => {
                        if (this.state.data.hikingTrails.length > 0) {
                            return
                        }
                        const firstTrack: Track = {
                            hikeKey: data.hikingTrails[0].id,
                            startIndex: 0,
                            endIndex: data.hikingTrails[0].checkpoints.length - 1
                        }
                        this.setState({
                            data,
                            loadingState: { isLoading: false, isLoaded: true, isLoadingSlow: false },
                            tracks: [firstTrack]
                        })
                    }}
                    onLoadingSlow={() => {
                        this.setState({
                            loadingState: { isLoading: true, isLoaded: false, isLoadingSlow: true }
                        })
                    }}
                    onErrorRetry={() => {
                        this.setState({
                            loadingState: { isLoading: true, isLoaded: false, isLoadingSlow: true }
                        })
                    }}
                />
                {
                    this.state.loadingState.isLoaded
                        ? <Map
                            data={this.state.data}
                            loadingState={this.state.loadingState}
                            tracks={this.state.tracks}
                            setState={this.setState.bind(this)}
                        />
                        : <></>
                }
            </>
        )
    }
}

interface DataLoaderProps {
    onLoadingSlow: (key: string, config: ConfigInterface<Data2, Error>) => void
    onSuccess: (data: Data2, key: string, config: ConfigInterface<Data2, Error>) => void
    // onError: (err: Error, key: string, config: ConfigInterface<Data2, Error>) => void
    onErrorRetry: (err: Error, key: string, config: ConfigInterface<Data2, Error>, revalidate: revalidateType, revalidateOpts: RevalidateOptionInterface) => void
}

const DataLoader = (props: DataLoaderProps) => {
    useSWR('/data/data.json', fetcher, {
        ...props
    })
    return <></>
}

interface MapProps {
    data: Data2
    loadingState: LoadingState,
    tracks: Track[],
    setState: (state: any) => void
}

// https://kektura-szakaszok.lencse.io/.netlify/functions/planner/26-32-999999_43-100-999999_111-136-999999_0-5-


const GraphTrack = (props: { track: Track, data: Data2, index: number }) => {
    const hike = props.data.hikingTrails.filter(hike => hike.id === props.track.hikeKey)[0]
    const poss = [
        hike.checkpoints[props.track.startIndex].sectionEndpoints[0].stampingLocations[0].pointIdx,
        hike.checkpoints[props.track.endIndex].sectionEndpoints[0].stampingLocations[0].pointIdx,
    ]
    const [start, end] = [Math.min(...poss), Math.max(...poss)]
    const pos = hike.path.slice(start, end + 1).map(p => ({ lat: p.lat, lng: p.lon }))
    const color = [
        '#eb3853',
        '#ffdc5e',
        '#294aeb',
        '#294aeb',
        '#1dad38',
        '#aa27c4',
        '#29e9ea',
    ][props.index]
    let stamps: StampingLocation[] = []
    const idxs = [props.track.startIndex, props.track.endIndex]
    const [startIdx, endIdx] = [Math.min(...idxs), Math.max(...idxs)]
    hike.checkpoints.slice(startIdx, endIdx + 1).forEach(checkpoint => {
        checkpoint.sectionEndpoints.forEach(sectionEndPoint => {
            stamps = stamps.concat(sectionEndPoint.stampingLocations)
        })
    })
    return (
        <>
            <Polyline positions={pos} pathOptions={{ color }} />
            {stamps.map((stamp, idx) =>
                <Marker
                    position={[stamp.point.lat, stamp.point.lon]}
                    key={idx}
                    icon={L.icon({
                        iconUrl: '/img/leaflet/marker-icon.png',
                        // iconSize: [38, 95],
                        iconAnchor: [12, 41],
                        // popupAnchor: [-12, -41],
                        shadowUrl: '/img/leaflet/marker-shadow.png',
                        // shadowSize: [68, 95],
                        // shadowAnchor: [22, 94]
                    })}
                >
                    <Popup>
                        <h3 className='font-bold'>{stamp.description}</h3>
                        <p>{stamp.description}</p>
                    </Popup>
                </Marker>
            )}
        </>
    )
}

const Leaflet = (props: { tracks: Track[], data: Data2 }) => {
    return (
        <MapContainer center={[46.903663052, 19.687163918]} zoom={8} scrollWheelZoom={true}>
            <TileLayer
                maxZoom={18}
                tileSize={512}
                zoomOffset={-1}
                attribution={'Map data &copy; <a href="https://www.openstreetmap.org/">'
                    + 'OpenStreetMap</a> contributors, '
                    + '<a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, '
                    + 'Imagery © <a href="https://www.mapbox.com/">Mapbox</a>'}
                url={`https://api.mapbox.com/styles/v1/${leafletMapId}/tiles/{z}/{x}/{y}`
                    + `?access_token=${process.env.NEXT_PUBLIC_MAPBOX_TOKEN}`}
            />
            {
                props.tracks.map((track, idx) => <GraphTrack track={track} data={props.data} index={idx} key={idx}></GraphTrack>)
            }
        </MapContainer>
    )
}

class Map extends React.Component<MapProps, {}> {

    render() {
        return (
            <div className='h-screen w-full flex flex-row'>
                <div className='h-full w-full'>
                    <Leaflet tracks={this.props.tracks} data={this.props.data} />
                </div>
                <div className='h-full w-96'>
                    {this.props.tracks.map((track, idx) => (
                        <div key={idx} className="my-4">
                            <div>
                                <select value={track.hikeKey} onChange={e => {
                                    const tracks = this.props.tracks
                                    const hike = this.props.data.hikingTrails.filter(hike => hike.id === e.target.value)[0]
                                    tracks[idx] = {
                                        hikeKey: hike.id,
                                        startIndex: 0,
                                        endIndex: hike.checkpoints.length - 1
                                    }
                                    this.props.setState({ tracks })
                                }}>
                                    {
                                        this.props.data.hikingTrails.map((hike) => (
                                            <option value={hike.id} key={hike.id}>{hike.name}</option>
                                        ))
                                    }
                                </select>
                            </div>
                            <div>
                                <select value={track.startIndex} onChange={e => {
                                    const tracks = this.props.tracks
                                    tracks[idx].startIndex = Number(e.target.value)
                                    this.props.setState({ tracks })
                                }}>
                                    {
                                        this.props.data.hikingTrails.filter(hike => hike.id === track.hikeKey)[0].checkpoints.map((checkpoint, chidx) => (
                                            <option value={chidx} key={chidx}>{checkpoint.name}</option>
                                        ))
                                    }
                                </select>
                            </div>
                            <div>
                                <select value={track.endIndex} onChange={e => {
                                    const tracks = this.props.tracks
                                    tracks[idx].endIndex = Number(e.target.value)
                                    this.props.setState({ tracks })
                                }}>
                                    {
                                        this.props.data.hikingTrails.filter(hike => hike.id === track.hikeKey)[0].checkpoints.map((checkpoint, chidx) => (
                                            <option value={chidx} key={chidx}>{checkpoint.name}</option>
                                        ))
                                    }
                                </select>
                            </div>
                        </div>
                    ))}
                    <div>
                        <button className="p-2 border-black border" onClick={() => {
                            const tracks = this.props.tracks.concat({
                                hikeKey: this.props.data.hikingTrails[0].id,
                                startIndex: 0,
                                endIndex: this.props.data.hikingTrails[0].checkpoints.length - 1
                            })
                            this.props.setState({ tracks })
                        }}>+</button>
                    </div>
                </div>
            </div>
        )
    }

}
