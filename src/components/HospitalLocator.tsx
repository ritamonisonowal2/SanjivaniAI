import React, { useState, useEffect } from 'react';
import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet';
import L from 'leaflet';
import { TRANSLATIONS } from '../translations';
import { 
  Hospital, 
  Search, 
  MapPin, 
  Compass, 
  Loader2,
  AlertTriangle,
  Activity,
  X,
  Map as MapIcon,
  Globe
} from 'lucide-react';

// Setup default coordinates
const INDIA_DEFAULT_CENTER: [number, number] = [20.5937, 78.9629];

interface HealthcarePlace {
  id: string;
  name: string;
  lat: number;
  lng: number;
  address: string;
  type: 'hospital' | 'clinic' | 'doctors' | 'emergency_room';
  distance?: number;
}

// Small sub-component to handle automatic smooth panning
function MapRecenter({ center, zoom }: { center: [number, number]; zoom: number }) {
  const map = useMap();
  useEffect(() => {
    map.setView(center, zoom, { animate: true });
  }, [center, zoom, map]);
  return null;
}

// Quick custom marker icon creators using standard Leaflet DivIcon
const createUserIcon = () => L.divIcon({
  html: `
    <div class="relative flex items-center justify-center">
      <div class="absolute w-8 h-8 rounded-full bg-blue-500/35 animate-ping"></div>
      <div class="w-4 h-4 rounded-full bg-blue-600 border-2 border-white shadow-md"></div>
    </div>`,
  className: 'custom-user-gps',
  iconSize: [32, 32],
  iconAnchor: [16, 16]
});

const createHospitalIcon = (isSelected: boolean) => L.divIcon({
  html: `
    <div class="w-9 h-9 rounded-full flex items-center justify-center shadow-lg border transition-all ${
      isSelected ? 'bg-rose-600 text-white ring-4 ring-rose-500/25 scale-110' : 'bg-white text-rose-500 hover:scale-105'
    }">
      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" class="w-4.5 h-4.5">
        <path d="M12 6v12M9 9h6M19 19H5a2 2 0 0 1-2-2V7a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2v10a2 2 0 0 1-2 2z"></path>
      </svg>
    </div>`,
  className: 'custom-hospital-marker',
  iconSize: [36, 36],
  iconAnchor: [18, 18]
});

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

  const [gpsCoordinates, setGpsCoordinates] = useState<[number, number]>(INDIA_DEFAULT_CENTER);
  const [mapCenter, setMapCenter] = useState<[number, number]>(INDIA_DEFAULT_CENTER);
  const [mapZoom, setMapZoom] = useState<number>(5);
  const [locPermission, setLocPermission] = useState<'prompt' | 'granted' | 'denied'>('prompt');
  const [isLoading, setIsLoading] = useState(false);
  const [places, setPlaces] = useState<HealthcarePlace[]>([]);
  const [selectedPlaceId, setSelectedPlaceId] = useState<string | null>(null);
  const [apiLogs, setApiLogs] = useState<string>('Sajivani Tracker Engine Ready.');
  const [errorText, setErrorText] = useState<string | null>(null);
  const [searchCity, setSearchCity] = useState('');
  const [searchState, setSearchState] = useState('');
  const [showPermissionModal, setShowPermissionModal] = useState(false);
  const [mapType, setMapType] = useState<'streets' | 'satellite'>('streets');

  const tileLayerUrl = mapType === 'satellite' 
    ? 'https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}'
    : 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png';

  // Query OpenStreetMap via Overpass API
  const handleQueryOverpass = async (targetCoords: [number, number]) => {
    setIsLoading(true);
    setErrorText(null);
    setApiLogs('Fetching live open-source hospital locations...');

    const [lat, lng] = targetCoords;
    const overpassQuery = `[out:json][timeout:15];(node["amenity"~"hospital|clinic|doctors"](around:25000,${lat},${lng});way["amenity"~"hospital|clinic|doctors"](around:25000,${lat},${lng}););out center;`;
    const url = `https://overpass-api.de/api/interpreter?data=${encodeURIComponent(overpassQuery)}`;

    try {
      const response = await fetch(url);
      if (!response.ok) throw new Error('OSM server failure');
      const data = await response.json();
      const elements = data.elements || [];

      if (elements.length === 0) {
        setPlaces([]);
        setApiLogs('Zero clinics or emergency departments detected within 25km.');
        return;
      }

      const formatted: HealthcarePlace[] = elements.map((elem: any, idx: number) => {
        const itemLat = elem.lat !== undefined ? elem.lat : (elem.center ? elem.center.lat : lat);
        const itemLng = elem.lon !== undefined ? elem.lon : (elem.center ? elem.center.lon : lng);
        const tags = elem.tags || {};
        return {
          id: `osm-${elem.id || idx}`,
          name: tags.name || tags.official_name || `Medical Center #${idx + 1}`,
          lat: itemLat,
          lng: itemLng,
          address: tags['addr:street'] ? `${tags['addr:housenumber'] || ''} ${tags['addr:street']}`.trim() : `${tags['addr:suburb'] || 'Healthcare Hub'}`,
          type: tags.amenity === 'hospital' ? 'hospital' : 'clinic',
          distance: calculateDistance(lat, lng, itemLat, itemLng)
        };
      }).sort((a, b) => (a.distance || 0) - (b.distance || 0));

      setPlaces(formatted);
      setApiLogs(`Discovered ${formatted.length} valid medical destinations.`);
      
      if (formatted.length > 0) {
        setSelectedPlaceId(formatted[0].id);
        setMapCenter([formatted[0].lat, formatted[0].lng]);
        setMapZoom(13);
      }
    } catch {
      setErrorText('The public OpenStreetMap API server timed out. Please try again shortly.');
    } finally {
      setIsLoading(false);
    }
  };

  const triggerGpsScan = () => {
    setIsLoading(true);
    if (!navigator.geolocation) {
      setErrorText('Your web browser environment does not support GPS hardware tracing.');
      setIsLoading(false);
      return;
    }

    navigator.geolocation.getCurrentPosition(
      (pos) => {
        const coords: [number, number] = [pos.coords.latitude, pos.coords.longitude];
        setGpsCoordinates(coords);
        setMapCenter(coords);
        setLocPermission('granted');
        handleQueryOverpass(coords);
      },
      () => {
        setLocPermission('denied');
        setErrorText('Browser blocked location permission. Please provide city name manually.');
        setIsLoading(false);
      },
      { enableHighAccuracy: true, timeout: 8000 }
    );
  };

  const handleSearchCityState = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!searchCity.trim()) return;

    setIsLoading(true);
    setErrorText(null);
    const query = `${searchCity}${searchState ? ', ' + searchState : ''}`;

    try {
      const response = await fetch(`https://nominatim.openstreetmap.org/search?q=${encodeURIComponent(query)}&format=json&limit=1`, {
        headers: { 'User-Agent': 'SajivaniLocator/1.1' }
      });
      const data = await response.json();
      if (data && data.length > 0) {
        const coords: [number, number] = [parseFloat(data[0].lat), parseFloat(data[0].lon)];
        setGpsCoordinates(coords);
        setMapCenter(coords);
        setMapZoom(13);
        await handleQueryOverpass(coords);
      } else {
        setErrorText('Could not locate that city structure. Check spelling.');
        setIsLoading(false);
      }
    } catch {
      setIsLoading(false);
    }
  };

  return (
    <div className="space-y-6 p-4 max-w-7xl mx-auto text-left" id="open-care-locator-root">
      
      {/* Upper Module Panel */}
      <div className="bg-white border border-slate-200 p-5 rounded-3xl flex flex-col md:flex-row gap-5 justify-between items-start md:items-center shadow-sm">
        <div className="space-y-1">
          <span className="text-xs font-mono font-bold text-emerald-600 uppercase tracking-widest block flex items-center gap-1">
            <span className="w-2 h-2 rounded-full bg-emerald-500 inline-block animate-pulse"></span> React Leaflet Wrapper Connected
          </span>
          <h3 className="text-lg font-black text-slate-900">{t?.locator?.title || "Nearby Hospital Locator"}</h3>
          <p className="text-xs text-slate-500">{t?.locator?.subtitle || "Map emergency clinics and local surgical stations immediately"}</p>
        </div>

        <button 
          onClick={() => setShowPermissionModal(true)}
          disabled={isLoading}
          className="bg-slate-900 hover:bg-slate-800 disabled:bg-slate-400 text-white rounded-xl py-2.5 px-4 text-xs font-bold transition-all flex items-center gap-1.5 cursor-pointer shadow-md"
        >
          {isLoading ? <Loader2 className="w-4 h-4 animate-spin" /> : <Compass className="w-4 h-4" />}
          <span>Locate Nearest Hospitals</span>
        </button>
      </div>

      {/* Geocoding Input Form */}
      <form onSubmit={handleSearchCityState} className="bg-white border border-slate-200 p-5 rounded-3xl grid grid-cols-1 sm:grid-cols-12 gap-4 shadow-sm">
        <div className="sm:col-span-5">
          <label className="text-[11px] font-mono font-bold uppercase tracking-wider text-slate-400 block mb-1">Target City Name</label>
          <input 
            type="text" 
            value={searchCity} 
            onChange={e => setSearchCity(e.target.value)}
            placeholder="e.g. Mumbai, New Delhi" 
            className="w-full bg-slate-50 border border-slate-200 text-xs font-semibold rounded-xl px-4 py-2.5 outline-none transition-all focus:border-slate-300"
            required
          />
        </div>
        <div className="sm:col-span-4">
          <label className="text-[11px] font-mono font-bold uppercase tracking-wider text-slate-400 block mb-1">State / Province</label>
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
            {isLoading ? 'Scanning Geo-Nodes...' : 'Search Location'}
          </button>
        </div>
      </form>

      {/* Primary Workspace Division */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        
        {/* Dynamic List Sidebar */}
        <div className="lg:col-span-4 space-y-4 max-h-[550px] overflow-y-auto pr-1">
          {errorText && (
            <div className="p-4 bg-amber-50 border border-amber-200 rounded-2xl text-xs text-amber-900 flex gap-2">
              <AlertTriangle className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
              <p>{errorText}</p>
            </div>
          )}

          <div className="flex items-center gap-1.5 px-1">
            <Hospital className="w-4 h-4 text-rose-500" />
            <span className="text-[11px] font-mono font-bold text-slate-400 uppercase tracking-wider">Discovered Destinations ({places.length})</span>
          </div>

          <div className="flex flex-col gap-2.5">
            {places.length === 0 ? (
              <div className="text-center py-12 border border-dashed border-slate-200 rounded-2xl text-xs text-slate-400 bg-white">
                No hospitals loaded yet. Search a city or scan your GPS above.
              </div>
            ) : (
              places.map((p) => {
                const isSelected = selectedPlaceId === p.id;
                return (
                  <div 
                    key={p.id}
                    onClick={() => {
                      setSelectedPlaceId(p.id);
                      setMapCenter([p.lat, p.lng]);
                      setMapZoom(15);
                    }}
                    className={`p-4 rounded-2xl border cursor-pointer transition-all ${
                      isSelected ? 'bg-rose-50/60 border-rose-300 ring-1 ring-rose-300 shadow-sm' : 'bg-white border-slate-200 hover:bg-slate-50'
                    }`}
                  >
                    <div className="flex justify-between items-start gap-2">
                      <h4 className="text-xs font-bold text-slate-900 leading-tight">{p.name}</h4>
                      <span className="text-[9px] uppercase font-mono bg-slate-100 rounded px-1.5 py-0.5 font-bold text-slate-600 shrink-0">{p.type}</span>
                    </div>
                    <p className="text-[11px] text-slate-500 mt-1 flex items-center gap-1"><MapPin className="w-3 h-3 text-slate-400 shrink-0" /> {p.address}</p>
                    {p.distance !== undefined && (
                      <div className="text-[10px] font-mono font-bold text-slate-700 mt-2">Distance: {p.distance.toFixed(2)} km</div>
                    )}
                  </div>
                );
              })
            )}
          </div>
        </div>

        {/* Declarative Map Component Viewport */}
        <div className="lg:col-span-8 bg-slate-100 border border-slate-200 rounded-3xl overflow-hidden relative min-h-[450px] lg:h-[550px] shadow-sm flex flex-col justify-between">
          
          {/* Layer Controls Switcher Overlay */}
          <div className="absolute top-4 right-4 z-[1000] bg-white/95 backdrop-blur p-1 rounded-xl border border-slate-200/80 shadow-md flex items-center gap-1">
            <button onClick={() => setMapType('streets')} className={`px-2.5 py-1 text-[10px] font-bold rounded-lg transition-all ${mapType === 'streets' ? 'bg-slate-900 text-white' : 'text-slate-600'}`}><MapIcon className="w-3 h-3 inline mr-1"/>Map</button>
            <button onClick={() => setMapType('satellite')} className={`px-2.5 py-1 text-[10px] font-bold rounded-lg transition-all ${mapType === 'satellite' ? 'bg-slate-900 text-white' : 'text-slate-600'}`}><Globe className="w-3 h-3 inline mr-1"/>Satellite</button>
          </div>

          <div className="flex-1 w-full h-full relative z-[1]">
            <MapContainer center={mapCenter} zoom={mapZoom} className="w-full h-full absolute inset-0" zoomControl={true}>
              <TileLayer url={tileLayerUrl} attribution="&copy; OpenStreetMap entries" />
              
              <MapRecenter center={mapCenter} zoom={mapZoom} />

              {/* User Position Blue Marker pin */}
              {locPermission === 'granted' && (
                <Marker position={gpsCoordinates} icon={createUserIcon()}>
                  <Popup><strong>Your Current Position Lock</strong></Popup>
                </Marker>
              )}

              {/* Loop and map dynamic care centers safely inside React Tree */}
              {places.map((p) => (
                <Marker 
                  key={p.id} 
                  position={[p.lat, p.lng]} 
                  icon={createHospitalIcon(selectedPlaceId === p.id)}
                  eventHandlers={{
                    click: () => {
                      setSelectedPlaceId(p.id);
                      setMapCenter([p.lat, p.lng]);
                      setMapZoom(14);
                    }
                  }}
                >
                  <Popup>
                    <div className="text-xs p-0.5 font-sans">
                      <strong className="text-slate-900 font-bold block">{p.name}</strong>
                      <span className="text-[10px] uppercase font-bold text-rose-600 block mt-0.5">{p.type}</span>
                    </div>
                  </Popup>
                </Marker>
              ))}
            </MapContainer>
          </div>

          {/* Infrastructure Live Telemetry Bar */}
          <div className="bg-slate-950 text-white px-4 py-2.5 font-mono text-[11px] flex justify-between items-center z-[1000]">
            <div className="flex items-center gap-2 truncate">
              <Activity className="w-3.5 h-3.5 text-emerald-400 shrink-0 animate-pulse" />
              <span className="truncate text-slate-300">{apiLogs}</span>
            </div>
          </div>
        </div>

      </div>

      {/* Permissions Backdrop Modal */}
      {showPermissionModal && (
        <div className="fixed inset-0 bg-slate-950/50 backdrop-blur-sm flex items-center justify-center z-[9999] p-4">
          <div className="bg-white rounded-3xl max-w-md w-full border p-6 space-y-4 relative shadow-2xl">
            <button onClick={() => setShowPermissionModal(false)} className="absolute top-4 right-4 text-slate-400 hover:text-slate-600"><X className="w-4 h-4"/></button>
            <h3 className="text-base font-black text-slate-900">Request Location Services</h3>
            <p className="text-xs text-slate-500 leading-relaxed">This maps nearby clinical triage coordinates relative to your position using on-device sandboxed coordinate loops.</p>
            <button 
              onClick={() => { setShowPermissionModal(false); triggerGpsScan(); }}
              className="w-full bg-slate-900 hover:bg-slate-800 text-white text-xs font-bold py-3 rounded-xl uppercase tracking-wider"
            >
              Verify Active Satellite Connection
            </button>
          </div>
        </div>
      )}

    </div>
  );
}
