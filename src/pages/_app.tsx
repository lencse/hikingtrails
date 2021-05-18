import '../../styles/globals.css'
import 'leaflet/dist/leaflet.css'
// import '../../styles/leaflet.css'
import { AppProps } from 'next/app'

function MyApp({ Component, pageProps }: AppProps) {
    return <Component {...pageProps} />
}

export default MyApp
