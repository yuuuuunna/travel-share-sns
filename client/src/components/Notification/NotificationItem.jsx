import PropTypes from 'prop-types';
import { IoClose } from 'react-icons/io5';
import NoProfile from '../commons/NoProfile';
import { getTime } from '../../utils/getTime';
import { Link } from 'react-router-dom';
import { useNotificationQuery } from '../../pages/notification/queries';
import useNotification from '../../hooks/useNotification';
export default function NotificationItem({ type, nickname, message, createdAt, url, alarmId, isRead }) {
  const { data, refetch, readAlarm, deleteAlarm } = useNotificationQuery();
  const { setNotificationList } = useNotification;

  // 메시지 타입
  const mapTypeToMessage = {
    comment: '님이 댓글을 남겼습니다.',
    like: '님이 회원님의 코스를 찜하였습니다.',
    chat: '님이 채팅을 남겼습니다.',
  };

  const messageType = mapTypeToMessage[type] || '';

  return (
    <div className="mx-[24px] flex justify-between items-center relative mb-[10px]">
      {!isRead && <div className="w-[6px] h-[6px] rounded-full bg-red absolute top-0 left-0"></div>}
      <div className="w-[47px] h-[47px] border rounded-full flex items-center justify-center">
        <NoProfile width={'44px'} height={'44px'} />
      </div>
      <Link to={`/posts/${url}`} className="flex-1 px-4" onClick={() => readAlarm(alarmId)}>
        <div className="flex">
          <p className="text-[14px]">
            <span className="font-bold">{nickname}</span>
            <span>{messageType}</span>
            <span>{`${message}`}</span>
            <span className="text-gray-2 ml-[4px]">{getTime(createdAt)}</span>
          </p>
        </div>
      </Link>
      <button>
        <IoClose
          size="20"
          className="text-gray-1"
          onClick={async () => {
            const result = await deleteAlarm(alarmId);
            if (result?.status === 204) refetch();
            setNotificationList(data);
          }}
        />
      </button>
    </div>
  );
}

NotificationItem.propTypes = {
  type: PropTypes.string.isRequired,
  nickname: PropTypes.string.isRequired,
  message: PropTypes.string,
  url: PropTypes.string.isRequired,
  createdAt: PropTypes.string.isRequired,
  alarmId: PropTypes.string.isRequired,
  isRead: PropTypes.bool.isRequired,
};
