import PropTypes from 'prop-types';
import { IoCheckmarkCircle, IoBookmark } from 'react-icons/io5';
import Title from './Title';
import DeleteAllCheckbox from './DeleteAllCheckbox';
import { useMypageBookmarksQuery } from '../../pages/mypage/queries';
import useCheckbox from '../../hooks/useCheckbox';
import toast from 'react-hot-toast';
import noImage from '../../assets/images/noImage.png';

export default function Bookmarks() {
  const { bookmarksList, removeBookmarks } = useMypageBookmarksQuery();
  const { list, totalCount } = bookmarksList;
  const { checkedIdsSet, numChecked, handleOnChange, toggleAllCheckedById } = useCheckbox(list);

  const handleRemoveClick = async () => {
    const result = await removeBookmarks([...checkedIdsSet]);
    if (result.status === 200) {
      toast.success('성공적으로 삭제되었습니다!');
    }
  };

  return (
    <>
      <Title title="내가 저장한 장소" count={totalCount} icon={<IoBookmark color="#FFDB5F" size="13" />} />

      {totalCount !== 0 && (
        <DeleteAllCheckbox
          clickedCount={numChecked}
          totalCount={totalCount}
          title="장소"
          onClick={toggleAllCheckedById}
          handleRemoveClick={handleRemoveClick}
        />
      )}

      <div className="border-b border-gray-4 mb-[20px]"></div>

      <div className="flex flex-col gap-[20px]">
        {totalCount !== 0 &&
          list?.map((item) => (
            <Bookmark
              key={item.bookmarkId}
              id={item.bookmarkId}
              img={
                item?.matchingSchedule?.placeImageSrc === 'default'
                  ? noImage
                  : item?.matchingSchedule?.placeImageSrc || noImage
              }
              title={item?.matchingSchedule?.placeName}
              subTitle={item?.matchingSchedule?.category}
              checkedIdsSet={checkedIdsSet}
              onClick={() => handleOnChange(item?.bookmarkId)}
            />
          ))}
      </div>
    </>
  );
}

function Bookmark({ id, img, title, subTitle, checkedIdsSet, onClick }) {
  const checked = checkedIdsSet.has(id) ? 'text-primary' : 'text-gray-3';
  return (
    <>
      <div className="cursor-pointer flex items-center gap-[8px] w-full" onClick={onClick}>
        <IoCheckmarkCircle className={checked} size={20} />
        <div className="flex gap-[16px] items-center w-full">
          <img src={img} alt="card-thumbnail" className="w-[60px] h-[60px] rounded-full object-cover" />
          <div className="w-full">
            <div className="flex items-center">
              <strong className=" block text-black text-[14px] truncate">{title}</strong>
            </div>
            <span className="text-darkgray text-[14px] font-medium">{subTitle}</span>
          </div>
          {/* <IoTrashOutline size={16} className="text-gray-1" onClick={() => handleRemoveClick(id)} /> */}
        </div>
      </div>
    </>
  );
}

Bookmark.propTypes = {
  id: PropTypes.string.isRequired,
  img: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  subTitle: PropTypes.string.isRequired,
  checkedIdsSet: PropTypes.object,
  onClick: PropTypes.func,
};
