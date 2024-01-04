import { useState, useEffect, useMemo } from 'react';
import { Map, MapMarker, Polyline, CustomOverlayMap } from 'react-kakao-maps-sdk';
import PropTypes from 'prop-types';

export default function CourseMap({ data }) {
  const [placeData, setPlaceData] = useState([]);

  useEffect(() => {
    if (data) {
      setPlaceData(data.map((item) => item.placePosition));
    }
  }, [data]);

  const paths = useMemo(() => placeData.map((place) => ({ lat: place[0], lng: place[1] })), [placeData]);

  // 지도 중심좌표
  const centerMap = placeData[0];

  // 지도 중심좌표 위도, 경도
  const centerLat = centerMap ? centerMap[0] : 0;
  const centerLng = centerMap ? centerMap[1] : 0;

  return (
    <>
      <Map
        id={`map`}
        center={{
          lat: centerLat,
          lng: centerLng,
        }}
        className="w-full h-full"
        level={10}
      >
        <Polyline path={paths} strokeWeight={5} strokeColor={'#FB6363'} strokeOpacity={1} strokeStyle={'dashed'} />

        {placeData?.map((place, index) => (
          <div key={`place[0]-place[1]-${index}`}>
            <MapMarker
              position={{ lat: place[0], lng: place[1] }}
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
            <CustomOverlayMap
              key={`place[0]-place[1]-${index}`}
              position={{ lat: place[0], lng: place[1] }}
              yAnchor={1}
              className="relative"
            >
              <div>
                <div className="w-[45px] h-[53px] flex justify-center items-center ml-[-9px] mt-[-75px]">
                  <span className="text-[20px] text-white">{index + 1}</span>
                </div>
              </div>
            </CustomOverlayMap>
          </div>
        ))}
      </Map>
    </>
  );
}

CourseMap.propTypes = {
  data: PropTypes.any,
};
