import L from 'leaflet'
import MarkerIcon from '../../../../node_modules/leaflet/dist/images/marker-icon.png'
import MarkerShadow from '../../../../node_modules/leaflet/dist/images/marker-shadow.png'
import 'leaflet/dist/leaflet.css'
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet'
import { useEffect, useState } from 'react'
import { getAllData } from '../../../fetchs/getAllData'
import { CircularProgress } from '@mui/material'

const Map = () => {
    const [coord, setCoord] = useState<{ city: string, average: number, location: { lat: number, lng: number } }[]>([]);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        const getLocations = async () => {
            try {
                setLoading(true);
                const data = await getAllData("api/analysis/highest-casualty-regions");
                const filteredData = data.filter((item: { city: string, average: number, location: { lat: number, lng: number } }) => item.location && item.location.lat && item.location.lng);
                setCoord(filteredData);
                setLoading(false);
            } catch (err) {
                console.log(err);
            }
        }
        if (!coord.length) {
            getLocations();
        }
    }, [])


   
    return (
        <div className='map'>
            <CircularProgress style={{display: loading ? 'block' : 'none', position: 'absolute', top: '2%', left: '50%'}} />
            <h1>Top casualty cities</h1>
            <MapContainer style={{
                height: '80vh',
                width: '97vw',
                margin: '10px auto',
                borderRadius: '10px',
                border: '3px solid black'  

            }} center={[34.416145, 41.960352]} zoom={3} scrollWheelZoom={false}>
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
                            <h3>{item.city}</h3><div style={{ display: 'flex', justifyContent: 'space-between' }}> <div style={{ color: 'red' }}>Average casualties: </div>{item.average}</div><br /><div style={{ display: 'flex', justifyContent: 'space-between' }}> lat: <div style={{ color: 'yellowgreen' }}>{item.location.lat}</div></div><div style={{ display: 'flex', justifyContent: 'space-between' }}> lon: <div style={{ color: 'yellowgreen' }}>{item.location.lng}</div></div>
                        </Popup>
                    </Marker>
                ))}
            </MapContainer>
        </div>
    )
}

export default Map