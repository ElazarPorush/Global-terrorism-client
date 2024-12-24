import L from 'leaflet'
import MarkerIcon from '../../../../node_modules/leaflet/dist/images/marker-icon.png'
import MarkerShadow from '../../../../node_modules/leaflet/dist/images/marker-shadow.png'
import 'leaflet/dist/leaflet.css'
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet'
import { useState } from 'react'
import { getAllData } from '../../../fetchs/getAllData'
import { Spinner } from '@fluentui/react-components'
import { CircularProgress } from '@mui/material'

export default function HighestCityOfOrganization() {
    const [coords, setCoords] = useState<{ organization: string, city: string, casualties: number, location: { lat: number, lng: number } }[]>([])
    const [organization, setOrganization] = useState('');
    const [loading, setLoading] = useState(false);

    const getLocations = async () => {
        try {
            if (organization === '') {
                return;
            }
            setLoading(true);
            const data = await getAllData(`http://localhost:8263/api/relationships/deadliest-regions/${organization}`);
            setCoords(data);
            setLoading(false);
        } catch (err) {
            console.log(err);
        }
    }



    return (
        <div className='map'>
            <h1>Highest casualty cities of organization</h1>
            <label htmlFor="organization">Search by organization</label>
            <input type="text" value={organization} onChange={(e) => setOrganization(e.target.value)} placeholder='organization name...' />
            <button onClick={getLocations}>Search</button>
            <CircularProgress style={{display: loading ? 'block' : 'none', position: 'absolute', top: '2%', left: '50%'}} />
            <MapContainer style={{
                height: '80vh',
                width: '97vw',
                margin: '10px auto',
                borderRadius: '10px',
                border: '3px solid black',

            }} center={[48.1482659, 38.6482653]} zoom={3} scrollWheelZoom={false}>
                <TileLayer
                    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                />
                {coords.map((item, index) => (
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
                            <h3>Organization: {item.organization}</h3>
                            <h3>City Name: {item.city}</h3>
                            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                                <div style={{ color: 'red' }}>Casualties: </div>
                                {item.casualties}
                            </div>
                            <br />
                            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                                lat: <div style={{ color: 'yellowgreen' }}>
                                    {item.location.lat}
                                </div>
                            </div>
                            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                                lon: <div style={{ color: 'yellowgreen' }}>
                                    {item.location.lng}
                                </div>
                            </div>
                        </Popup>
                    </Marker>
                ))}
            </MapContainer>
        </div>
    )
}
