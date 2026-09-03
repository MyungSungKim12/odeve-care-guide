import { useEffect, useRef, useState } from 'react'

const PLACE_NAME = '오더브 뷰티'
const PLACE_ADDRESS = '서울 강서구 강서로 211 드림앤드림 5층 504호'
const GEOCODE_ADDRESS = '서울 강서구 강서로 211'
const NAVER_MAP_CLIENT_ID = '018h5ncq17'
const NAVER_MAP_URL = `https://map.naver.com/p/search/${encodeURIComponent(PLACE_NAME)}`

interface GeocodeItem {
  x: string
  y: string
}

interface NaverMapsApi {
  LatLng: new (lat: number, lng: number) => unknown
  Map: new (element: HTMLElement, options: Record<string, unknown>) => unknown
  Marker: new (options: Record<string, unknown>) => unknown
  Service: {
    Status: { OK: string | number }
    geocode(
      options: { query: string },
      callback: (status: string | number, response: { v2: { addresses: GeocodeItem[] } }) => void,
    ): void
  }
}

declare global {
  interface Window {
    naver?: { maps: NaverMapsApi }
    odeveInitMap?: () => void
  }
}

export function LocationMap() {
  const mapElement = useRef<HTMLDivElement>(null)
  const [mapUnavailable, setMapUnavailable] = useState(false)

  useEffect(() => {
    const clientId = import.meta.env.VITE_NAVER_MAP_CLIENT_ID || NAVER_MAP_CLIENT_ID

    if (!clientId || !mapElement.current) {
      setMapUnavailable(true)
      return
    }

    const initializeMap = () => {
      const maps = window.naver?.maps
      const element = mapElement.current

      if (!maps || !element) return

      maps.Service.geocode({ query: GEOCODE_ADDRESS }, (status, response) => {
        const result = response.v2.addresses[0]

        if (status !== maps.Service.Status.OK || !result) {
          setMapUnavailable(true)
          return
        }

        const position = new maps.LatLng(Number(result.y), Number(result.x))
        const map = new maps.Map(element, {
          center: position,
          zoom: 16,
          draggable: false,
          pinchZoom: false,
          scrollWheel: false,
          keyboardShortcuts: false,
          disableDoubleClickZoom: true,
          zoomControl: false,
          mapDataControl: false,
          scaleControl: false,
        })

        new maps.Marker({ map, position, title: PLACE_NAME })
      })
    }

    if (window.naver?.maps) {
      initializeMap()
      return
    }

    const script = document.createElement('script')
    window.odeveInitMap = initializeMap
    script.src = `https://oapi.map.naver.com/openapi/v3/maps.js?ncpKeyId=${encodeURIComponent(clientId)}&submodules=geocoder&callback=odeveInitMap`
    script.async = true
    script.onerror = () => setMapUnavailable(true)
    document.head.appendChild(script)

    return () => {
      script.onerror = null
      delete window.odeveInitMap
    }
  }, [])

  return (
    <section className="location-card" aria-labelledby="location-title">
      <div className="location-card__heading">
        <p className="eyebrow">Location</p>
        <h2 id="location-title">오시는 길</h2>
      </div>
      <div className="location-card__map-wrap">
        <div ref={mapElement} className="location-card__map" aria-label={`${PLACE_NAME} 위치 지도`} />
        {mapUnavailable ? (
          <a className="location-card__fallback" href={NAVER_MAP_URL} target="_blank" rel="noreferrer">
            <span>네이버 지도에서 위치 보기</span>
          </a>
        ) : null}
      </div>
      <div className="location-card__details">
        <div>
          <strong>{PLACE_NAME}</strong>
          <p>{PLACE_ADDRESS}</p>
        </div>
      </div>
      <a className="location-card__button" href={NAVER_MAP_URL} target="_blank" rel="noreferrer">
        <span aria-hidden="true">⌖</span> 네이버 지도에서 길찾기
      </a>
    </section>
  )
}
