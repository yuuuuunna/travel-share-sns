import toast from 'react-hot-toast';
import Header from '../components/Filter/Header.jsx';
import Title from '../components/Filter/Title';
import Button from '../components/commons/Button';
import FILTER_CATEGORIES from '../constants/filterCategories.js';

import { IoReloadOutline } from 'react-icons/io5';
import { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

const sortArray = ['최신순', '오래된순', '찜많은순'];
const initialCheckList = ['최신순'];
export default function Filter() {
  const location = useLocation();
  const navigate = useNavigate();

  //  체크된 값을 담을 배열
  const [checkedList, setCheckedList] = useState(initialCheckList);
  const [sort, setSort] = useState('최신순');
  // 태그 상태 추가
  const [tag, setTag] = useState([]);

  useEffect(() => {
    // location.state 객체에서 필요한 값들을 추출
    const sortValue = location.state?.sortValue;
    const tagValue = location.state?.tagValue;

    // tagValue가 문자열인 경우, ','로 분리하여 배열로 변환
    const tags = tagValue ? tagValue.split(',') : [];
    const sort = sortValue ? sortValue : '최신순';

    // sortValue가 있는 경우 배열의 앞에 추가
    const checkedList = [sort, ...tags];

    // setCheckedList 호출
    setCheckedList(checkedList);
    setSort(sort);
    setTag(tags);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // 배열에 값 넣기
  function handleCheckboxChange(value) {
    if (sortArray.includes(value)) {
      setSort(value);
      setCheckedList((prevList) => {
        return [value, ...prevList.filter((item) => !sortArray.includes(item))];
      });
    } else {
      if (checkedList.includes(value)) {
        setCheckedList((prevList) => prevList.filter((item) => item !== value));
        setTag((prevTag) => prevTag.filter((item) => item !== value)); // 태그 상태 업데이트
      } else {
        if (tag.length >= 5) {
          toast('태그는 최대 5개까지 선택할 수 있습니다.', {
            icon: '👏',
          });
          return;
        }
        setCheckedList((prevList) => [...prevList, value]);
        if (!sortArray.includes(value)) {
          setTag((prevTag) => [...prevTag, value]); // 태그 상태 업데이트
        }
      }
    }
  }

  // 필터 초기화
  function filterResetHandler() {
    setCheckedList(initialCheckList);
    setSort('최신순');
    setTag([]);
  }

  function handleSubmit() {
    const searchQuery = location.state.cityValue ? `/?city=${location.state.cityValue}` : '';
    const tagQuery = location.state.cityValue ? '&tag=' + tag.toString() : '/?tag=' + tag.toString();
    const sortQuery = location.state.cityValue ? '&sort=' + sort : '/?sort=' + sort;

    let query = '';

    if (tag.length > 0) {
      query += tagQuery;
    }

    navigate(searchQuery + query + sortQuery);
  }

  return (
    <>
      <Header title={'필터'} />
      <div className="mx-[24px]">
        <section>
          <div className="flex justify-end">
            <button className="flex items-center text-primary" onClick={filterResetHandler}>
              <p className="mr-[2px] text-[12px]">필터 초기화</p>
              <IoReloadOutline size="12" />
            </button>
          </div>
          <section>
            {FILTER_CATEGORIES.map((item, outerIndex) => (
              <div key={outerIndex} className="mb-[20px]">
                <Title title={item.title} className="mb-[32px]" />
                <div className="flex flex-wrap gap-[4px]">
                  {item.contents.map((content, innerIndex) => (
                    <span key={innerIndex}>
                      <input
                        type="checkbox"
                        id={`${item.title}-${innerIndex}`}
                        value={content}
                        className="hidden"
                        onClick={(e) => handleCheckboxChange(e.target.value)}
                      />
                      <label
                        htmlFor={`${item.title}-${innerIndex}`}
                        className={`inline-block bg-opacity-30 text-center rounded-[20px] px-[16px] py-[10px] cursor-pointer text-[14px] ${
                          checkedList && checkedList.includes(content)
                            ? 'bg-primary text-primary font-bold'
                            : 'bg-gray-3 text-gray-3 font-bold'
                        }`}
                      >
                        {content}
                      </label>
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </section>
          <section className="mt-[30px]">
            <Button type={checkedList ? 'primary' : 'gray'} text={'description'} onClick={handleSubmit}>
              필터 적용하기
            </Button>
          </section>
        </section>
      </div>
    </>
  );
}
