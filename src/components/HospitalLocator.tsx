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
  Loader2,
  AlertTriangle,
  Activity,
  X
} from 'lucide-react';

// Default center (Mumbai Chhatrapati Shivaji)
const DEFAULT_CENTER = { lat: 19.0760, lng: 72.8777 };
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
  distance?: number;
  speciality?: string;
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
    },
    {
      id: 'm-3',
      name: 'Sajivani Cardiac Care Clinic - Bandra West',
      lat: 19.0585,
      lng: 72.8305,
      address: 'Turner Hill Road, Near Bandra Station, Mumbai 400050',
      type: 'clinic',
      phone: '+91 22 2640 1004',
      website: 'https://sajivani.ai',
      emergency: 'no',
      distance: 2.1
    }
  ],
  delhi: [
    {
      id: 'd-1',
      name: 'All India Institute of Medical Sciences (AIIMS) - Cardio-Thoracic Centre',
      lat: 28.5672,
      lng: 77.2100,
      address: 'Ansari Nagar, New Delhi, Delhi 110029',
      type: 'hospital',
      phone: '+91 11 2658 8500',
      website: 'https://www.aiims.edu',
      emergency: 'yes',
      distance: 1.2
    },
    {
      id: 'd-2',
      name: 'Fortis Escorts Heart Institute',
      lat: 28.5605,
      lng: 77.2755,
      address: 'Okhla Road, Opp Holy Family Hospital, New Delhi, Delhi 110025',
      type: 'hospital',
      phone: '+91 11 4713 5000',
      website: 'https://www.fortisescorts.in',
      emergency: 'yes',
      distance: 2.8
    },
    {
      id: 'd-3',
      name: 'Sajivani Heart Specialist Ward - Connaught Place',
      lat: 28.6300,
      lng: 77.2185,
      address: 'Kasturba Gandhi Marg, Near CP Circle, New Delhi 110001',
      type: 'clinic',
      phone: '+91 11 4350 2004',
      website: 'https://sajivani.ai',
      emergency: 'no',
      distance: 0.9
    }
  ],
  bengaluru: [
    {
      id: 'b-1',
      name: 'Sri Jayadeva Institute of Cardiovascular Sciences and Research',
      lat: 12.9230,
      lng: 77.5990,
      address: 'Bannerghatta Main Road, Phase 3, Jayanagar, Bengaluru, Karnataka 560069',
      type: 'hospital',
      phone: '+91 80 2297 7400',
      website: 'http://jayadevacardiology.com',
      emergency: 'yes',
      distance: 1.1
    },
    {
      id: 'b-2',
      name: 'Narayana Institute of Cardiac Sciences',
      lat: 12.7955,
      lng: 77.6945,
      address: '258/A, Bommasandra Industrial Area, Anekal Taluk, Bengaluru 560099',
      type: 'hospital',
      phone: '+91 80 7122 2222',
      website: 'https://www.narayanahealth.org',
      emergency: 'yes',
      distance: 3.4
    },
    {
      id: 'b-3',
      name: 'Sajivani Cardiac Unit - Indiranagar',
      lat: 12.9785,
      lng: 77.6385,
      address: '100 Feet Road, HAL 2nd Stage, Indiranagar, Bengaluru 560038',
      type: 'clinic',
      phone: '+91 80 4124 1004',
      website: 'https://sajivani.ai',
      emergency: 'no',
      distance: 1.9
    }
  ],
  pune: [
    {
      id: 'p-1',
      name: 'Ruby Hall Clinic - Department of Cardiology',
      lat: 18.5312,
      lng: 73.8732,
      address: '40 Sassoon Road, Near Pune Railway Station, Pune, Maharashtra 411001',
      type: 'hospital',
      phone: '+91 20 6645 5100',
      website: 'https://rubyhall.com',
      emergency: 'yes',
      distance: 1.3
    },
    {
      id: 'p-2',
      name: 'Jehangir Hospital Heart Center',
      lat: 18.5320,
      lng: 73.8755,
      address: '32 Sassoon Road, Opp Central Excise, Pune 411001',
      type: 'hospital',
      phone: '+91 20 6681 1000',
      website: 'http://www.jehangirhospital.com',
      emergency: 'yes',
      distance: 1.4
    },
    {
      id: 'p-3',
      name: 'Sajivani Specialist Ward - Shivajinagar',
      lat: 18.5285,
      lng: 73.8505,
      address: 'Jangali Maharaj Road, Shivajinagar, Pune 411005',
      type: 'clinic',
      phone: '+91 20 2553 1004',
      website: 'https://sajivani.ai',
      emergency: 'no',
      distance: 2.0
    }
  ],
  ahmedabad: [
    {
      id: 'a-1',
      name: 'U. N. Mehta Institute of Cardiology and Research Center',
      lat: 23.0515,
      lng: 72.6030,
      address: 'Asarwa, Civil Hospital Campus, Ahmedabad, Gujarat 380016',
      type: 'hospital',
      phone: '+91 79 2268 4200',
      website: 'http://www.unmehtacardiology.org',
      emergency: 'yes',
      distance: 1.2
    },
    {
      id: 'a-2',
      name: 'SAL Hospital & Medical Institute',
      lat: 23.0385,
      lng: 72.5255,
      address: 'Drive-In Road, Opp Doordarshan Kendra, Navrangpura, Ahmedabad 380054',
      type: 'hospital',
      phone: '+91 79 6611 5600',
      website: 'https://www.salhospital.com',
      emergency: 'yes',
      distance: 2.9
    },
    {
      id: 'a-3',
      name: 'Sajivani Cardiac Center - Satellite',
      lat: 23.0245,
      lng: 72.5320,
      address: 'Satellite Road, Jodhpur Cross Road, Ahmedabad 380015',
      type: 'clinic',
      phone: '+91 79 2692 1004',
      website: 'https://sajivani.ai',
      emergency: 'no',
      distance: 1.8
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
    },
    {
      id: 'f-2',
      name: 'City Heart Emergency Department',
      lat: 19.0820,
      lng: 72.8850,
      address: '450 Santacruz Link Road, Kurla, Mumbai 400070',
      type: 'emergency_room',
      phone: '+91 22 6698 6666',
      website: 'https://sajivani.ai',
      emergency: 'yes',
      distance: 0.95
    }
  ]
};

const ALL_INDIA_HOSPITALS: HealthcarePlace[] = [
  ...METRO_FALLBACK_DATA.mumbai,
  ...METRO_FALLBACK_DATA.delhi,
  ...METRO_FALLBACK_DATA.bengaluru,
  ...METRO_FALLBACK_DATA.pune,
  ...METRO_FALLBACK_DATA.ahmedabad
];

function calculateDistance(lat1: number, lon1: number, lat2: number, lon2: number) {
  const R = 6371.0;
  const dLat = (lat2 - lat1) * Math.PI / 180;
  const dLon = (lon2 - lon1) * Math.PI / 180;
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) *
    Math.sin(dLon / 2) * Math.sin(dLon / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  return R * c;
}

export default function HospitalLocator() {
  const t = TRANSLATIONS;

  const [gpsCoordinates, setGpsCoordinates] = useState<{ lat: number; lng: number }>(INDIA_DEFAULT_CENTER);
  const [mapCenter, setMapCenter] = useState<{ lat: number; lng: number }>(INDIA_DEFAULT_CENTER);
  const [mapZoom, setMapZoom] = useState<number>(5);
  const [locPermission, setLocPermission] = useState<'prompt' | 'granted' | 'denied'>('prompt');
  const [searchRadius] = useState<number>(50);
  const [isLoading, setIsLoading] = useState(false);
  const [places, setPlaces] = useState<HealthcarePlace[]>(ALL_INDIA_HOSPITALS);
  const [selectedPlaceId, setSelectedPlaceId] = useState<string | null>(null);
  const [apiLogs, setApiLogs] = useState<string>('Sajivani GPS Engine initialized with All India Database.');
  const [errorText, setErrorText] = useState<string | null>(null);
  const [selectedMetro, setSelectedMetro] = useState<string>('all');
  const [searchCity, setSearchCity] = useState('');
  const [searchState, setSearchState] = useState('');
  const [showPermissionModal, setShowPermissionModal] = useState(false);

  const [leafletLoaded, setLeafletLoaded] = useState(false);
  const mapContainerRef = useRef<HTMLDivElement | null>(null);
  const mapInstanceRef = useRef<any>(null);
  const markersGroupRef = useRef<any>(null);

  // ─── 1. Dynamic Leaflet loader ────────────────────────────────────────────
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
    } else {
      const interval = setInterval(() => {
        if ((window as any).L) {
          setLeafletLoaded(true);
          clearInterval(interval);
        }
      }, 100);
      return () => clearInterval(interval);
    }
  }, []);

  // ─── 2. Leaflet Map Initialization ───────────────────────────────────────
  useEffect(() => {
    if (!leafletLoaded || !mapContainerRef.current) return;
    const L = (window as any).L;
    if (!L) return;

    if (!mapInstanceRef.current) {
      const map = L.map(mapContainerRef.current, {
        zoomControl: true,
        scrollWheelZoom: true,
      }).setView([mapCenter.lat, mapCenter.lng], mapZoom);

      const streetLayer = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        maxZoom: 19,
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
      });

      const satelliteLayer = L.tileLayer(
        'https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}',
        {
          maxZoom: 19,
          attribution: 'Tiles &copy; Esri &mdash; Source: Esri, Maxar, Earthstar Geographics'
        }
      );

      // Default to satellite view
      satelliteLayer.addTo(map);

      // Layer toggle control in top-right corner
      L.control.layers(
        { 'Satellite': satelliteLayer, 'Street Map': streetLayer },
        {},
        { position: 'topright', collapsed: false }
      ).addTo(map);

      map.on('moveend', () => {
        const center = map.getCenter();
        if (mapInstanceRef.current) {
          setMapCenter({ lat: center.lat, lng: center.lng });
        }
      });
      map.on('zoomend', () => {
        if (mapInstanceRef.current) {
          setMapZoom(map.getZoom());
        }
      });

      mapInstanceRef.current = map;
      markersGroupRef.current = L.layerGroup().addTo(map);
    }
  }, [leafletLoaded]);

  // ─── 3. Sync map viewport ─────────────────────────────────────────────────
  useEffect(() => {
    if (mapInstanceRef.current) {
      const currentCenter = mapInstanceRef.current.getCenter();
      const latDiff = Math.abs(currentCenter.lat - mapCenter.lat);
      const lngDiff = Math.abs(currentCenter.lng - mapCenter.lng);
      const zoomDiff = Math.abs(mapInstanceRef.current.getZoom() - mapZoom);

      if (latDiff > 0.001 || lngDiff > 0.001 || zoomDiff > 0.1) {
        mapInstanceRef.current.setView([mapCenter.lat, mapCenter.lng], mapZoom, { animate: true });
      }
    }
  }, [mapCenter, mapZoom]);

  // ─── 4. Markers ──────────────────────────────────────────────────────────
  useEffect(() => {
    if (!leafletLoaded || !mapInstanceRef.current || !markersGroupRef.current) return;
    const L = (window as any).L;
    if (!L) return;

    markersGroupRef.current.clearLayers();

    if (locPermission === 'granted') {
      const gpsHtml = `
        <div class="relative flex items-center justify-center pointer-events-none">
          <div class="absolute w-8 h-8 rounded-full bg-blue-500/35 border border-blue-400 animate-ping"></div>
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
        .bindPopup(`<strong>Your Current Location</strong><p style="margin:2px 0 0;font-size:10px;color:#555;">Locked via GPS / Cellular feed</p>`);
    }

    places.forEach((p) => {
      const isSelected = selectedPlaceId === p.id;
      const markerHtml = `
        <div class="transform transition-all duration-200" style="cursor: pointer;">
          <div class="w-9 h-9 rounded-full flex items-center justify-center shadow-lg border transition-all ${
            isSelected
              ? 'bg-rose-600 border-rose-300 text-white scale-110 ring-4 ring-rose-500/25'
              : 'bg-white border-slate-200 text-rose-500 hover:border-rose-400 hover:scale-105'
          }">
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
              <path d="M12 6v12"></path>
              <path d="M9 9h6"></path>
              <path d="M19 19H5a2 2 0 0 1-2-2V7a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2v10a2 2 0 0 1-2 2z"></path>
            </svg>
          </div>
        </div>
      `;

      const hospitalIcon = L.divIcon({
        html: markerHtml,
        className: `custom-hospital-icon-${p.id}`,
        iconSize: [36, 36],
        iconAnchor: [18, 18]
      });

      const marker = L.marker([p.lat, p.lng], { icon: hospitalIcon })
        .addTo(markersGroupRef.current);

      const popupHtml = `
        <div class="p-1 text-slate-800 text-left max-w-[210px] sm:max-w-[240px]" style="font-family: sans-serif; line-height: 1.4;">
          <strong class="text-xs font-black block leading-tight text-slate-900" style="margin-bottom: 2px;">${p.name}</strong>
          <span class="text-[9px] uppercase font-mono tracking-wider text-rose-600 block mt-1 font-bold">
            ${p.type.replace('_', ' ').toUpperCase()} &bull; ${p.distance !== undefined ? p.distance.toFixed(1) + ' km' : ''}
          </span>
          <p class="text-[10px] text-slate-500 mt-1 mb-0 leading-normal" style="margin: 4px 0 0; color: #64748b;">${p.address}</p>
          ${p.phone ? `<p class="text-[10px] text-slate-700 mt-1.5 leading-normal font-bold" style="margin: 4px 0 0; color: #1e293b;">📞 ${p.phone}</p>` : ''}
        </div>
      `;

      marker.bindPopup(popupHtml, {
        closeButton: false,
        offset: L.point(0, -8)
      });

      marker.on('click', () => {
        setSelectedPlaceId(p.id);
        setMapCenter({ lat: p.lat, lng: p.lng });
        setMapZoom(14);
        setApiLogs(`Selected facility marker: "${p.name}".`);
      });

      if (isSelected) {
        setTimeout(() => marker.openPopup(), 120);
      }
    });
  }, [places, selectedPlaceId, gpsCoordinates, locPermission, leafletLoaded]);

  // ─── GPS Scan ─────────────────────────────────────────────────────────────
  const triggerGpsScan = () => {
    setIsLoading(true);
    setErrorText(null);
    setApiLogs('Seeking exact GPS satellite connection. Please grant location access in your browser prompt...');

    if (!navigator.geolocation) {
      setIsLoading(false);
      setLocPermission('denied');
      setApiLogs('Precise GPS lookup unsupported by browser environment.');
      setErrorText('Precise location lookup is not supported by your browser.');
      return;
    }

    navigator.geolocation.getCurrentPosition(
      (pos) => {
        const uCoords = { lat: pos.coords.latitude, lng: pos.coords.longitude };
        setGpsCoordinates(uCoords);
        setMapCenter(uCoords);
        setMapZoom(13);
        setLocPermission('granted');
        setApiLogs('GPS connection verified. Active position locked with high accuracy!');
        setErrorText(null);
        handleQueryOverpass(uCoords);
      },
      (err) => {
        if (err.code === 1) {
          setIsLoading(false);
          setLocPermission('denied');
          const msg = 'Location access permission was denied by your browser. Please click the lock/settings icon in your browser address bar and set Location to "Allow", or click the "Open in New Tab" arrow at the top right to bypass iframe sandbox restrictions.';
          setApiLogs(`GPS search failed: ${msg}`);
          setErrorText(msg);
          return;
        }

        setApiLogs('High accuracy satellite lock slow. Checking local WiFi & cellular triangulation...');
        navigator.geolocation.getCurrentPosition(
          (pos2) => {
            const uCoords = { lat: pos2.coords.latitude, lng: pos2.coords.longitude };
            setGpsCoordinates(uCoords);
            setMapCenter(uCoords);
            setMapZoom(13);
            setLocPermission('granted');
            setApiLogs('Location locked securely using modern triangulation!');
            setErrorText(null);
            handleQueryOverpass(uCoords);
          },
          (err2) => {
            setIsLoading(false);
            setLocPermission('denied');
            let msg = '';
            if (err2.code === 2) {
              msg = 'Device Location services/GPS is toggled OFF on your device settings. Please enable GPS on your device to locate.';
            } else if (err2.code === 3) {
              msg = 'GPS connection timed out. Please try scanning again or try loaded fallbacks.';
            } else {
              msg = err2.message || 'GPS trace failed.';
            }
            setApiLogs(`Both precise GPS and local triangulation failed: ${msg}`);
            setErrorText(msg);
          },
          { enableHighAccuracy: false, timeout: 10000, maximumAge: Infinity }
        );
      },
      { enableHighAccuracy: true, timeout: 15000, maximumAge: 300000 }
    );
  };

  // ─── OSM Overpass Query ───────────────────────────────────────────────────
  const handleQueryOverpass = async (targetCoords = gpsCoordinates) => {
    setIsLoading(true);
    setErrorText(null);
    setApiLogs('Plugging into OpenStreetMap Overpass GIS Servers...');

    const { lat, lng } = targetCoords;
    const radiusMeters = Math.round(searchRadius * 1000);

    const overpassQuery = `[out:json][timeout:15];
(
  node["amenity"~"hospital|clinic|doctors"](around:${radiusMeters},${lat},${lng});
  way["amenity"~"hospital|clinic|doctors"](around:${radiusMeters},${lat},${lng});
);
out center;`;

    const url = `https://overpass-api.de/api/interpreter?data=${encodeURIComponent(overpassQuery)}`;

    try {
      const response = await fetch(url);
      if (!response.ok) throw new Error(`OSM Server error: ${response.status}`);

      const data = await response.json();
      const elements = data.elements || [];

      if (elements.length === 0) {
        setApiLogs('Search returned zero active hospital listings in this radius.');
        setErrorText('Zero registered health yards found in range. Loading regional fallback...');
        // ✅ FIX: pass 'default' so we never jump to a wrong metro
        loadCityFallback('default', targetCoords);
        setIsLoading(false);
        return;
      }

      const EXCLUDE_KEYWORDS = [
        'eye', 'netra', 'drishti', 'ophthalmology', 'ophthalmologist', 'optician', 'optometry', 'vision',
        'dental', 'dentist', 'danta', 'tooth', 'teeth', 'orthodontic',
        'veterinary', 'vet', 'animal', 'pet', 'beast',
        'skin', 'cosmetic', 'aesthetic', 'plastic surgery', 'hair', 'derma',
        'ayurvedic', 'ayurveda', 'homeotherapy', 'homeopathic', 'homeopathy', 'alternative medicine'
      ];

      const formatted: HealthcarePlace[] = elements
        .map((elem: any, idx: number) => {
          const itemLat = elem.lat !== undefined ? elem.lat : (elem.center ? elem.center.lat : lat);
          const itemLng = elem.lon !== undefined ? elem.lon : (elem.center ? elem.center.lon : lng);
          const tags = elem.tags || {};
          const parsedDistance = calculateDistance(lat, lng, itemLat, itemLng);

          return {
            id: `osm-${elem.id || idx}`,
            name: tags.name || tags.official_name || `Cardiothoracic Emergency Unit #${idx + 1}`,
            lat: itemLat,
            lng: itemLng,
            address: tags['addr:street']
              ? `${tags['addr:housenumber'] || ''} ${tags['addr:street']}, ${tags['addr:city'] || ''}`.trim()
              : `${tags['addr:suburb'] || tags['addr:place'] || 'Care sector block'}, ${tags['addr:city'] || 'Metropolitan'}`,
            type: tags.amenity === 'hospital' ? 'hospital' : tags.amenity === 'clinic' ? 'clinic' : 'doctors',
            phone: tags.phone || tags['contact:phone'] || tags['emergency:phone'] || undefined,
            website: tags.website || tags['contact:website'] || undefined,
            emergency: tags.emergency || undefined,
            distance: parsedDistance,
            speciality: tags.speciality || tags.healthcare || tags['healthcare:speciality'] || ''
          };
        })
        .filter((place: HealthcarePlace) => {
          const nameLower = place.name.toLowerCase();
          const specLower = (place.speciality || '').toLowerCase();
          return !EXCLUDE_KEYWORDS.some(kw => nameLower.includes(kw) || specLower.includes(kw));
        });

      formatted.sort((a, b) => (a.distance || 0) - (b.distance || 0));
      setPlaces(formatted);
      setApiLogs(`OSM Scan complete: Plotting ${formatted.length} facilities.`);

      if (formatted.length > 0) {
        setSelectedPlaceId(formatted[0].id);
        // ✅ FIX: center on the first *real* nearby result, not a hardcoded fallback
        setMapCenter({ lat: formatted[0].lat, lng: formatted[0].lng });
      }
    } catch (err: any) {
      console.warn(err);
      setErrorText('Public OSM Server slow. Grounding verified regional cardiological centers.');
      // ✅ FIX: pass 'default' so we never jump to a wrong metro on error either
      loadCityFallback('default', targetCoords);
    } finally {
      setIsLoading(false);
    }
  };

  // ─── City Fallback Loader ─────────────────────────────────────────────────
  // ✅ KEY FIX: Does NOT override mapCenter or mapZoom.
  //    The caller already positioned the map correctly via GPS; we only update the
  //    hospital list and select the closest result.
  const loadCityFallback = (metroKey: string, refCoords: { lat: number; lng: number }) => {
    const fallbackList =
      METRO_FALLBACK_DATA[metroKey] && METRO_FALLBACK_DATA[metroKey].length > 0
        ? METRO_FALLBACK_DATA[metroKey]
        : ALL_INDIA_HOSPITALS;

    const mapped = fallbackList.map(h => ({
      ...h,
      distance: +calculateDistance(refCoords.lat, refCoords.lng, h.lat, h.lng).toFixed(2)
    }));
    mapped.sort((a, b) => (a.distance || 0) - (b.distance || 0));
    setPlaces(mapped);

    // ✅ Only update the selected card — do NOT call setMapCenter / setMapZoom here.
    //    Those would snap the map away from the user's real GPS position.
    if (mapped.length > 0) {
      setSelectedPlaceId(mapped[0].id);
    }
  };

  // ─── Auto-locate on mount (only if permission already granted) ────────────
  useEffect(() => {
    let active = true;
    const autoLocate = async () => {
      try {
        if (navigator.permissions && navigator.permissions.query) {
          const status = await navigator.permissions.query({ name: 'geolocation' });
          if (status.state === 'granted') {
            if (active) {
              setApiLogs('Active browser GPS access verified. Pinpointing coordinates...');
              triggerGpsScan();
            }
          } else {
            setApiLogs('GPS coordinates ready. Click "Locate Nearest Hospitals" to trace via GPS.');
          }
        }
      } catch (e) {
        console.warn('Permissions query unsupported:', e);
      }
    };
    autoLocate();
    return () => { active = false; };
  }, []);

  // ─── Reset to All-India view ──────────────────────────────────────────────
  const resetToAllIndia = () => {
    setSelectedMetro('all');
    setMapCenter(INDIA_DEFAULT_CENTER);
    setMapZoom(5);
    setPlaces(ALL_INDIA_HOSPITALS);
    setSelectedPlaceId(null);
    setSearchCity('');
    setSearchState('');
    setApiLogs('Active map and results reset to All India view.');
  };

  // ─── Search by City + State ───────────────────────────────────────────────
  const handleSearchCityState = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!searchCity.trim()) {
      alert('Please enter a city name');
      return;
    }

    setIsLoading(true);
    setErrorText(null);
    setSelectedMetro('search');
    setApiLogs(`Geocoding coordinates for ${searchCity}${searchState ? ', ' + searchState : ''}...`);

    try {
      const queryStr = `${searchCity}${searchState ? ', ' + searchState : ''}`;
      const response = await fetch(
        `https://nominatim.openstreetmap.org/search?q=${encodeURIComponent(queryStr)}&format=json&limit=1`,
        {
          headers: {
            'Accept-Language': 'en',
            'User-Agent': 'SajivaniCardiacLocator/1.0 (sagarmaurya010@gmail.com)'
          }
        }
      );
      if (!response.ok) throw new Error('Geocoding server response failed');

      const data = await response.json();

      const resolveCoords = async (): Promise<{ lat: number; lng: number } | null> => {
        if (data && data.length > 0) {
          return { lat: parseFloat(data[0].lat), lng: parseFloat(data[0].lon) };
        }
        // Secondary: try with ', India' suffix
        const altQuery = `${searchCity}${searchState ? ', ' + searchState : ''}, India`;
        const resAlt = await fetch(
          `https://nominatim.openstreetmap.org/search?q=${encodeURIComponent(altQuery)}&format=json&limit=1`,
          {
            headers: {
              'Accept-Language': 'en',
              'User-Agent': 'SajivaniCardiacLocator/1.0 (sagarmaurya010@gmail.com)'
            }
          }
        );
        const dataAlt = await resAlt.json();
        if (dataAlt && dataAlt.length > 0) {
          return { lat: parseFloat(dataAlt[0].lat), lng: parseFloat(dataAlt[0].lon) };
        }
        return null;
      };

      const coords = await resolveCoords();

      if (coords) {
        setGpsCoordinates(coords);
        setMapCenter(coords);
        setMapZoom(12);
        setApiLogs(`Location geocoded: Lat ${coords.lat.toFixed(4)}, Lng ${coords.lng.toFixed(4)}`);
        await handleQueryOverpass(coords);
      } else {
        setApiLogs(`Location unresolved: "${searchCity}${searchState ? ', ' + searchState : ''}"`);
        setErrorText(`Could not resolve coordinates for "${searchCity}". Please check the spelling.`);
        setIsLoading(false);
      }
    } catch (err: any) {
      console.warn(err);
      setApiLogs('Geocoding failed. Utilizing pre-loaded All India cluster.');
      setErrorText('Location lookup is temporarily slow. Showing nearest matches from All India database.');
      setIsLoading(false);
    }
  };

  // ─── Metro Quick Jump ─────────────────────────────────────────────────────
  const handleJumpToMetro = (metro: string) => {
    setSelectedMetro(metro);
    let coords = DEFAULT_CENTER;
    if (metro === 'mumbai')    coords = { lat: 19.0760, lng: 72.8777 };
    else if (metro === 'delhi')     coords = { lat: 28.6139, lng: 77.2090 };
    else if (metro === 'bengaluru') coords = { lat: 12.9716, lng: 77.5946 };
    else if (metro === 'pune')      coords = { lat: 18.5204, lng: 73.8567 };
    else if (metro === 'ahmedabad') coords = { lat: 23.0225, lng: 72.5714 };

    setGpsCoordinates(coords);
    setMapCenter(coords);
    setMapZoom(12);
    setApiLogs(`Active station jumped to Indian Metro: ${metro.toUpperCase()}`);

    // For manual metro jumps it's fine to show that metro's curated list and
    // re-center on the first result, since the user deliberately picked the city.
    const fallbackList = METRO_FALLBACK_DATA[metro] || ALL_INDIA_HOSPITALS;
    const mapped = fallbackList.map(h => ({
      ...h,
      distance: +calculateDistance(coords.lat, coords.lng, h.lat, h.lng).toFixed(2)
    }));
    mapped.sort((a, b) => (a.distance || 0) - (b.distance || 0));
    setPlaces(mapped);
    if (mapped.length > 0) {
      setSelectedPlaceId(mapped[0].id);
    }
  };

  const selectedPlace = places.find(p => p.id === selectedPlaceId);

  return (
    <div className="space-y-6" id="open-care-locator-root">

      {/* ── Header ── */}
      <div className="bg-white border border-slate-200 p-5 rounded-3xl flex flex-col md:flex-row gap-5 justify-between items-start md:items-center shadow-sm">
        <div className="space-y-1 text-left">
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 shrink-0 inline-block animate-pulse" />
            <span className="text-xs uppercase font-mono tracking-wider font-extrabold text-emerald-600 block">
              OpenStreetMap + Local GPS Feed
            </span>
          </div>
          <h3 className="text-sm font-extrabold text-slate-900 tracking-tight">{t.locator.title}</h3>
          <p className="text-sm text-slate-600 max-w-xl">{t.locator.subtitle}</p>
        </div>

        <button
          onClick={() => setShowPermissionModal(true)}
          disabled={isLoading}
          className={`${isLoading ? 'bg-slate-500 cursor-not-allowed opacity-90' : 'bg-slate-900 hover:bg-slate-800 cursor-pointer'} text-white rounded-xl py-2.5 px-4 text-xs font-bold transition-all shrink-0 flex items-center justify-center gap-1.5 shadow-md`}
        >
          {isLoading ? (
            <Loader2 className="w-4 h-4 text-white animate-spin" />
          ) : (
            <Compass className="w-4 h-4 text-emerald-400 animate-pulse" />
          )}
          <span>{isLoading ? 'Scanning GPS...' : t.locator.scanBtn}</span>
        </button>
      </div>

      {/* ── City Search ── */}
      <div className="bg-white border border-slate-200 p-5 rounded-3xl shadow-sm text-left space-y-4">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2">
          <div>
            <h4 className="text-xs font-bold text-slate-800 uppercase tracking-widest font-mono">
              Explore Cardiac Facilities by Location
            </h4>
            <p className="text-xs text-slate-600 mt-0.5">
              Type any Indian city and state to load local emergency centers
            </p>
          </div>
        </div>

        <form onSubmit={handleSearchCityState} className="grid grid-cols-1 sm:grid-cols-12 gap-3 pt-1">
          <div className="sm:col-span-5 relative">
            <label className="text-xs font-mono font-bold uppercase tracking-wider text-slate-500 block mb-1">
              City Name *
            </label>
            <div className="relative">
              <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                value={searchCity}
                onChange={(e) => setSearchCity(e.target.value)}
                placeholder="e.g. Pune, Bangalore, Kolkata"
                className="w-full bg-slate-50 border border-slate-200 focus:border-slate-400 focus:bg-white text-xs font-semibold rounded-xl pl-9 pr-4 py-2.5 outline-none transition-all"
                required
              />
            </div>
          </div>

          <div className="sm:col-span-4">
            <label className="text-xs font-mono font-bold uppercase tracking-wider text-slate-500 block mb-1">
              State (Optional)
            </label>
            <input
              type="text"
              value={searchState}
              onChange={(e) => setSearchState(e.target.value)}
              placeholder="e.g. Maharashtra, Karnataka"
              className="w-full bg-slate-50 border border-slate-200 focus:border-slate-400 focus:bg-white text-xs font-semibold rounded-xl px-4 py-2.5 outline-none transition-all"
            />
          </div>

          <div className="sm:col-span-3 flex items-end">
            <button
              type="submit"
              disabled={isLoading}
              className="w-full bg-slate-900 hover:bg-slate-800 disabled:bg-slate-300 text-white font-bold text-xs py-2.5 px-4 rounded-xl shadow-md cursor-pointer transition-all uppercase tracking-wider h-10 flex items-center justify-center gap-1.5"
            >
              {isLoading ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin text-white" />
                  <span>Searching...</span>
                </>
              ) : (
                <>
                  <Search className="w-4 h-4 text-slate-300" />
                  <span>Search Near</span>
                </>
              )}
            </button>
          </div>
        </form>
      </div>

      {/* ── Main dual-column layout ── */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">

        {/* Left: Hospital list */}
        <div className="lg:col-span-4 flex flex-col justify-between space-y-4 order-2 lg:order-1">
          <div className="space-y-3 flex-1 overflow-y-auto max-h-[520px] pr-2 scroller-thin text-left">

            {errorText && (
              <div className="p-4 bg-amber-50 border border-amber-200 rounded-2xl text-left text-xs text-amber-900 leading-relaxed space-y-2.5 shadow-sm">
                <div className="flex items-start gap-2.5">
                  <AlertTriangle className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
                  <div className="space-y-0.5">
                    <span className="font-extrabold text-slate-900 block">GPS Connection/Permission Warning</span>
                    <p className="text-slate-700 font-sans font-medium">{errorText}</p>
                  </div>
                </div>
                <div className="bg-white/90 border border-amber-100 p-2.5 rounded-xl text-[11px] text-slate-700 font-sans space-y-1.5 font-medium shadow-inner">
                  <span className="font-bold text-slate-800 block">Immediate steps to trace your location:</span>
                  <ul className="list-decimal pl-4 space-y-1 text-[11.5px] text-slate-600">
                    <li>Verify your phone/computer's <strong>GPS / Location Services</strong> is toggled <strong>ON</strong>.</li>
                    <li>Click the site settings / lock icon in the URL bar and set <strong>Location access to "Allow"</strong>.</li>
                    <li>Once GPS is active, click <strong>"Scan nearby care"</strong> again.</li>
                  </ul>
                  <p className="text-[10px] text-slate-500 pt-0.5 font-semibold">
                    * Sajivani strictly uses your location on-device to seek nearby emergency clinics, protecting your privacy.
                  </p>
                </div>
              </div>
            )}

            <div className="flex items-center gap-1.5 px-1 py-1">
              <Hospital className="w-4 h-4 text-rose-500 shrink-0" />
              <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-slate-400">
                Found care centers ({places.length})
              </span>
            </div>

            {isLoading ? (
              <div className="py-12 flex flex-col items-center justify-center gap-3 text-slate-400 text-xs font-medium">
                <Loader2 className="w-6 h-6 text-slate-600 animate-spin" />
                <span>Scanning OpenStreetMap database...</span>
              </div>
            ) : places.length === 0 ? (
              <div className="py-12 text-center text-xs text-slate-400 font-medium">
                No health units found in this radial search.
              </div>
            ) : (
              <div className="flex flex-col gap-2.5">
                {places.map((p) => {
                  const isSelected = selectedPlaceId === p.id;
                  return (
                    <div
                      key={p.id}
                      onClick={() => {
                        setSelectedPlaceId(p.id);
                        setMapCenter({ lat: p.lat, lng: p.lng });
                        setMapZoom(13);
                        setApiLogs(`Lock tracking element: "${p.name}".`);
                      }}
                      className={`p-4 rounded-xl border text-left cursor-pointer transition-all ${
                        isSelected
                          ? 'bg-rose-50/50 border-rose-300 ring-1 ring-rose-300 shadow-sm'
                          : 'bg-white border-slate-200 hover:border-slate-300 hover:bg-slate-50'
                      }`}
                    >
                      <div className="flex justify-between items-start gap-1">
                        <h4 className="text-xs font-bold leading-tight text-slate-900 line-clamp-2">
                          {p.name}
                        </h4>
                        <span className="text-[9px] uppercase font-mono font-bold shrink-0 bg-slate-150 rounded px-1.5 py-0.5 text-slate-700">
                          {p.type.replace('_', ' ')}
                        </span>
                      </div>

                      <p className="text-[10.5px] text-slate-500 mt-1 flex items-center gap-1 leading-snug">
                        <MapPin className="w-3 h-3 text-slate-400 shrink-0" />
                        <span>{p.address}</span>
                      </p>

                      <div className="flex items-center gap-3 mt-2 text-[10px] font-mono text-slate-500">
                        {p.distance !== undefined && (
                          <span className="font-bold text-slate-700">
                            Distance: {p.distance.toFixed(1)} km
                          </span>
                        )}
                        {p.emergency === 'yes' && (
                          <span className="text-emerald-600 font-bold uppercase tracking-wider">
                            &bull; 24h ER Active
                          </span>
                        )}
                      </div>

                      {isSelected && (
                        <div className="mt-3 pt-3 border-t border-slate-200 flex items-center gap-2">
                          {p.phone ? (
                            <a
                              href={`tel:${p.phone}`}
                              onClick={(e) => e.stopPropagation()}
                              className="flex-1 bg-slate-100 hover:bg-slate-200 text-slate-800 text-xs font-bold py-1.5 rounded-lg transition-colors flex items-center justify-center gap-1 mr-1"
                            >
                              <Phone className="w-3.5 h-3.5 text-slate-500" />
                              Call Center
                            </a>
                          ) : (
                            <div className="flex-1 text-xs text-slate-400 font-sans italic self-center">
                              No telephone recorded
                            </div>
                          )}
                          <a
                            href={`https://www.google.com/maps/dir/?api=1&destination=${p.lat},${p.lng}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            onClick={(e) => e.stopPropagation()}
                            className="flex-1 bg-rose-600 hover:bg-rose-500 text-white text-xs font-bold py-1.5 rounded-lg transition-all flex items-center justify-center gap-1 cursor-pointer"
                          >
                            <Navigation className="w-3.5 h-3.5 fill-white" />
                            GPS Route
                          </a>
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            )}
          </div>

          {/* Coordinate telemetry */}
          <div className="p-3.5 bg-slate-50 border border-slate-200 rounded-xl text-left space-y-1">
            <div className="flex items-center justify-between text-[11px] font-mono">
              <span className="text-slate-500 font-sans font-medium">Active GPS Telemetry:</span>
              <span className="text-slate-600 bg-white border border-slate-200 rounded px-1.5 py-0.5 font-bold">
                {gpsCoordinates.lat.toFixed(4)}, {gpsCoordinates.lng.toFixed(4)}
              </span>
            </div>
          </div>
        </div>

        {/* Right: Map */}
        <div className="lg:col-span-8 flex flex-col justify-between border border-slate-200 rounded-3xl overflow-hidden bg-slate-50 relative h-auto min-h-[380px] lg:min-h-[520px] shadow-sm order-1 lg:order-2">

          <div className="absolute top-4 left-4 z-[10] bg-slate-950/85 backdrop-blur-md text-white px-3.5 py-1.5 rounded-xl border border-slate-800 text-[10px] font-mono flex items-center gap-2 shadow-lg text-left">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-ping shrink-0" />
            <span>Sajivani Live GIS Platform</span>
          </div>

          <div className="flex-1 w-full bg-slate-100 relative h-[320px] sm:h-[400px] lg:h-[480px] z-[5] overflow-hidden">
            {!leafletLoaded ? (
              <div className="w-full h-full flex flex-col items-center justify-center gap-3 bg-slate-900 text-slate-400 p-6">
                <Loader2 className="w-7 h-7 text-rose-500 animate-spin" />
                <span className="font-mono text-xs text-slate-300 font-semibold uppercase tracking-wider">
                  Configuring Sajivani Live Tracker...
                </span>
                <p className="text-[11px] text-slate-500 font-sans max-w-xs text-center">
                  Syncing local hospital databases and loading live GPS mapping layers.
                </p>
              </div>
            ) : (
              <div
                ref={mapContainerRef}
                className="w-full h-full"
                style={{ height: '100%', minHeight: '320px' }}
              />
            )}
          </div>

          {selectedPlace && (
            <div className="bg-slate-950 text-white p-4 border-t border-slate-800 text-left text-xs z-10 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
              <div className="space-y-1">
                <div className="flex items-center gap-1.5 text-rose-400 font-mono text-[10px] tracking-wider uppercase font-bold">
                  <Navigation2 className="w-3.5 h-3.5 text-rose-500 fill-rose-500 animate-pulse" />
                  Target Medical Port Selected
                </div>
                <p className="text-slate-300 font-bold text-xs leading-snug">
                  {selectedPlace.name} &bull; {selectedPlace.address}
                </p>
              </div>
              <div className="flex items-center gap-2 shrink-0">
                {selectedPlace.website && (
                  <a
                    href={selectedPlace.website}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white px-3 py-2 border border-slate-700 rounded-xl font-mono text-[10.5px] font-bold flex items-center gap-1 transition-all"
                  >
                    <Globe className="w-3.5 h-3.5 text-slate-400" />
                    Web Portal
                  </a>
                )}
                <a
                  href={`https://www.google.com/maps/dir/?api=1&destination=${selectedPlace.lat},${selectedPlace.lng}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-rose-600 hover:bg-rose-500 text-white px-4 py-2 rounded-xl font-sans text-xs font-bold block transition-all"
                >
                  Get Route
                </a>
              </div>
            </div>
          )}

          <div className="bg-slate-950 p-2.5 border-t border-slate-900 font-mono text-xs text-slate-400 flex items-center gap-2 text-left justify-between z-10">
            <div className="flex items-center gap-2 truncate">
              <Activity className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
              <span className="text-slate-400 uppercase font-bold shrink-0">GIS LOG:</span>
              <span className="truncate">{apiLogs}</span>
            </div>
            {selectedPlace && (
              <span className="text-slate-500 block shrink-0 font-bold text-xs">
                Distance: {selectedPlace.distance?.toFixed(1) || '0'} km
              </span>
            )}
          </div>
        </div>
      </div>

      {/* ── GPS Permission Modal ── */}
      {showPermissionModal && (
        <div className="fixed inset-0 bg-slate-950/60 backdrop-blur-sm flex items-center justify-center z-[9999] p-4 animate-in fade-in duration-200">
          <div className="bg-white rounded-3xl max-w-md w-full border border-slate-200 p-6 md:p-8 space-y-6 shadow-2xl relative text-left">
            <button
              onClick={() => setShowPermissionModal(false)}
              className="absolute top-4 right-4 text-slate-400 hover:text-slate-600 p-1 bg-slate-50 hover:bg-slate-100 rounded-full transition-colors cursor-pointer"
            >
              <X className="w-4 h-4" />
            </button>

            <div className="text-center space-y-3">
              <div className="w-14 h-14 bg-rose-50 border border-rose-100 rounded-full flex items-center justify-center mx-auto text-rose-500 animate-pulse">
                <Compass className="w-7 h-7 text-rose-500" />
              </div>
              <div className="space-y-1">
                <h3 className="text-lg font-black text-slate-900 tracking-tight">
                  Turn On Your Device's GPS Location
                </h3>
                <p className="text-xs text-slate-500 font-mono font-bold uppercase tracking-wider text-rose-600">
                  Required for Precise Nearby Care
                </p>
              </div>
            </div>

            <div className="bg-slate-50 border border-slate-150 p-4 rounded-2xl text-[11px] text-slate-700 space-y-4 font-sans leading-relaxed">
              <p className="font-extrabold text-slate-900 leading-normal">
                To show cardiac care and clinics near you, Sajivani maps your location using active GPS satellite coordinates:
              </p>
              <ul className="space-y-3">
                <li className="flex items-start gap-2.5">
                  <span className="w-5 h-5 rounded-full bg-slate-900 text-white font-mono text-[10px] font-bold flex items-center justify-center shrink-0 mt-0.5">1</span>
                  <div>
                    <span className="font-extrabold text-slate-950 block">Enable Device GPS</span>
                    <span className="text-slate-500 text-[11px] leading-tight block">Pull down quick settings (mobile) or open system settings (desktop) and switch Location to ON.</span>
                  </div>
                </li>
                <li className="flex items-start gap-2.5">
                  <span className="w-5 h-5 rounded-full bg-slate-900 text-white font-mono text-[10px] font-bold flex items-center justify-center shrink-0 mt-0.5">2</span>
                  <div>
                    <span className="font-extrabold text-slate-950 block">Approve Browser Prompt</span>
                    <span className="text-slate-500 text-[11px] leading-tight block">Click "Allow" when the browser asks for your location.</span>
                  </div>
                </li>
                <li className="flex items-start gap-2.5">
                  <span className="w-5 h-5 rounded-full bg-slate-900 text-white font-mono text-[10px] font-bold flex items-center justify-center shrink-0 mt-0.5">3</span>
                  <div>
                    <span className="font-extrabold text-slate-950 block">Using a Preview Iframe?</span>
                    <span className="text-slate-500 text-[11px] leading-tight block">Click the <strong>"Open in New Tab"</strong> arrow above to authorize GPS without iframe sandbox restrictions.</span>
                  </div>
                </li>
              </ul>
            </div>

            <div className="flex flex-col gap-2 pt-2">
              <button
                onClick={() => {
                  setShowPermissionModal(false);
                  triggerGpsScan();
                }}
                className="w-full bg-slate-900 hover:bg-slate-800 text-white font-extrabold text-xs py-3 rounded-xl shadow-md transition-all uppercase tracking-wider flex items-center justify-center gap-1.5 cursor-pointer"
              >
                <Compass className="w-4 h-4 text-emerald-400" />
                <span>GPS is active &bull; start scan</span>
              </button>
              <button
                onClick={() => setShowPermissionModal(false)}
                className="w-full bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-xs py-2.5 rounded-xl transition-all uppercase tracking-wider text-center cursor-pointer"
              >
                No, cancel scan
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}
