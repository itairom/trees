import React, { useEffect, useState } from "react";
import GoogleMapReact from 'google-map-react';
import { useGeolocation } from "../services/customHooks";
// import Marker from "./map/Marker";


const AnyReactComponent = ({ text }) => <div>{text}</div>;


export default function TreeMap() {
    const [coords, setCoords] = useState({
        isReady: false,
        coordinates: {
            lng: '',
            lat: ''
        }
    })
    const location = useGeolocation()

    useEffect(() => {
        console.log(location, 'location');

        setCoords(location.coordinates)
    }, [location])

    const defaultProps = {
        center: {
            lat: 32.1411148,
            lng: 34.8424622
        },
        zoom: 15
    };

    // const defaultProps = {
    //     center: coords,
    //     zoom: 11
    // };

    return ( 
        // Important! Always set the container height explicitly
        <div style={{ height: '500px', width: '500px' }}>
            {coords && <GoogleMapReact
                bootstrapURLKeys={{ key: "" }}
                yesIWantToUseGoogleMapApiInternals
                defaultCenter={defaultProps.center}
                defaultZoom={defaultProps.zoom} >
                {/* <Marker
                    lat={32.1411148}
                    lng={34.8424622}
                    text="My Marker" /> */}
            </GoogleMapReact>}
        </div>
    )
}
