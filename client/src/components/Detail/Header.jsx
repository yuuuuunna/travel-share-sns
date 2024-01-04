import PropTypes from 'prop-types';

import IconButton from './IconButton';
import Tag from '../commons/Tag';
import useDayCalculation from '../../hooks/useDayCalculation';

import { IoLockClosed } from 'react-icons/io5';
// import { IoCreateOutline } from "react-icons/io5";

// 헤더 아이콘 버튼 타입
const buttonType = true;

//태그 화이트 모드
const whiteMode = true;

// 헤더 아이콘
const headerIcon = ['share', 'comment', 'heart'];

export default function Header({ headerData, postId }) {
  // 날짜 계산기 커스텀 훅 사용
  const dayCalculation = Math.floor(useDayCalculation(headerData.startDate, headerData.endDate));

  // 비용 포맷
  const costFormat = (+headerData.cost).toLocaleString();

  // O박 O일 날짜 포맷
  const dateFormat = dayCalculation + '박 ' + (dayCalculation + 1) + '일';

  // 정보 아이콘
  const infoData = [
    ['people', headerData.peopleCount + '명'],
    ['wallet', costFormat + '원'],
    ['calendar', dateFormat],
    ['destination', headerData.destination],
  ];

  // 시작 날짜
  const startDate = {
    year: new Date(headerData.startDate).getFullYear(),
    month: new Date(headerData.startDate).getMonth(),
    date: new Date(headerData.startDate).getDate(),
  };

  // 끝 날짜
  const endDate = {
    year: new Date(headerData.endDate).getFullYear(),
    month: new Date(headerData.endDate).getMonth(),
    date: new Date(headerData.endDate).getDate(),
  };

  // 여행 기간
  const period =
    startDate.year +
    '.' +
    startDate.month +
    '.' +
    startDate.date +
    ' ~ ' +
    endDate.year +
    '.' +
    endDate.month +
    '.' +
    endDate.date;

  if (!headerData) return <p>loading...</p>;
  return (
    <div className={`w-full pb-[20px] bg-primary`}>
      <div className="flex justify-between items-center h-[70px] mx-[24px]">
        <IconButton iconName={'prev'} buttonType={buttonType} />
        <div className="flex gap-[16px] space-x-[6px]">
          {headerIcon.map((icon) => (
            <IconButton
              iconName={icon}
              buttonType={buttonType}
              key={icon}
              postId={postId}
              authorId={headerData.authorId?._id}
            />
          ))}
        </div>
      </div>
      <div className="mx-[24px] text-white">
        <p className="text-[14px]">{period}</p>
        <div className="flex justify-between mb-[6px] items-center">
          <div>
            <p className="text-[22px] font-bold">{headerData.title}</p>
          </div>
          {!headerData?.isPublic && <IoLockClosed className="text-secondary" size="18" />}
        </div>
        <div className="pt-[14px]">
          {headerData && headerData.tag && <Tag tags={headerData.tag} whiteMode={whiteMode} />}
        </div>
        <div className="flex justify-between mt-[14px]">
          {infoData.map((info) => (
            <div
              className="flex flex-col items-center gap-[6px] drop-shadow-[0_2px_0px_rgba(0,0,0,0.25)]"
              key={info[0]}
            >
              <div className="w-[38px] h-[38px] bg-white rounded-full flex items-center justify-center">
                <IconButton iconName={info[0]} />
              </div>
              <p className="text-[12px]">{info[1]}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

Header.propTypes = {
  headerData: PropTypes.any.isRequired,
  postId: PropTypes.string,
};
