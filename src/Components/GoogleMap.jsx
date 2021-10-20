import React from 'react'
import GoogleMaps from "simple-react-google-maps"
import {GoogleMapKey} from '../Keys'

const GoogleMap = () => {
    return (
        <div className="container">
            <GoogleMaps
            className="mapa-google"
            style={{height: "350px", width: "350px"}}
            apiKey={GoogleMapKey}
            zoom={12}
            center={{
                lat: 40.4127355,
                lng: -3.695428
            }}
            markers={{lat: 2.22,  lng: -3.12}}
            />
        </div>
    )
}

export default GoogleMap
