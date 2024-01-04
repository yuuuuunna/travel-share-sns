import PropTypes from 'prop-types';
import { IoCheckmarkCircle } from 'react-icons/io5';
import { IoHeartSharp } from 'react-icons/io5';
import Title from './Title';
import DeleteAllCheckbox from './DeleteAllCheckbox';
import { useMypageLikesQuery } from '../../pages/mypage/queries';
import useCheckbox from '../../hooks/useCheckbox';
import toast from 'react-hot-toast';
import { convertSimpleDate } from '../../utils/convertSimpleDate';
import noImage from '../../assets/images/noImage.png';

export default function Likes() {
  const { likesList, removeLikes } = useMypageLikesQuery();
  const { list, totalCount } = likesList;
  const { checkedIdsSet, numChecked, handleOnChange, toggleAllCheckedById } = useCheckbox(list);

  const handleRemoveClick = async () => {
    const result = await removeLikes([...checkedIdsSet]);
    if (result.status === 200) {
      toast.success('성공적으로 삭제되었습니다!');
    }
  };

  return (
    <>
      <Title title="내가 찜한 코스" count={totalCount} icon={<IoHeartSharp color="#FB6363" size="13" />} />

      {totalCount !== 0 && (
        <DeleteAllCheckbox
          clickedCount={numChecked}
          totalCount={totalCount}
          title="찜"
          onClick={toggleAllCheckedById}
          handleRemoveClick={handleRemoveClick}
        />
      )}

      <div className="border-b border-gray-4 mb-[20px]"></div>

      <div className="flex flex-col gap-[20px]">
        {totalCount !== 0 &&
          list?.map((item) => {
            const img =
              item?.postId?.schedules[0][0]?.placeImageSrc === 'default'
                ? noImage
                : item?.postId?.schedules[0][0]?.placeImageSrc || noImage;
            const title = item?.postId?.title;
            return (
              <Like
                key={item?._id}
                id={item?._id}
                img={img}
                title={title}
                subTitle={`${convertSimpleDate(item?.postId?.startDate)} ~ ${convertSimpleDate(item?.postId?.endDate)}`}
                checkedIdsSet={checkedIdsSet}
                onClick={() => handleOnChange(item?._id)}
              />
            );
          })}
      </div>
    </>
  );
}

function Like({ id, img, title, subTitle, checkedIdsSet, onClick }) {
  const checked = checkedIdsSet.has(id) ? 'text-primary' : 'text-gray-3';
  return (
    <>
      <div htmlFor="delete-item" className="cursor-pointer flex items-center gap-[8px] w-full" onClick={onClick}>
        <IoCheckmarkCircle className={checked} size={20} />
        <div className="flex gap-[16px] items-center w-full">
          <img src={img} alt="card-thumbnail" className="w-[60px] h-[60px] rounded-full object-cover" />
          <div className="w-full">
            <div className="flex items-center">
              <strong className=" block text-black text-[14px] truncate">{title}</strong>
            </div>
            <span className="text-gray-1 text-[14px] font-medium">{subTitle}</span>
          </div>
          {/* <IoTrashOutline size={16} className="text-gray-1"  /> */}
        </div>
      </div>
    </>
  );
}

Like.propTypes = {
  id: PropTypes.string.isRequired,
  img: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  subTitle: PropTypes.string.isRequired,
  checkedIdsSet: PropTypes.object,
  onClick: PropTypes.func,
  handleRemoveClick: PropTypes.func,
};
