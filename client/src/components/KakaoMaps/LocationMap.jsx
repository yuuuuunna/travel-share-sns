import { useState, useEffect } from 'react';
import { Map, MapMarker, CustomOverlayMap } from 'react-kakao-maps-sdk';

import PropTypes from 'prop-types';

export default function LocationMap({ state }) {
  const [placeLat, setPlaceLat] = useState('');
  const [placeLng, setPlaceLng] = useState([]);

  useEffect(() => {
    if (state && state.placePosition) {
      setPlaceLat(state.placePosition[0]);
      setPlaceLng(state.placePosition[1]);
    }
  }, [state]);

  return (
    <>
      <Map
        center={{
          lat: placeLat,
          lng: placeLng,
        }}
        className="w-full h-full"
        level={4}
      >
        <MapMarker
          position={{ lat: placeLat, lng: placeLng }}
          image={{
            src: 'https://ifh.cc/g/vGy0l6.png',
            size: {
              width: 45,
              height: 53,
            },
            options: {
              offset: {
                x: 27,
                y: 69,
              },
            },
          }}
        />
        <CustomOverlayMap position={{ lat: placeLat, lng: placeLng }} yAnchor={1} className="relative">
          <div>
            <a
              // eslint-disable-next-line react/prop-types
              href={`https://map.kakao.com/link/map/${state.placeName},${placeLat},${placeLng}`}
              target="_blank"
              rel="noreferrer"
            >
              <div className="w-[45px] h-[53px] flex justify-center items-center ml-[-9px] mt-[-75px] ">
                <span className="text-[10px] text-white"></span>
              </div>
            </a>
          </div>
        </CustomOverlayMap>
      </Map>
    </>
  );
}

LocationMap.propTypes = {
  state: PropTypes.shape({
    placePosition: PropTypes.arrayOf(PropTypes.number),
  }),
};
