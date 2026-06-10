import React, { useState, useEffect, useRef } from 'react';
import { TRANSLATIONS } from '../translations';
import { 
  Hospital, 
  Search, 
  Phone, 
  MapPin, 
  Compass, 
  Navigation, 
  Navigation2, 
  Globe, 
  Map, 
  Loader2,
  AlertTriangle,
  Activity,
  X
} from 'lucide-react';

// Default centers
const INDIA_DEFAULT_CENTER = { lat: 20.5937, lng: 78.9629 };

interface HealthcarePlace {
  id: string;
  name: string;
  lat: number;
  lng: number;
  address: string;
  type: 'hospital' | 'clinic' | 'doctors' | 'emergency_room';
  phone?: string;
  website?: string;
  emergency?: string;
  distance?: number; // in km
}

const METRO_FALLBACK_DATA: Record<string, HealthcarePlace[]> = {
  mumbai: [
    {
      id: 'm-1',
      name: 'Mumbai KEM Hospital - Department of Cardiology',
      lat: 19.0025,
      lng: 72.8423,
      address: 'Acharya Donde Marg, Parel, Mumbai, Maharashtra 400012',
      type: 'hospital',
      phone: '+91 22 2410 7000',
      website: 'http://www.kem.edu',
      emergency: 'yes',
      distance: 1.5
    },
    {
      id: 'm-2',
      name: 'Asian Heart Institute - Specialized Cardiac Hospital',
      lat: 19.0620,
      lng: 72.8680,
      address: 'G Block BKC, Bandra Kurla Complex, Bandra East, Mumbai 400051',
      type: 'hospital',
      phone: '+91 22 6698 6666',
      website: 'https://www.asianheartinstitute.org',
      emergency: 'yes',
      distance: 0.8
    }
  ],
  delhi: [
    {
      id: 'd-1',
      name: 'All India Institute of Medical Sciences (AIIMS)',
      lat: 28.5672,
      lng: 77.2100,
      address: 'Ansari Nagar, New Delhi, Delhi 110029',
      type: 'hospital',
      phone: '+91 11 2658 8500',
      website: 'https://www.aiims.edu',
      emergency: 'yes',
      distance: 1.2
    }
  ],
  default: [
    {
      id: 'f-1',
      name: 'Sajivani Advanced Cardiac Care Center',
      lat: 19.0760,
      lng: 72.8777,
      address: '150 Health Science Boulevard, Bandra East, Mumbai, MH 400051',
      type: 'hospital',
      phone: '+91 22 2410 7000',
      website: 'https://sajivani.ai',
      emergency: 'yes',
      distance: 0.25
    }
  ]
};

const ALL_INDIA_HOSPITALS: HealthcarePlace[] = [
  ...(METRO_FALLBACK_DATA.mumbai || []),
  ...(METRO_FALLBACK_DATA.delhi || [])
];

function calculateDistance(lat1: number, lon1: number, lat2: number, lon2: number) {
  const R = 6371.0; 
  const dLat = (lat2 - lat1) * Math.PI / 180;
  const dLon = (lon2 - lon1) * Math.PI / 180;
  const a = 
    Math.sin(dLat/2) * Math.sin(dLat/2) +
    Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) * Math.sin(dLon/2) * Math.sin(dLon/2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
  return R * c; 
}

export default function HospitalLocator() {
  const t = TRANSLATIONS;

  const [gpsCoordinates, setGpsCoordinates] = useState<{ lat: number, lng: number }>(INDIA_DEFAULT_CENTER);
  const [mapCenter, setMapCenter] = useState<{ lat: number, lng: number }>(INDIA_DEFAULT_CENTER);
  const [mapZoom, setMapZoom] = useState<number>(5);
  const [locPermission, setLocPermission] = useState<'prompt' | 'granted' | 'denied'>('prompt');
  const [searchRadius] = useState<number>(50); // km
  const [isLoading, setIsLoading] = useState(false);
  const [places, setPlaces] = useState<HealthcarePlace[]>(ALL_INDIA_HOSPITALS);
  const [selectedPlaceId, setSelectedPlaceId] = useState<string | null>(null);
  const [apiLogs, setApiLogs] = useState<string>('Sajivani GPS Engine initialized with All India Database.');
  const [errorText, setErrorText] = useState<string | null>(null);
  const [selectedMetro, setSelectedMetro] = useState<string>('all');
  const [searchCity, setSearchCity] = useState('');
  const [searchState, setSearchState] = useState('');
  const [showPermissionModal, setShowPermissionModal] = useState(false);
  const [mapType, setMapType] = useState<'streets' | 'satellite'>('streets');

  const [leafletLoaded, setLeafletLoaded] = useState(false);
  const mapContainerRef = useRef<HTMLDivElement | null>(null);
  const mapInstanceRef = useRef<any>(null);
  const markersGroupRef = useRef<any>(null);
  const tileLayerRef = useRef<any>(null);

  // 1. Dynamic Leaflet script and stylesheet injection
  useEffect(() => {
    const cssId = 'leaflet-css-cdn';
    if (!document.getElementById(cssId)) {
      const link = document.createElement('link');
      link.id = cssId;
      link.rel = 'stylesheet';
      link.href = 'https://unpkg.com/leaflet@1.9.4/dist/leaflet.css';
      document.head.appendChild(link);
    }

    const jsId = 'leaflet-js-cdn';
    if (!document.getElementById(jsId)) {
      const script = document.createElement('script');
      script.id = jsId;
      script.src = 'https://unpkg.com/leaflet@1.9.4/dist/leaflet.js';
      script.async = true;
      script.onload = () => setLeafletLoaded(true);
      script.onerror = () => console.error('Failed to load Leaflet script');
      document.body.appendChild(script);
    } else if ((window as any).L) {
      setLeafletLoaded(true);
    }
  }, []);

  // 2. Map Initialization
  useEffect(() => {
    if (!leafletLoaded || !mapContainerRef.current) return;
    const L = (window as any).L;
    if (!L || mapInstanceRef.current) return;

    const map = L.map(mapContainerRef.current, {
      zoomControl: true,
      scrollWheelZoom: true,
    }).setView([mapCenter.lat, mapCenter.lng], mapZoom);

    const baseLayer = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      maxZoom: 19,
      attribution: '© OpenStreetMap contributors'
    }).addTo(map);
    
    tileLayerRef.current = baseLayer;
    markersGroupRef.current = L.layerGroup().addTo(map);
    mapInstanceRef.current = map;

    map.on('moveend', () => {
      const center = map.getCenter();
      setMapCenter({ lat: center.lat, lng: center.lng });
    });
    map.on('zoomend', () => {
      setMapZoom(map.getZoom());
    });

    return () => {
      if (mapInstanceRef.current) {
        mapInstanceRef.current.remove();
        mapInstanceRef.current = null;
      }
    };
  }, [leafletLoaded]);

  // 3. Map Layer Switcher
  useEffect(() => {
    if (!leafletLoaded || !mapInstanceRef.current) return;
    const L = (window as any).L;

    if (tileLayerRef.current) {
      mapInstanceRef.current.removeLayer(tileLayerRef.current);
    }

    if (mapType === 'satellite') {
      tileLayerRef.current = L.tileLayer('https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}', {
        maxZoom: 19,
        attribution: 'Tiles © Esri'
      });
    } else {
      tileLayerRef.current = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        maxZoom: 19,
        attribution: '© OpenStreetMap'
      });
    }

    tileLayerRef.current.addTo(mapInstanceRef.current);
  }, [mapType, leafletLoaded]);

  // 4. Viewport Sync
  useEffect(() => {
    if (mapInstanceRef.current) {
      const currentCenter = mapInstanceRef.current.getCenter();
      const latDiff = Math.abs(currentCenter.lat - mapCenter.lat);
      const lngDiff = Math.abs(currentCenter.lng - mapCenter.lng);

      if (latDiff > 0.01 || lngDiff > 0.01) {
        mapInstanceRef.current.setView([mapCenter.lat, mapCenter.lng], mapZoom, { animate: true });
      }
    }
  }, [mapCenter, mapZoom]);

  // 5. Markers Synchronization
  useEffect(() => {
    if (!leafletLoaded || !mapInstanceRef.current || !markersGroupRef.current) return;
    const L = (window as any).L;

    markersGroupRef.current.clearLayers();

    // User Location Blue Dot
    if (locPermission === 'granted') {
      const gpsHtml = `
        <div class="relative flex items-center justify-center">
          <div class="absolute w-8 h-8 rounded-full bg-blue-500/35 animate-ping"></div>
          <div class="w-4 h-4 rounded-full bg-blue-600 border-2 border-white shadow-md"></div>
        </div>
      `;
      const gpsIcon = L.divIcon({
        html: gpsHtml,
        className: 'custom-gps-icon',
        iconSize: [32, 32],
        iconAnchor: [16, 16]
      });

      L.marker([gpsCoordinates.lat, gpsCoordinates.lng], { icon: gpsIcon })
        .addTo(markersGroupRef.current)
        .bindPopup(`<strong>Your Current Location</strong>`);
    }

    // Render Hospitals Layer
    places.forEach((p) => {
      const isSelected = selectedPlaceId === p.id;
      const markerHtml = `
        <div class="w-9 h-9 rounded-full flex items-center justify-center shadow-lg border transition-all ${
          isSelected ? 'bg-rose-600 text-white ring-4 ring-rose-500/25' : 'bg-white text-rose-500'
        }">
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" class="w-4.5 h-4.5">
            <path d="M12 6v12M9 9h6M19 19H5a2 2 0 0 1-2-2V7a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2v10a2 2 0 0 1-2 2z"></path>
          </svg>
        </div>
      `;

      const hospitalIcon = L.divIcon({
        html: markerHtml,
        className: `custom-hospital-icon-${p.id}`,
        iconSize: [36, 36],
        iconAnchor: [18, 18]
      });

      const marker = L.marker([p.lat, p.lng], { icon: hospitalIcon }).addTo(markersGroupRef.current);

      marker.bindPopup(`
        <div style="font-family: sans-serif; padding: 4px;">
          <strong>${p.name}</strong><br/>
          <span style="font-size: 10px; color: #e11d48; font-weight: bold;">${p.type.toUpperCase()}</span><br/>
          <small style="color: #64748b;">${p.address}</small>
        </div>
      `, { closeButton: false, offset: L.point(0, -8) });

      marker.on('click', () => {
        setSelectedPlaceId(p.id);
        setMapCenter({ lat: p.lat, lng: p.lng });
        setMapZoom(14);
      });

      if (isSelected) {
        setTimeout(() => marker.openPopup(), 100);
      }
    });
  }, [places, selectedPlaceId, gpsCoordinates, locPermission, leafletLoaded]);

  // Overpass Data Resolver
  const handleQueryOverpass = async (targetCoords = gpsCoordinates, isGpsMode = false) => {
    setIsLoading(true);
    setErrorText(null);
    setApiLogs('Querying live OpenStreetMap Data...');

    const { lat, lng } = targetCoords;
    const radiusMeters = Math.round(searchRadius * 1000);

    const overpassQuery = `[out:json][timeout:15];(node["amenity"~"hospital|clinic|doctors"](around:${radiusMeters},${lat},${lng});way["amenity"~"hospital|clinic|doctors"](around:${radiusMeters},${lat},${lng}););out center;`;
    const url = `https://overpass-api.de/api/interpreter?data=${encodeURIComponent(overpassQuery)}`;

    try {
      const response = await fetch(url);
      if (!response.ok) throw new Error('OSM Server error');
      const data = await response.json();
      const elements = data.elements || [];

      if (elements.length === 0) {
        setApiLogs('No local results discovered. Loading fallbacks.');
        loadCityFallback(selectedMetro, targetCoords, isGpsMode);
        return;
      }

      const formatted: HealthcarePlace[] = elements.map((elem: any, idx: number) => {
        const itemLat = elem.lat !== undefined ? elem.lat : (elem.center ? elem.center.lat : lat);
        const itemLng = elem.lon !== undefined ? elem.lon : (elem.center ? elem.center.lon : lng);
        const tags = elem.tags || {};
        return {
          id: `osm-${elem.id || idx}`,
          name: tags.name || tags.official_name || `Healthcare Center #${idx + 1}`,
          lat: itemLat,
          lng: itemLng,
          address: tags['addr:street'] ? `${tags['addr:housenumber'] || ''} ${tags['addr:street']}, ${tags['addr:city'] || ''}`.trim() : `${tags['addr:suburb'] || 'Medical Zone'}, ${tags['addr:city'] || 'Nearby'}_`,
          type: tags.amenity === 'hospital' ? 'hospital' : 'clinic',
          phone: tags.phone || tags['contact:phone'] || undefined,
          website: tags.website || undefined,
          emergency: tags.emergency || undefined,
          distance: calculateDistance(lat, lng, itemLat, itemLng)
        };
      });

      formatted.sort((a, b) => (a.distance || 0) - (b.distance || 0));
      setPlaces(formatted);
      setApiLogs(`Successfully discovered ${formatted.length} hospitals.`);

      if (formatted.length > 0) {
        setSelectedPlaceId(formatted[0].id);
        setMapCenter({ lat: formatted[0].lat, lng: formatted[0].lng });
        setMapZoom(13);
      }
    } catch (err) {
      loadCityFallback(selectedMetro, targetCoords, isGpsMode);
    } finally {
      setIsLoading(false);
    }
  };

  const loadCityFallback = (metroKey: string, refCoords: { lat: number; lng: number }, isGpsMode = false) => {
    const fallbackList = METRO_FALLBACK_DATA[metroKey] || ALL_INDIA_HOSPITALS;
    const mapped = fallbackList.map(h => ({
      ...h,
      distance: calculateDistance(refCoords.lat, refCoords.lng, h.lat, h.lng)
    })).sort((a, b) => a.distance - b.distance);

    setPlaces(mapped);
    if (mapped.length > 0) {
      setSelectedPlaceId(mapped[0].id);
      setMapCenter({ lat: mapped[0].lat, lng: mapped[0].lng });
      setMapZoom(12);
    }
  };

  const triggerGpsScan = () => {
    setIsLoading(true);
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (pos) => {
          const uCoords = { lat: pos.coords.latitude, lng: pos.coords.longitude };
          setGpsCoordinates(uCoords);
          setLocPermission('granted');
          handleQueryOverpass(uCoords, true);
        },
        (err) => {
          setIsLoading(false);
          setLocPermission('denied');
          setErrorText('Could not lock browser GPS parameters. Please type location instead.');
        },
        { enableHighAccuracy: true, timeout: 10000 }
      );
    }
  };

  const handleSearchCityState = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!searchCity.trim()) return;

    setIsLoading(true);
    setErrorText(null);
    const queryStr = `${searchCity}${searchState ? ', ' + searchState : ''}`;

    try {
      const response = await fetch(`https://nominatim.openstreetmap.org/search?q=${encodeURIComponent(queryStr)}&format=json&limit=1`, {
        headers: { 'User-Agent': 'SajivaniCardiacLocator/1.0' }
      });
      const data = await response.json();
      if (data && data.length > 0) {
        const target = { lat: parseFloat(data[0].lat), lng: parseFloat(data[0].lon) };
        setGpsCoordinates(target);
        await handleQueryOverpass(target, false);
      } else {
        setErrorText('Location address mismatch.');
        setIsLoading(false);
      }
    } catch {
      setIsLoading(false);
    }
  };

  const selectedPlace = places.find(p => p.id === selectedPlaceId);

  return (
    <div className="space-y-6 p-4 max-w-7xl mx-auto" id="open-care-locator-root">
      {/* Header Panel */}
      <div className="bg-white border border-slate-200 p-5 rounded-3xl flex flex-col md:flex-row gap-5 justify-between items-start md:items-center shadow-sm">
        <div className="space-y-1 text-left">
          <span className="text-xs font-mono font-bold text-emerald-600 uppercase tracking-widest block">Live OpenStreetMap Workspace</span>
          <h3 className="text-lg font-black text-slate-900">{t?.locator?.title || "Emergency Care Tracker"}</h3>
          <p className="text-xs text-slate-500">{t?.locator?.subtitle || "Locate regional clinics and multi-speciality medical hubs"}</p>
        </div>

        <button 
          onClick={() => setShowPermissionModal(true)}
          disabled={isLoading}
          className="bg-slate-900 hover:bg-slate-800 text-white rounded-xl py-2.5 px-4 text-xs font-bold transition-all flex items-center gap-1.5 cursor-pointer shadow-md"
        >
          {isLoading ? <Loader2 className="w-4 h-4 animate-spin" /> : <Compass className="w-4 h-4 text-emerald-400" />}
          <span>Scan Nearby Care</span>
        </button>
      </div>

      {/* Geocoding Search Form */}
      <form onSubmit={handleSearchCityState} className="bg-white border border-slate-200 p-5 rounded-3xl grid grid-cols-1 sm:grid-cols-12 gap-4 text-left shadow-sm">
        <div className="sm:col-span-5">
          <label className="text-[11px] font-mono font-bold uppercase tracking-wider text-slate-400 block mb-1">City Name</label>
          <input 
            type="text" 
            value={searchCity} 
            onChange={e => setSearchCity(e.target.value)}
            placeholder="e.g. Mumbai, Delhi, Pune" 
            className="w-full bg-slate-50 border border-slate-200 text-xs font-semibold rounded-xl px-4 py-2.5 outline-none"
            required
          />
        </div>
        <div className="sm:col-span-4">
          <label className="text-[11px] font-mono font-bold uppercase tracking-wider text-slate-400 block mb-1">State Zone</label>
          <input 
            type="text" 
            value={searchState} 
            onChange={e => setSearchState(e.target.value)}
            placeholder="Optional" 
            className="w-full bg-slate-50 border border-slate-200 text-xs font-semibold rounded-xl px-4 py-2.5 outline-none"
          />
        </div>
        <div className="sm:col-span-3 flex items-end">
          <button type="submit" disabled={isLoading} className="w-full bg-slate-900 hover:bg-slate-800 text-white text-xs font-bold py-2.5 rounded-xl h-10 transition-all uppercase tracking-wider cursor-pointer">
            {isLoading ? 'Searching...' : 'Search Location'}
          </button>
        </div>
      </form>

      {/* Split Columns */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Hospitals List Card Menu */}
        <div className="lg:col-span-4 space-y-4 max-h-[550px] overflow-y-auto pr-1">
          {errorText && (
            <div className="p-4 bg-amber-50 border border-amber-200 rounded-2xl text-left text-xs text-amber-900 flex gap-2">
              <AlertTriangle className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
              <p>{errorText}</p>
            </div>
          )}

          <div className="flex items-center gap-1.5 px-1">
            <Hospital className="w-4 h-4 text-rose-500" />
            <span className="text-[11px] font-mono font-bold text-slate-400 uppercase tracking-wider">Registered Listings ({places.length})</span>
          </div>

          <div className="flex flex-col gap-2">
            {places.map((p) => (
              <div 
                key={p.id}
                onClick={() => {
                  setSelectedPlaceId(p.id);
                  setMapCenter({ lat: p.lat, lng: p.lng });
                  setMapZoom(14);
                }}
                className={`p-4 rounded-2xl border text-left cursor-pointer transition-all ${
                  selectedPlaceId === p.id ? 'bg-rose-50/60 border-rose-300 ring-1 ring-rose-300' : 'bg-white border-slate-200 hover:bg-slate-50'
                }`}
              >
                <div className="flex justify-between items-start gap-2">
                  <h4 className="text-xs font-bold text-slate-900 leading-tight">{p.name}</h4>
                  <span className="text-[9px] uppercase font-mono bg-slate-100 rounded px-1.5 py-0.5 font-bold text-slate-600">{p.type}</span>
                </div>
                <p className="text-[11px] text-slate-500 mt-1 flex items-center gap-1"><MapPin className="w-3 h-3 text-slate-400" /> {p.address}</p>
                {p.distance !== undefined && (
                  <div className="text-[10px] font-mono font-bold text-slate-700 mt-2">Distance: {p.distance.toFixed(2)} km</div>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Dynamic Map Frame Component */}
        <div className="lg:col-span-8 bg-slate-100 border border-slate-200 rounded-3xl overflow-hidden relative min-h-[450px] lg:h-[550px] shadow-inner flex flex-col justify-between">
          {/* Map Layer Switcher Top Bar */}
          <div className="absolute top-4 right-4 z-[400] bg-white/95 backdrop-blur p-1 rounded-xl border border-slate-200/80 shadow-md flex items-center gap-1">
            <button onClick={() => setMapType('streets')} className={`px-2.5 py-1 text-[10px] font-bold rounded-lg transition-all ${mapType === 'streets' ? 'bg-slate-900 text-white' : 'text-slate-600'}`}><Map className="w-3 h-3 inline mr-1"/>Map</button>
            <button onClick={() => setMapType('satellite')} className={`px-2.5 py-1 text-[10px] font-bold rounded-lg transition-all ${mapType === 'satellite' ? 'bg-slate-900 text-white' : 'text-slate-600'}`}><Globe className="w-3 h-3 inline mr-1"/>Satellite</button>
          </div>

          <div className="flex-1 w-full h-full relative z-[1]">
            <div ref={mapContainerRef} className="w-full h-full absolute inset-0" style={{ minHeight: '400px' }} />
          </div>

          {/* Active Logs Footer info bar */}
          <div className="bg-slate-950 text-white px-4 py-2.5 font-mono text-[11px] flex justify-between items-center z-[400]">
            <div className="flex items-center gap-2 truncate">
              <Activity className="w-3.5 h-3.5 text-emerald-400 animate-pulse shrink-0" />
              <span className="truncate text-slate-400">{apiLogs}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Permission Explainer Trigger Modal */}
      {showPermissionModal && (
        <div className="fixed inset-0 bg-slate-950/50 backdrop-blur-sm flex items-center justify-center z-[9999] p-4">
          <div className="bg-white rounded-3xl max-w-md w-full border p-6 space-y-4 relative text-left shadow-2xl">
            <button onClick={() => setShowPermissionModal(false)} className="absolute top-4 right-4 text-slate-400 hover:text-slate-600"><X className="w-4 h-4"/></button>
            <h3 className="text-base font-black text-slate-900">Authorize Browser GPS telemetry</h3>
            <p className="text-xs text-slate-600 leading-relaxed">This module checks high-precision coordinates locally to map closest registered emergency triage centers securely.</p>
            <button 
              onClick={() => { setShowPermissionModal(false); triggerGpsScan(); }}
              className="w-full bg-slate-900 hover:bg-slate-800 text-white text-xs font-bold py-3 rounded-xl uppercase tracking-wider shadow-md"
            >
              Authorize System GPS Scan
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
