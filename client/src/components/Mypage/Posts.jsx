import PropTypes from 'prop-types';
import { IoAdd } from 'react-icons/io5';
import { IoEllipsisHorizontalSharp, IoLockClosedOutline } from 'react-icons/io5';
import { Link } from 'react-router-dom';
import Title from './Title';
import { useMypagePostsQuery } from '../../pages/mypage/queries';
import { convertSimpleDate } from '../../utils/convertSimpleDate';
import noImage from '../../assets/images/noImage.png';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom/dist';
import toast from 'react-hot-toast';

export default function Posts() {
  const { postsList } = useMypagePostsQuery();

  return (
    <>
      <Link
        to="/schedule"
        className="bg-input py-[13px] px-[16px] rounded-[4px] flex gap-[10px] items-center mb-[24px] cursor-pointer"
      >
        <button className="w-[36px] h-[36px] bg-primary rounded-full flex items-center justify-center">
          <IoAdd className="text-white" size={23} />
        </button>
        <div className="w-[80%]">
          <strong className="font-bold text-[12px]">여행 일정 만들기</strong>
          <span className="block text-gray-1 text-[10px]">새로운 여행을 떠나보세요.</span>
        </div>
      </Link>

      <Title title={'지난 여행'} count={postsList?.totalCount} />

      <div className="flex flex-col gap-[20px]">
        {postsList?.list !== 0 &&
          postsList?.list?.map((item) => (
            <Post
              key={item._id}
              id={item?._id}
              img={
                item?.schedules[0][0]?.placeImageSrc === 'default'
                  ? noImage
                  : item?.schedules[0][0]?.placeImageSrc || noImage
              }
              title={item?.title}
              date={`${convertSimpleDate(item?.startDate)} ~ ${convertSimpleDate(item?.endDate)}`}
              isPublic={item?.isPublic}
            />
          ))}
      </div>
    </>
  );
}

function Post({ id, img, title, date, isPublic }) {
  const navigate = useNavigate();
  const [modalOpen, setModalOpen] = useState(false);
  const { removePost } = useMypagePostsQuery();

  const handleEditClick = () => {
    navigate(`/schedule/${id}`);
  };

  const modalToggle = () => {
    setModalOpen((prev) => !prev);
  };

  const remove = async () => {
    const result = await removePost(id);
    if (result?.status === 204) {
      const instance = toast.success('게시글이 삭제되었습니다.');
      setTimeout(() => toast.dismiss(instance.id), 2000);
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

  return (
    <div className="flex gap-[16px] items-center w-full">
      <Link to={`/posts/${id}`} className="flex gap-[16px] items-center w-full">
        <div className="border rounded-full inline-block">
          <img
            src={img}
            alt="card-thumbnail"
            className="w-[60px] h-[60px] rounded-full object-cover border border-black"
          />
        </div>
        <div className="w-[65%]">
          <div className="flex items-center gap-1">
            <strong className=" block text-black text-[14px] truncate">{title}</strong>
            {!isPublic && <IoLockClosedOutline size={12} />}
          </div>
          <span className="text-gray-1 text-[14px] font-medium">{date}</span>
        </div>
      </Link>
      <div className="relative">
        <IoEllipsisHorizontalSharp size={25} onClick={modalToggle} className="cursor-pointer" />
        {modalOpen && (
          <Modal handleEditClick={handleEditClick} handleRemoveClick={handleRemoveClick} modalToggle={modalToggle} />
        )}
      </div>
    </div>
  );
}

function Modal({ handleEditClick, handleRemoveClick }) {
  return (
    <>
      <div className="absolute w-[40px] h-[56px] rounded-[4px] text-[12px] drop-shadow-[0_2px_2px_rgba(0,0,0,0.25)] bg-white left-[-4px] bottom-[-56px]">
        <button className="hover:bg-gray-200 w-full h-[50%]" onClick={handleEditClick}>
          수정
        </button>
        <button className="hover:bg-gray-200 w-full h-[50%]" onClick={handleRemoveClick}>
          삭제
        </button>
      </div>
    </>
  );
}

Post.propTypes = {
  img: PropTypes.string.isRequired,
  id: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  date: PropTypes.string.isRequired,
  isPublic: PropTypes.bool.isRequired,
  onClick: PropTypes.func,
};
Modal.propTypes = {
  handleRemoveClick: PropTypes.func,
  handleEditClick: PropTypes.func,
};
