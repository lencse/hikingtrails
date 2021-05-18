import React from 'react'
import useSWR from 'swr'
import dynamic from 'next/dynamic'
import Head from 'next/head'

export default class Home extends React.Component {

    // state = {
    //     browser: false
    // }

    // componentDidMount() {
    //     this.setState({browser: true})
    // }

    render() {
        // if (!this.state.browser) {
        //     return <div>server rendering</div>
        // }
        const App = dynamic(
            () => import('../components/map'), {
                ssr: false,
                loading: () => <div>loading</div>
            }
        )

        return (
            <App />
        )
    }

}

             // const fetcher = (...args) => fetch(...args).then(res => res.json())

// function useUser () {
//     const { data, error } = useSWR('/data/test.json', fetcher)

//     return {
//       data,
//       isLoading: !error && !data,
//       isError: error
//     }
//   }

// export default function Home() {
//     // const { data, isLoading, isError } = useUser()
//     // if (!isLoading) {
//         return (
//             <div suppressHydrationWarning>
//                 {typeof window === 'undefined' ? 'aaa' : <MapContainer center={[51.505, -0.09]} zoom={13} scrollWheelZoom={false}>
//   <TileLayer
//     attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
//     url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
//   />
//   <Marker position={[51.505, -0.09]}>
//     <Popup>
//       A pretty CSS3 popup. <br /> Easily customizable.
//     </Popup>
//   </Marker>
// </MapContainer>}
//             </div>
//         )

    // } else {
    //     return <div>loading</div>
    // }

// }
// export default function Home() {
//     // const { data, isLoading, isError } = useUser()
//     // if (!isLoading) {
//         return (
//              <MapContainer center={[51.505, -0.09]} zoom={13} scrollWheelZoom={false}>
//   <TileLayer
//     attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
//     url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
//   />
//   <Marker position={[51.505, -0.09]}>
//     <Popup>
//       A pretty CSS3 popup. <br /> Easily customizable.
//     </Popup>
//   </Marker>
// </MapContainer>
//         )

    // } else {
    //     return <div>loading</div>
    // }
//
// }
