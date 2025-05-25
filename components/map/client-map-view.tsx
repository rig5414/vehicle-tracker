"use client"

import dynamic from 'next/dynamic'
import { MapView } from './map-view'

// Dynamically import MapView with no SSR
const ClientMapView = dynamic(() => Promise.resolve(MapView), { ssr: false })

export { ClientMapView }
