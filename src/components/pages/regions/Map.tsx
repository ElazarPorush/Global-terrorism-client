'use client'

import L from 'leaflet'
import MarkerIcon from '../../../../node_modules/leaflet/dist/images/marker-icon.png'
import MarkerShadow from '../../../../node_modules/leaflet/dist/images/marker-shadow.png'
import 'leaflet/dist/leaflet.css'
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet'
import { useEffect, useState } from 'react'
import { getAllData } from '../../../fetchs/getAllData'

const Map = () => {
    const [coord, setCoord] = useState<{city: string, average: number, location: { lat: number, lng: number }}[]>([{city: 'London', average: 3, location: { lat: 51.505, lng: -0.09 }}])

    useEffect(() => {
        const getLocations = async () => {
            try {
                const data = await getAllData("http://localhost:8263/api/analysis/highest-casualty-regions");
                setCoord(data);
            } catch (err) {
                console.log(err);
            }
        }
        getLocations();
    })

    const SearchLocation = () => {
        return (
            <div className="search-location">
                <input type="text" placeholder="Search Location" />
            </div>
        )
    }

    const GetMyLocation = () => {
        const getMyLocation = () => {
            if (navigator.geolocation) {
                navigator.geolocation.getCurrentPosition((position) => {
                    setCoord([{city: 'London', average: 3, location: { lat: position.coords.latitude, lng: position.coords.longitude }}])
                })
            } else {
                console.log("Geolocation is not supported by this browser.")
            }
        }

        return (
            <div className="get-my-location">
                <button onClick={getMyLocation}>Get My Location</button>
            </div>
        )
    }
    return (
        <div>
            <SearchLocation />
            <GetMyLocation />
            <MapContainer style={{
                height: '80vh',
                width: '97vw',
                margin: '10px auto',
                borderRadius: '10px'

            }} center={coord[0].location} zoom={13} scrollWheelZoom={false}>
                <TileLayer
                    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                />
                {coord.map((item, index) => (
                <Marker icon={
                    new L.Icon({
                        iconUrl: MarkerIcon,
                        iconRetinaUrl: MarkerIcon,
                        iconSize: [25, 41],
                        iconAnchor: [12.5, 41],
                        popupAnchor: [0, -41],
                        shadowUrl: MarkerShadow,
                        shadowSize: [41, 41],
                    })
                } position={[item.location.lat, item.location.lng]} key={index}>
                    <Popup>
                        <h3>{item.city}</h3><div style={{display: 'flex', justifyContent: 'space-between'}}> <div style={{color: 'red'}}>Average casualties: </div>{item.average}</div><br /><div style={{display: 'flex', justifyContent: 'space-between'}}> lat: <div style={{color: 'yellowgreen'}}>{item.location.lat}</div></div><div style={{display: 'flex', justifyContent: 'space-between'}}> lon: <div style={{color: 'yellowgreen'}}>{item.location.lng}</div></div>
                    </Popup>
                </Marker>
                ))}
            </MapContainer>
        </div>
    )
}

export default Map