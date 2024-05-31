import React, { useState, useRef, useEffect } from 'react';
import { Map, MapMarker } from 'react-kakao-maps-sdk';
import PlaceMarkers from '../KakaoMap/PlaceMarkers';

const KakaoMap = ({
  centerMove,
  categoriesStatus,
  handleShowPlaceModal,
  handlePlaceModalClose,
  mapCenter,
  setMapCenter,
}) => {
  const [currentLocation, setCurrentLocation] = useState({
    level: 4,
    center: {
      lat: 37.5465029,
      lng: 127.065263,
    },
  });
  const prevCenterRef = useRef(null);

  /*현재 위치 이동, 중앙 정렬*/
  useEffect(() => {
    if (centerMove) {
      setCurrentLocation((prev) => ({
        ...prev,
        center: { lat: centerMove.lat, lng: centerMove.lng },
      }));
    }
  }, [centerMove]);

  /*현재 위치 갱신 시, 이전 좌표 정보 업데이트*/
  useEffect(() => {
    if (currentLocation.center) {
      prevCenterRef.current = currentLocation.center;
    }
  }, [currentLocation]);

  useEffect(() => {
    if (mapCenter) {
      setMapCenter(mapCenter);
    }
  }, [mapCenter]);

  return (
    <Map
      id="map"
      style={{ height: '100vh' }}
      center={currentLocation.center}
      level={currentLocation.level || 4}
      isPanto={true}
    >
      <PlaceMarkers
        categoriesStatus={categoriesStatus}
        mapCenter={mapCenter}
        handleShowPlaceModal={handleShowPlaceModal}
        handlePlaceModalClose={handlePlaceModalClose}
        setMapCenter={setMapCenter}
      />
      <MapMarker
        position={currentLocation.center}
        title="Current Location"
        clickable={false}
      />
    </Map>
  );
};

export default KakaoMap;
