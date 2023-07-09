import { useRef, useEffect, useCallback } from "react"
import mapboxgl from 'mapbox-gl'
import mbxGeocoding from '@mapbox/mapbox-sdk/services/geocoding';
// import mapboxSdk from "@mapbox/mapbox-sdk"
// 
// const mapboxClient = mapboxSdk({ accessToken: mapboxgl.accessToken })

function Map({ street, city, country }) {
  const map = useRef(null)
  const mapContainerRef = useRef(null)
  mapboxgl.accessToken = import.meta.env.VITE_MAPBOX_API_KEY

  const fetchData = useCallback(() => {
    const geocodingClient = mbxGeocoding({
      accessToken: mapboxgl.accessToken,
    })

    return geocodingClient
      .forwardGeocode({
        query: `${street}, ${city}, ${country}`,
        autocomplete: false,
        limit: 1
      })
      .send()
      .then((response) => {
        if (
          !response ||
          !response.body ||
          !response.body.features ||
          !response.body.features.length
        ) {
          console.error('Invalid response:')
          console.error(response)
          return;
        }
        const feature = response.body.features[0]

        console.log(feature)

        return feature
      });

  }, [])

  useEffect(() => {
    if (map.current) return;

    const results = fetchData()

    results.then((marker) => {
      map.current = new mapboxgl.Map({
        container: mapContainerRef.current,
        style: 'mapbox://styles/mapbox/streets-v11',
        zoom: 20,
        center: marker.center,
      })

      new mapboxgl.Marker().setLngLat(marker.center).addTo(map.current)
    })

    //return () => map.current.remove()

  }, [fetchData])

  return (
    <div>
      <div ref={mapContainerRef} style={{ width: '100%', height: 'auto' }} />
    </div>
  )
}

export default Map