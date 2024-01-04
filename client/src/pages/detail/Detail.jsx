import { useState, createContext, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import noImage from '../../assets/images/noImage.png';
import { userState } from '../../recoils/userAtom';
import { useRecoilValue } from 'recoil';

import Header from '../../components/Detail/Header';
import DayButton from '../../components/Detail/DayButton';
import ContentItem from '../../components/Detail/ContentItem';
import Button from '../../components/commons/Button';
import CourseMap from '../../components/KakaoMaps/CourseMap';
import Modal from '../../components/CommentModal/Modal';
import useDayCalculation from '../../hooks/useDayCalculation';
import postsAPI from '../../services/posts';
import { useNavigate, useOutletContext } from 'react-router-dom/dist';
import { useMypagePostsQuery } from '../mypage/queries';
import toast from 'react-hot-toast';
import { PATH } from '../../constants/path';

export const ModalContext = createContext();

export default function Detail() {
  const navigate = useNavigate();
  const user = useRecoilValue(userState);
  const { id: postId } = useParams();
  const [data, setData] = useState([]);
  const [dayTitle, setDayTitle] = useState('');
  const [index, setIndex] = useState(0);
  const { setNavbarHidden } = useOutletContext();

  const { removePost } = useMypagePostsQuery();

  // 댓글 모드
  const [commentModalMode, setCommentModalMode] = useState(false);

  // 시작점과 종료점의 Y 좌표를 저장하는 state
  const [mouseDownClientY, setMouseDownClientY] = useState(0);
  const [mouseUpClientY, setMouseUpClientY] = useState(0);

  // 상세페이지 GET API
  useEffect(() => {
    postsAPI
      .getPostById(postId)
      .then((post) => {
        setData(post.data);
      })
      .catch(() => {
        throw new Error('상세 게시글을 불러오는 중에 오류가 생겼습니다.');
      });
  }, [postId]);

  const remove = async () => {
    const result = await removePost(postId);
    if (result?.status === 204) {
      const instance = toast.success('게시글이 삭제되었습니다.');
      setTimeout(() => toast.dismiss(instance.id), 2000);
      navigate(PATH.root);
    }
  };

  const handleRemoveClick = () => {
    toast.custom((t) => (
      <div
        className={`${
          t.visible ? 'animate-enter' : 'animate-leave'
        } max-w-md w-full bg-white shadow-lg rounded-lg pointer-events-auto flex ring-1 ring-black ring-opacity-5`}
      >
        <div className="flex-1 w-0 p-4">정말로 삭제하시겠습니까?</div>
        <div className="flex border-l border-gray-200">
          <button
            onClick={() => toast.dismiss(t.id)}
            className="w-full border border-transparent rounded-none rounded-r-lg p-4 flex items-center justify-center text-sm font-medium text-primary hover:text-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-500"
          >
            취소
          </button>
        </div>
        <div className="flex border-l border-gray-200">
          <button
            onClick={async () => {
              toast.dismiss(t.id);
              remove();
            }}
            className="w-full border border-transparent rounded-none rounded-r-lg p-4 flex items-center justify-center text-sm font-medium text-primary hover:text-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-500"
          >
            확인
          </button>
        </div>
      </div>
    ));
  };

  // 드래그 종료 시 처리
  useEffect(() => {
    const deltaY = mouseUpClientY - mouseDownClientY;
    if (commentModalMode && deltaY > 30) {
      setCommentModalMode(false);
    }
  }, [mouseDownClientY, mouseUpClientY, commentModalMode, setCommentModalMode]);

  // 데스크탑 드래그 종료 시 마우스의 y 좌표 저장 및 처리
  function onMouseUp(e) {
    setMouseUpClientY(e.clientY);
    const deltaY = e.clientY - mouseDownClientY;
    if (commentModalMode && deltaY > 30) {
      setCommentModalMode(false);
    }
  }
  // 데스크탑 드래그 시작 시 마우스의 y 좌표 저장
  function onMouseDown(e) {
    setMouseDownClientY(e.clientY);
  }

  // // 터치 시작 시 처리
  // function onTouchStart(e) {
  //   setStartY(e.touches[0].clientY);
  // }

  // // 터치 종료 시 처리
  // function onTouchEnd(e) {
  //   setEndY(e.changedTouches[0].clientY);
  // }

  // 날짜 계산기 커스텀 훅 사용
  const dayCalculation = useDayCalculation(data.startDate, data.endDate);

  // 작성 날짜 포맷
  const createData = String(data.createdAt).slice(0, 10);

  // 닉네임 가져오기
  function nicknameData() {
    if (data && data.authorId && data.authorId.nickname.length > 0) {
      const nicknameData = data.authorId.nickname;
      return nicknameData;
    }
  }

  // day 버튼 클릭시 day에 맞는 스케줄
  function dayClickedSchedulesData() {
    if (data.schedules && data.schedules.length > 0) {
      const schedulesData = data.schedules;
      return schedulesData[index];
    }
  }

  // day 버튼 클릭시 day에 맞는 거리
  function distancesData() {
    if (data.distances && data.distances.length > 0) {
      const distancesData = data.distances;
      return distancesData;
    }
  }

  useEffect(() => {
    if (commentModalMode) {
      setNavbarHidden(true);
    }

    return () => {
      setNavbarHidden(false);
    };
  }, [commentModalMode, setNavbarHidden]);

  if (!data) return <p>loading...</p>;
  return (
    <ModalContext.Provider value={{ commentModalMode, setCommentModalMode }}>
      <div className="pb-[40px]">
        {commentModalMode && <Modal onMouseDown={onMouseDown} onMouseUp={onMouseUp} user={user} postId={postId} />}
        <div className={commentModalMode ? 'w-full h-screen overflow-hidden' : ''}>
          <Header headerData={data} postId={postId} />
          <div className="w-full h-[160px] mb-[22px]">
            {dayClickedSchedulesData() && !commentModalMode && <CourseMap data={dayClickedSchedulesData()} />}
          </div>
          <div className="overflow-scroll scrollbar-hide">
            {data.startDate && (
              <DayButton
                startDate={data.startDate}
                dayCount={dayCalculation}
                dayTitle={setDayTitle}
                setIndex={setIndex}
              />
            )}
          </div>
          <p className="text-center text-[14px] font-bold mb-[26px]">{dayTitle}</p>
          <div className="mb-[60px]">
            {dayClickedSchedulesData() && (
              <ContentItem
                key={index}
                schedulesData={dayClickedSchedulesData()}
                distancesData={distancesData()}
                distanceIndex={index}
                postId={postId}
              />
            )}
          </div>
          <div className="mx-[24px] mb-[60px]">
            <div className="flex gap-[6px] mb-[16px]">
              <div className="w-[40px] h-[40px] rounded-full border border-gray-4">
                <img
                  src={
                    data?.authorId?.profileImageSrc === 'default' ? noImage : data?.authorId?.profileImageSrc || noImage
                  }
                  alt="profile"
                  className="w-[40px] h-[40px] rounded-full border border-gray-4 object-cover"
                />
              </div>
              <div className="flex flex-col">
                <p className="text-[12px] text-gray-2">{createData}</p>
                <p className="text-[14px] font-bold">{nicknameData()}님의 여행 한마디</p>
              </div>
            </div>
            <div className="w-full bg-input rounded-[4px] text-[14px] p-[8px] break-all">{data.reviewText}</div>
          </div>
          {user?._id === data?.authorId?._id && (
            <div className="w-full flex flex-col gap-[6px] justify-center pb-[60px] px-[24px]">
              <Button type={'default'} text={'description'} onClick={() => navigate(`/schedule/${postId}`)}>
                수정하기
              </Button>
              <Button type={'red'} text={'description'} onClick={handleRemoveClick}>
                삭제하기
              </Button>
            </div>
          )}
        </div>
      </div>
    </ModalContext.Provider>
  );
}
