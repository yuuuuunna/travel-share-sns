import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

import PropTypes from 'prop-types';

import LocationMap from '../components/KakaoMaps/LocationMap';
import Header from '../components/Login/Header';

export default function Map() {
  const { id } = useParams();
  const [state, setState] = useState([]);

  // 로컬스토리지에 저장된 싱글스케줄 id와 일치한 데이터를 가져옴
  useEffect(() => {
    const data = localStorage.getItem(`detail-data-${id}`);
    if (data) {
      setState(JSON.parse(data));
    }
  }, [id]);

  return (
    <div className="w-screen h-screen ">
      <div className="absolute z-20">
        <Header place={state.placeName} category={state.category} />
      </div>
      <LocationMap state={state} />
    </div>
  );
}

LocationMap.propTypes = {
  state: PropTypes.any,
};
