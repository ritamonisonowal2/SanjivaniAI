const handleQueryOverpass = async (targetCoords = gpsCoordinates, isGpsMode = false) => {
  setIsLoading(true);
  setErrorText(null);
  setApiLogs('Connecting to OpenStreetMap hospital database...');

  const lat = targetCoords.lat;
  const lng = targetCoords.lng;
  const radiusMeters = Math.round(searchRadius * 1000);

  // FIXED: URLs se Markdown hooks/brackets hata diye hain
  const OVERPASS_ENDPOINTS = [
    'https://overpass-api.de/api/interpreter',
    'https://maps.mail.ru/osm/tools/overpass/api/interpreter',
    'https://overpass.kumi.systems/api/interpreter'
  ];

  const overpassQuery = `[out:json][timeout:25];
(
  node["amenity"~"hospital|clinic|doctors|health_post|pharmacy"](around:${radiusMeters},${lat},${lng});
  way["amenity"~"hospital|clinic|doctors|health_post|pharmacy"](around:${radiusMeters},${lat},${lng});
  node["healthcare"~"hospital|clinic|doctor|pharmacy"](around:${radiusMeters},${lat},${lng});
  way["healthcare"~"hospital|clinic|doctor|pharmacy"](around:${radiusMeters},${lat},${lng});
);
out center;`;

  let fetchSuccess = false;

  for (const endpoint of OVERPASS_ENDPOINTS) {
    try {
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 20000);

      const response = await fetch(
        `${endpoint}?data=${encodeURIComponent(overpassQuery)}`,
        { signal: controller.signal }
      );
      clearTimeout(timeoutId);

      if (!response.ok) continue;

      const data = await response.json();
      const elements = data.elements || [];

      if (elements.length === 0) {
        setApiLogs('No hospitals found via OSM. Loading Google Maps fallback...');
        showGoogleMapsFallback(targetCoords, isGpsMode);
        setIsLoading(false);
        return;
      }

      const EXCLUDE_KEYWORDS = [
        'eye', 'netra', 'drishti', 'ophthalmology', 'dental', 'dentist',
        'veterinary', 'vet', 'animal', 'skin', 'cosmetic', 'hair',
        'ayurvedic', 'homeopathic', 'optical', 'beauty', 'salon'
      ];

      const formatted: HealthcarePlace[] = elements
        .map((elem: any, idx: number) => {
          const itemLat = elem.lat ?? elem.center?.lat ?? lat;
          const itemLng = elem.lon ?? elem.center?.lon ?? lng;
          const tags = elem.tags || {};
          const dist = calculateDistance(lat, lng, itemLat, itemLng);

          return {
            id: `osm-${elem.id || idx}`,
            name: tags.name || tags.official_name || `Medical Center #${idx + 1}`,
            lat: itemLat,
            lng: itemLng,
            address: tags['addr:street']
              ? `${tags['addr:housenumber'] || ''} ${tags['addr:street']}, ${tags['addr:city'] || ''}`.trim()
              : `${tags['addr:suburb'] || tags['addr:place'] || ''}, ${tags['addr:city'] || 'Nearby'}`.trim().replace(/^,\s*/, ''),
            type: tags.amenity === 'hospital' || tags.healthcare === 'hospital'
              ? 'hospital'
              : tags.amenity === 'clinic' || tags.healthcare === 'clinic'
              ? 'clinic'
              : 'doctors',
            phone: tags.phone || tags['contact:phone'] || tags['emergency:phone'] || undefined,
            website: tags.website || tags['contact:website'] || undefined,
            emergency: tags.emergency || undefined,
            distance: dist,
          };
        })
        .filter((place: HealthcarePlace) => {
          const nameLower = place.name.toLowerCase();
          return !EXCLUDE_KEYWORDS.some(kw => nameLower.includes(kw));
        })
        .sort((a, b) => (a.distance || 0) - (b.distance || 0));

      setPlaces(formatted);
      setApiLogs(`Found ${formatted.length} healthcare facilities nearby.`);

      if (formatted.length > 0) {
        if (isGpsMode) {
          setSelectedPlaceId(null);
          setMapCenter(targetCoords);
        } else {
          setSelectedPlaceId(formatted[0].id);
          setMapCenter({ lat: formatted[0].lat, lng: formatted[0].lng });
        }
      }

      fetchSuccess = true;
      break;

    } catch (err) {
      console.warn(`Endpoint ${endpoint} failed, trying next...`);
      continue;
    }
  }

  if (!fetchSuccess) {
    setApiLogs('All OSM servers unreachable. Showing Google Maps options...');
    showGoogleMapsFallback(targetCoords, isGpsMode);
  }

  setIsLoading(false);
};

const showGoogleMapsFallback = (coords: { lat: number; lng: number }, isGpsMode = false) => {
  const { lat, lng } = coords;

  // FIXED: Google Maps search URLs ko absolute dynamic coordinates map format me convert kiya
  const fallbackPlaces: HealthcarePlace[] = [
    {
      id: 'gmaps-hospital',
      name: '🗺️ All Nearby Hospitals — Google Maps',
      lat,
      lng,
      address: 'Tap to open Google Maps with real hospitals near your location',
      type: 'hospital',
      phone: '112',
      website: `https://www.google.com/maps/search/hospitals/@${lat},${lng},14z`,
      emergency: 'yes',
      distance: 0,
    },
    {
      id: 'gmaps-emergency',
      name: '🚨 Emergency Hospitals Near Me',
      lat,
      lng,
      address: '24/7 Emergency medical & trauma facilities near you',
      type: 'emergency_room',
      phone: '108',
      website: `https://www.google.com/maps/search/emergency+hospitals/@${lat},${lng},14z`,
      emergency: 'yes',
      distance: 0.1,
    },
    {
      id: 'gmaps-cardiac',
      name: '🫀 Cardiac Specialists & Heart Hospitals',
      lat,
      lng,
      address: 'Cardiologists and heart specialty centers near you',
      type: 'hospital',
      phone: '104',
      website: `https://www.google.com/maps/search/cardiac+heart+hospitals/@${lat},${lng},14z`,
      emergency: 'yes',
      distance: 0.2,
    },
    {
      id: 'gmaps-clinic',
      name: '🏥 Clinics & Healthcare Centers',
      lat,
      lng,
      address: 'General clinics and health centers in your area',
      type: 'clinic',
      phone: undefined,
      website: `https://www.google.com/maps/search/clinics/@${lat},${lng},14z`,
      emergency: 'no',
      distance: 0.3,
    },
  ];

  setPlaces(fallbackPlaces);
  setMapCenter(coords);
  setMapZoom(14);
  if (isGpsMode) {
    setSelectedPlaceId(null);
  } else {
    setSelectedPlaceId(fallbackPlaces[0].id);
  }
  setErrorText(
    'Live hospital data unavailable right now. Use the Google Maps links below to find real hospitals near you — they show live, accurate results.'
  );
};
