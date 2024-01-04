import { Link } from 'react-router-dom';
import { userState } from '../../recoils/userAtom';
import { useRecoilValue } from 'recoil';
import PropTypes from 'prop-types';
import Notfound from '../Search/NotFound';
import { IoChatbubbleOutline, IoHeartOutline, IoHeartSharp } from 'react-icons/io5';

import Tag from '../commons/Tag';
import ImageSlide from './ImageSlide';
import { useLikeQuery } from '../../pages/main/queries';
import { isValidUser } from '../../utils/isValidUser';
import { useEffect } from 'react';

export default function PostItem({ data }) {
  const user = useRecoilValue(userState);
  // 유저가 좋아요 누른 데이터
  const { likeList, removeLikes, postLikes, refetch } = useLikeQuery();

  useEffect(() => {
    refetch();
  }, [user, refetch]);

  // 좋아요 post
  async function handleClickLike(e, userId, postId) {
    e.stopPropagation();
    e.preventDefault();

    const isLiked = likeList?.myLikePostId.includes(postId);

    if (isLiked) {
      removeLikes([likeList?.myLikePost.find((item) => item.postId._id === postId)._id]);
    } else {
      postLikes({ userId, postId });
    }
  }

  if (data?.length === 0) return <Notfound />;
  return (
    <div>
      {data?.map((item) => (
        <Link to={`/posts/${item._id}`} key={`post-${item._id}`}>
          <div>
            <div className="pb-[20px]">
              <div>
                <div className="relative">
                  <button
                    onClick={(e) => handleClickLike(e, user._id, item._id)}
                    className="absolute z-[10] top-[16px] right-[16px]"
                  >
                    {isValidUser(user) && item.authorId !== user._id && (
                      <>
                        {likeList?.myLikePostId.includes(item._id) ? (
                          <IoHeartSharp size="36" className="text-red" />
                        ) : (
                          <IoHeartOutline size="36" color="#D9D9D9" />
                        )}
                      </>
                    )}
                  </button>
                  <ImageSlide
                    images={item.schedules.flatMap((schedule) => schedule.flatMap((place) => place.placeImageSrc))}
                    myLikes={likeList?.myLikePostId}
                    item={item}
                    handleClickLike={handleClickLike}
                  />
                </div>
              </div>
              <div className="flex justify-between items-center">
                <p>{item.destination}</p>
                <div className="flex items-center">
                  <IoChatbubbleOutline size="16" className="mr-[4px]" />
                  <span className="mr-[10px]">{item.commentCount}</span>
                  <IoHeartOutline size="18" className="mr-[4px]" />
                  <span>{item.likeCount}</span>
                </div>
              </div>
              <p className="text-[22px] font-bold mb-[10px]">{item.title}</p>
              <div>
                <Tag tags={item.tag} />
              </div>
              <span className="text-gray-1 mb-[4px]">
                일정: {new Date(item.startDate).getFullYear()}년 {new Date(item.startDate).getMonth() + 1}월{' '}
                {new Date(item.startDate).getDate()}일 ~ {new Date(item.endDate).getFullYear()}년{' '}
                {new Date(item.endDate).getMonth() + 1}월 {new Date(item.endDate).getDate()}일
              </span>
              <p className="text-gray-1">예산: {item.cost.toLocaleString()}원</p>
            </div>
          </div>
        </Link>
      ))}
    </div>
  );
}

PostItem.propTypes = {
  data: PropTypes.array.isRequired,
  filter: PropTypes.string,
};
