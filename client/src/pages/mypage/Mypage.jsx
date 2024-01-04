import { useState } from 'react';

import { HEADER_HEIGHT, NAVBAR_HEIGHT } from '../../constants';
import Posts from '../../components/Mypage/Posts';
import Comments from '../../components/Mypage/Comments';
import Bookmarks from '../../components/Mypage/Bookmarks';
import Likes from '../../components/Mypage/Likes';
import Profile from '../../components/Mypage/Profile';
import { IoLogOutOutline, IoSettingsOutline } from 'react-icons/io5';
import { useRecoilValue } from 'recoil';
import { userState } from '../../recoils/userAtom';
import { useMutation } from 'react-query';
import authAPI from '../../services/auth';
import { useResetAuth } from '../../hooks/useResetAuth';
import defaultProfile from '../../assets/images/defaultProfile.png';

const TABS = [
  {
    name: '내 여행',
    element: <Posts />,
  },
  {
    name: '내 댓글',
    element: <Comments />,
  },
  {
    name: '내 장소',
    element: <Bookmarks />,
  },
  {
    name: '내 찜 목록',
    element: <Likes />,
  },
];

export default function Mypage() {
  const [editProfileMode, setEditProfileMode] = useState(false);
  const [currentTab, setCurrentTab] = useState(0);
  const user = useRecoilValue(userState);

  const { mutate: logout } = useMutation(authAPI.logout, {
    onSuccess: useResetAuth(),
  });

  const handleTabClick = (index) => {
    setCurrentTab(index);
  };

  if (editProfileMode) return <Profile setEditProfileMode={setEditProfileMode} />;
  return (
    <>
      <section className="top-0">
        <div className="h-header px-[23px] flex items-center justify-between text-[14px] text-black">
          <div className="flex gap-[1px] items-center cursor-pointer" onClick={logout}>
            <button>로그아웃</button>
            <IoLogOutOutline size={17} className="ml-1" />
          </div>
          <div
            className="flex gap-[1px] items-center cursor-pointer"
            onClick={() => setEditProfileMode((prev) => !prev)}
          >
            <button>설정</button>
            <IoSettingsOutline size={17} className="ml-1" />
          </div>
        </div>
        <div className="flex flex-col items-center justify-center h-[140px] ">
          <img
            src={user?.profileImageSrc === 'default' ? defaultProfile : user?.profileImageSrc || defaultProfile}
            alt="profile"
            className="w-[60px] h-[60px] rounded-full object-cover mb-[10px]"
          />

          <span className="text-black text-[20px] font-bold tracking-tight">{user?.nickname}</span>
        </div>
      </section>
      <section>
        <nav className="list-none flex items-center">
          {TABS.map((tab, index) => (
            <li
              key={tab.name}
              className={
                'border-b flex-1 text-center text-[12px] font-bold pb-[16px] cursor-pointer ' +
                (currentTab === index ? 'border-primary border-b-4 text-black' : ' text-gray-3')
              }
              onClick={() => handleTabClick(index)}
            >
              {tab.name}
            </li>
          ))}
        </nav>
        <section className="overflow-y-auto p-[24px]" style={{ height: claculatedHeight }}>
          {TABS[currentTab].element}
        </section>
      </section>
    </>
  );
}

const claculatedHeight = `calc(100vh - ${HEADER_HEIGHT}px - 140px - 38px - ${NAVBAR_HEIGHT}px)`;
