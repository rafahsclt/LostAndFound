import React, { useState } from 'react'
import { useMapEvents, Marker, Popup } from 'react-leaflet'

interface ILocationMarker {
  popupText?: string
  setSelectedPosition(array: [number, number]): void
}


const LocationMarker: React.FC<ILocationMarker> = ({ popupText, setSelectedPosition }) => {
    const [position, setPosition] = useState<[number, number]>([0, 0])
    const [firstClick, setFirstClick] = useState<boolean>(true)

    const map = useMapEvents({
      click(e) {
        if(firstClick === true ) {
          map.locate() 
          setFirstClick(false)
        }
        else {
          setPosition([
            e.latlng.lat,
            e.latlng.lng
          ])
          setSelectedPosition([
            e.latlng.lat,
            e.latlng.lng
          ])
        }
      },
      locationfound(e) {
        map.flyTo(e.latlng, map.getZoom())
      },
    })
  
    return (
      <Marker position={position}>
        <Popup>{popupText}</Popup>
      </Marker>
    )
}

export default LocationMarker