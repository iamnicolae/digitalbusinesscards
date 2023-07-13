import { useRef, useEffect, useState, useCallback } from "react"
import { styled } from "styled-components"
import mapboxgl from 'mapbox-gl'
import 'mapbox-gl/dist/mapbox-gl.css'
import mbxGeocoding from '@mapbox/mapbox-sdk/services/geocoding';
// import mapboxSdk from "@mapbox/mapbox-sdk"
// 
// const mapboxClient = mapboxSdk({ accessToken: mapboxgl.accessToken })

import { BsApple } from "react-icons/bs"
import { SiWaze } from "react-icons/si"
import { SiGooglemaps } from "react-icons/si"

const DirectionLinks = styled.div`
  display: flex;
  flex-direction: column;
  gap: 15px;
  margin-top: 20px;
  
  a {
    font-size: 1.5rem;
    display: flex;
    align-items: center;
    gap: 5px;
  }
`

function Map({ street, city, country }) {
  const map = useRef(null)
  const mapContainerRef = useRef(null)
  const [location, setLocation] = useState([0, 0])
  const [init, setInit] = useState(false)
  mapboxgl.accessToken = import.meta.env.VITE_MAPBOX_API_KEY


  useEffect(() => {

    const getAddressCoordinates = async () => {
      try {
        const query = encodeURIComponent(street + " " + city + " " + country)
        const response = await fetch(`https://api.mapbox.com/geocoding/v5/mapbox.places/${query}.json?access_token=${mapboxgl.accessToken}`)

        const data = await response.json();

        console.log(query);
        console.log(data.features[0])

        setLocation([...data.features[0].center])

      } catch (error) {
        console.log(error)
      }
    }

    getAddressCoordinates()

  }, [])

  useEffect(() => {
    if (init) {
      map.current = new mapboxgl.Map({
        container: mapContainerRef.current,
        style: 'mapbox://styles/mapbox/streets-v12?optimize=true',
        center: location,
        zoom: 15
      })

      new mapboxgl.Marker().setLngLat(location).addTo(map.current)
    } else {
      setInit(true)
    }


  }, [location])


  // const fetchData = useCallback(() => {
  //   const geocodingClient = mbxGeocoding({
  //     accessToken: mapboxgl.accessToken,
  //   })

  //   return geocodingClient
  //     .forwardGeocode({
  //       query: `${street}, ${city}, ${country}`,
  //       autocomplete: false,
  //       limit: 1
  //     })
  //     .send()
  //     .then((response) => {
  //       if (
  //         !response ||
  //         !response.body ||
  //         !response.body.features ||
  //         !response.body.features.length
  //       ) {
  //         console.error('Invalid response:')
  //         console.error(response)
  //         return;
  //       }
  //       const feature = response.body.features[0]

  //       console.log(feature)

  //       return feature
  //     });

  // }, [])

  // useEffect(() => {
  //   if (map.current) return;

  //   const results = fetchData()

  //   results.then((marker) => {
  //     map.current = new mapboxgl.Map({
  //       container: mapContainerRef.current,
  //       style: 'mapbox://styles/mapbox/streets-v11',
  //       zoom: 20,
  //       center: marker.center,
  //     })

  //     new mapboxgl.Marker().setLngLat(marker.center).addTo(map.current)
  //   })

  //   //return () => map.current.remove()

  // }, [fetchData])

  return (
    <div>
      <div ref={mapContainerRef} style={{ width: '100%', height: '500px' }} />
      <DirectionLinks>
        <a href={`https://www.google.com/maps/dir//${encodeURIComponent(street + " " + city + " " + country)}`} target="_blank"><SiGooglemaps /> Get directions on Google Maps</a>
        <a href={`https://waze.com/ul?ll=${location[1]},${location[0]}&navigate=yes`} target="_blank"><SiWaze /> Get directions on Waze</a>
        <a href={`http://maps.apple.com/?address=${encodeURIComponent(street + " " + city + " " + country)}`} target="_blank"><BsApple /> Get directions on Apple Maps</a>
      </DirectionLinks>
    </div>
  )
}

export default Map