import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import PropTypes from 'prop-types';

import { IoSearchOutline } from 'react-icons/io5';

import Header from '../components/Search/Header';
import SearchItem from '../components/Search/SearchItem';
import SearchInput from '../components/commons/SearchInput';
import { TRAVEL_DESTINATION } from '../constants';
import { convertToHangulJamo } from '../utils/convertToHangulJamo';

export default function Search() {
  // 검색 input 키워드
  const [searchKeyword, setSearchKeyword] = useState('');

  // 로컬스토리지에 배열로 담을 변수
  const [keywords, setKeywords] = useState([]);

  const navigate = useNavigate();

  // 렌더링 될때 Local Storage 에서 키워드를 가져와 세팅한다.
  useEffect(() => {
    const result = localStorage.getItem('keywords');
    if (result?.length !== 0) {
      setKeywords(JSON.parse(result));
    }
  }, []);

  // input 입력 핸들러
  function handleChangeInput(e) {
    setSearchKeyword(e.target.value);
  }

  // 검색어를 최근 검색어 목록에 추가(중복 안됨)
  function handleAddKeyword(e) {
    e.preventDefault();

    if (!searchKeyword) return; // 검색어가 없는 경우 추가하지 않음

    // 기존 키워드 목록에서 중복 검사
    const isDuplicate = keywords.includes(searchKeyword);
    let updatedKeywords = [];

    if (!isDuplicate) {
      // 중복되지 않은 경우, 검색어를 추가
      updatedKeywords = [searchKeyword, ...keywords];
    } else {
      // 중복된 경우, 기존 순서를 유지
      updatedKeywords = [...keywords];
    }

    // 최근 검색어가 너무 많을 경우, 오래된 검색어 제거 (예: 최대 10개)
    if (updatedKeywords.length > 5) {
      updatedKeywords = updatedKeywords.slice(0, 5);
    }

    setKeywords(updatedKeywords);
    localStorage.setItem('keywords', JSON.stringify(updatedKeywords));
  }

  // 모든 검색어 삭제
  function handleRemoveAllKeywords() {
    setKeywords([]);
    localStorage.setItem('keywords', JSON.stringify([]));
  }

  // 단일 검색어 삭제
  function handleRemoveKeywords(selectedKeyword) {
    const updatedKeywords = keywords.filter((keyword) => keyword !== selectedKeyword);

    setKeywords(updatedKeywords);
    localStorage.setItem('keywords', JSON.stringify(updatedKeywords));
  }

  // 검색
  function searchHandler() {
    if (searchKeyword) {
      navigate('/?city=' + encodeURIComponent(searchKeyword));
    } else {
      navigate('/');
    }
  }

  return (
    <div className="w-full">
      <Header title={'검색'} />
      <form
        className="w-full h-[74px] flex relative items-center px-[24px]"
        onSubmit={(e) => {
          handleAddKeyword(e);
          searchHandler();
        }}
      >
        <SearchInput onChangeHandler={handleChangeInput} />
        <button className="absolute right-[40px] top-[35%]" type="submit">
          <IoSearchOutline size="22" />
        </button>
      </form>
      <div className="relative">
        <div className="w-full h-[52px] flex justify-between items-center px-[24px]">
          <p className="font-bold text-[14px]">최근 검색어</p>
          <button className="text-[14px] text-gary-1" onClick={handleRemoveAllKeywords}>
            전체삭제
          </button>
        </div>
        {keywords?.map((keyword) => (
          <SearchItem key={keyword} keyword={keyword} onRemove={handleRemoveKeywords} />
        ))}
      </div>
      {keywords?.length === 0 && (
        <p className="text-center text-gray-1 text-[14px] mt-[20px]">최근 검색어 내역이 없습니다.</p>
      )}
      <ul className="w-full px-[24px]">
        {TRAVEL_DESTINATION.filter(
          (destination) =>
            convertToHangulJamo(destination).includes(searchKeyword) || destination.includes(searchKeyword),
        ).map((item) => (
          <li key={item}>
            <DestinationItem name={item} onClick={() => navigate(`/?city=${item}`)} />
          </li>
        ))}
      </ul>
    </div>
  );
}

function DestinationItem({ name, onClick }) {
  return (
    <div className="flex items-center justify-between py-4">
      <strong>{name}</strong>
      <button className="bg-gray-4 text-sm px-3 py-1 rounded-2xl" onClick={onClick}>
        선택
      </button>
    </div>
  );
}

DestinationItem.propTypes = {
  name: PropTypes.string.isRequired,
  onClick: PropTypes.func,
};
