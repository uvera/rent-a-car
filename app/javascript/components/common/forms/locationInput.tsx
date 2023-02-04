import React, { useEffect, useState } from "react";
import mapboxgl from "mapbox-gl";
import ReactMapGl, { Marker, MarkerDragEvent, useControl } from "react-map-gl";
import MapboxGeocoder from "@mapbox/mapbox-gl-geocoder";

// mapboxgl.accessToken =
//     "";

const Geocoder = () => {
  useControl(
    () =>
      new MapboxGeocoder({
        accessToken: mapboxgl.accessToken,
        mapboxgl: mapboxgl,
      })
  );
  return null;
};
type LocationInputProps = {
  name: string;
  name_lat: string;
  name_lng: string;
  access_token?: string;
  lat_value?: number;
  lng_value?: number;
};

const LocationInput = ({
  name,
  name_lng: nameLng,
  name_lat: nameLat,
  access_token: accessToken,
  lat_value: latValue,
  lng_value: lngValue,
}: LocationInputProps) => {
  const [lng, setLng] = useState(() => lngValue ?? 18.5315);
  const [lat, setLat] = useState(() => latValue ?? 42.4572);

  const [markerLng, setMarkerLng] = useState(() => lng);
  const [markerLat, setMarkerLat] = useState(() => lat);

  const onDragEnd = (e: MarkerDragEvent) => {
    setMarkerLat(e.lngLat.lat);
    setMarkerLng(e.lngLat.lng);
  };

  useEffect(() => {
    mapboxgl.accessToken = accessToken;
  });

  return (
    <div className="h-[36rem] w-full p-4 m-auto">
      <input type="hidden" name={`${name}[${nameLat}]`} value={markerLat} />
      <input type="hidden" name={`${name}[${nameLng}]`} value={markerLng} />
      <ReactMapGl
        mapboxAccessToken={accessToken}
        initialViewState={{
          longitude: lng,
          latitude: lat,
          zoom: 9,
        }}
        projection={"globe"}
        onDrag={(e) => {
          setLat(e.viewState.latitude);
          setLng(e.viewState.longitude);
        }}
        mapStyle="mapbox://styles/mapbox/satellite-streets-v11"
        attributionControl={false}
      >
        <Marker
          latitude={markerLat}
          longitude={markerLng}
          draggable={true}
          onDragEnd={(e) => onDragEnd(e)}
        />
        <Geocoder />
      </ReactMapGl>
    </div>
  );
};

export default LocationInput;
