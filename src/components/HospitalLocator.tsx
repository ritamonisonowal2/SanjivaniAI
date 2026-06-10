const showGoogleMapsFallback = (coords: { lat: number; lng: number }, isGpsMode = false) => {
  const { lat, lng } = coords;

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
      website: `https://www.google.com/maps/search/cardiac+hospitals/@${lat},${lng},14z`,
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
