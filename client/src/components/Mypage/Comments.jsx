import PropTypes from 'prop-types';
import { useRecoilValue } from 'recoil';
import { userState } from '../../recoils/userAtom';
import { useMypageCommentQuery } from '../../pages/mypage/queries';
import Title from './Title';
import { IoChatbubbleSharp } from 'react-icons/io5';
import { Link } from 'react-router-dom';
import defaultProfile from '../../assets/images/defaultProfile.png';

export default function Comments() {
  const { profileImageSrc } = useRecoilValue(userState);
  const { commentList } = useMypageCommentQuery();

  return (
    <>
      <Title
        title="내가 쓴 댓글"
        count={commentList?.totalCount}
        icon={<IoChatbubbleSharp color="#589BF7" size="13" />}
      />

      <div className="border-b border-gray-4 mb-[20px]"></div>

      <div className="flex flex-col gap-[20px]">
        {commentList?.totalCount !== 0 &&
          commentList?.list?.map((item) => (
            <Comment
              key={item._id}
              img={profileImageSrc === 'default' ? defaultProfile : profileImageSrc || defaultProfile}
              title={item?.content}
              postId={item?.postId?._id}
            />
          ))}
      </div>
    </>
  );
}

function Comment({ img, title, postId }) {
  return (
    <Link to={`/posts/${postId}`} className="flex gap-[16px] items-center">
      <img src={img} alt="card-thumbnail" className="w-[60px] h-[60px] rounded-full object-cover" />
      <div className="w-[76%]">
        <div className="flex items-center justify-between">
          <span className="block text-black text-[14px] truncate w-full">{title}</span>
          {/* 쓰레기통 아이콘 */}
          {/* <IoEnterOutline size={20} className="text-gray-1" onClick={() => navigate(`/posts/${postId}`)} /> */}
        </div>
      </div>
    </Link>
  );
}

Comment.propTypes = {
  img: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  postId: PropTypes.string.isRequired,
};
