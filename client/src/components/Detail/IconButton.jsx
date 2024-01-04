import PropTypes from 'prop-types';

import { useNavigate } from 'react-router-dom';
import { useState, useContext } from 'react';
import { ModalContext } from '../../pages/detail/Detail';

import toast from 'react-hot-toast';

import {
  IoChevronBack,
  IoShareOutline,
  IoChatbubbleOutline,
  IoHeartOutline,
  IoHeartSharp,
  IoCreateOutline,
  IoWalletOutline,
  IoCalendarClearOutline,
  IoLocationOutline,
  IoPeopleOutline,
} from 'react-icons/io5';
import { useLikeQuery } from '../../pages/main/queries';
import { useRecoilValue } from 'recoil';
import { userState } from '../../recoils/userAtom';
import { isValidUser } from '../../utils/isValidUser';

const share = () => {
  const href = document.location.href;
  navigator.clipboard.writeText(href).then(() => toast.success('링크가 복사되었습니다.'));
};

export default function IconButton({ iconName, buttonType, postId, authorId }) {
  const { setCommentModalMode } = useContext(ModalContext);
  const { likeList, removeLikes, postLikes } = useLikeQuery();
  const user = useRecoilValue(userState);

  function iconSelect(name) {
    switch (name) {
      case 'prev':
        return <IoChevronBack size="25" />;
      case 'heart': {
        if (isValidUser(user) && authorId !== undefined && authorId !== user._id) {
          if (isHeartClicked) {
            return <IoHeartSharp size="25" className="text-red" />;
          } else {
            return <IoHeartOutline size="25" />;
          }
        }
        return;
      }
      case 'comment':
        return <IoChatbubbleOutline size="22" />;
      case 'share':
        return <IoShareOutline size="24" onClick={share} />;
      case 'edit':
        return <IoCreateOutline size="24" />;
      case 'wallet':
        return <IoWalletOutline size="24" className="text-gray-1" />;
      case 'calendar':
        return <IoCalendarClearOutline size="22" className="text-gray-1" />;
      case 'destination':
        return <IoLocationOutline size="24" className="text-gray-1" />;
      case 'people':
        return <IoPeopleOutline size="24" className="text-gray-1" />;
      default:
        return null;
    }
  }

  const [isHeartClicked, setIsHeartClicked] = useState(likeList?.myLikePostId.includes(postId));

  const selectedIcon = iconSelect(iconName, isHeartClicked);

  const navigate = useNavigate();

  function onClickHandler() {
    switch (iconName) {
      case 'prev':
        navigate(-1);
        break;
      case 'comment':
        setCommentModalMode(true);
        break;
      case 'heart':
        if (isHeartClicked) {
          removeLikes([likeList?.myLikePost.find((item) => item.postId._id === postId)._id]);
        } else {
          postLikes({ userId: user._id, postId });
        }
        setIsHeartClicked((prev) => !prev);
        break;
      default:
        break;
    }
  }

  return (
    <div>
      {buttonType ? (
        <button className=" flex justify-center items-center text-white" onClick={onClickHandler}>
          {selectedIcon}
        </button>
      ) : (
        <div className="text-black">{selectedIcon}</div>
      )}
    </div>
  );
}

IconButton.propTypes = {
  iconName: PropTypes.string.isRequired,
  buttonType: PropTypes.bool,
  postId: PropTypes.string,
  authorId: PropTypes.string,
};
