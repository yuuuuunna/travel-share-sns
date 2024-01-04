import PropTypes from 'prop-types';
import { IoChevronBack } from 'react-icons/io5';
import Button from '../commons/Button';
import { useOutletContext } from 'react-router';
import { useEffect, useLayoutEffect, useRef, useState } from 'react';
import { userState } from '../../recoils/userAtom';
import { useRecoilValue } from 'recoil';
import defaultProfile from '../../assets/images/defaultProfile.png';

import userAPI from '../../services/user';
import authAPI from '../../services/auth';
import useModal from '../../hooks/useModal';

import { useMutation } from 'react-query';
import { useWithdraw } from '../../hooks/useResetAuth';

export default function Profile({ setEditProfileMode }) {
  const { setNavbarHidden } = useOutletContext();
  const { email, nickname, profileImageSrc } = useRecoilValue(userState);

  const [profileImg, setProfileImg] = useState('');
  const imgRef = useRef(null);
  const nicknameRef = useRef(null);

  const { openModal } = useModal();
  const [newNickname, setNewNickname] = useState('');

  useLayoutEffect(() => {
    setNavbarHidden(true);

    return () => {
      setNavbarHidden(false);
    };
  }, [setNavbarHidden]);

  useEffect(() => {
    if (nickname || profileImageSrc) {
      setProfileImg(profileImageSrc);
      setNewNickname(nickname);
    }
  }, [nickname, profileImageSrc]);

  const handleChangeImage = async (e) => {
    if (!e.target.files) {
      return;
    }
    const fileInput = e.target.files[0];
    const url = URL.createObjectURL(fileInput);
    setProfileImg(url);
  };

  //닉네임 중복 체크
  const handleCheckNickname = async () => {
    await userAPI
      .checkNickname({ nickname: newNickname })
      .then(() => {
        openModal({ message: `사용할 수 있는 닉네임입니다.` });
      })
      .catch((error) => {
        switch (error?.status) {
          case 409: {
            openModal({ message: `이미 사용중인 닉네임 입니다.` });
            break;
          }
          default: {
            openModal({ message: `닉네임 중복 확인 중 오류가 발생했습니다.` });
            break;
          }
        }
      });
  };

  // 회원 정보 수정
  const handleInfoModify = async () => {
    const formData = new FormData();
    formData.append('nickname', newNickname);
    formData.append('profile', imgRef.current.files[0]);
    await userAPI
      .userInfoModify(formData)
      .then(() => {
        if (nickname === newNickname || profileImg == profileImageSrc) {
          openModal({ message: `수정된 정보가 없습니다.` });
        }
        if (nickname !== newNickname || profileImg !== profileImageSrc) {
          openModal({
            message: `회원 정보가 수정되었습니다.`,
            callback: () => {
              setEditProfileMode((prev) => !prev);
              window.location.reload();
            },
          });
        }
      })
      .catch((error) => {
        switch (error.response?.status) {
          case 400: {
            openModal({ message: `정보 수정을 실패하였습니다.` });
            break;
          }
        }
      });
  };

  // 회원 탈퇴
  const { mutate: withdraw } = useMutation(authAPI.withdraw, {
    onSuccess: useWithdraw(),
  });

  // const handleWithdraw = async () => {
  //   const userString = localStorage.getItem('user');
  //   const user = JSON.parse(userString);
  //   const userId = user.info._id;
  //   const provider = user.info.provider;

  //   if (provider === 'kakao') {
  //     await authAPI
  //       .kakaoUnlink()
  //       .then(() => {
  //         openModal({ message: `탈퇴되었습니다.` });
  //         navigate('/');
  //       })
  //       .catch((error) => {
  //         switch (error.response?.status) {
  //           case 400: {
  //             openModal({ message: `탈퇴를 실패하였습니다.` });
  //             break;
  //           }
  //         }
  //       });
  //   } else {
  //     await authAPI
  //       .withdraw({ _id: userId })
  //       .then(() => {
  //         openModal({ message: `탈퇴되었습니다.` });
  //         navigate('/');
  //       })
  //       .catch((error) => {
  //         switch (error.response?.status) {
  //           case 400: {
  //             openModal({ message: `탈퇴를 실패하였습니다.` });
  //             break;
  //           }
  //         }
  //       });
  //   }
  // };

  return (
    <div className="flex flex-col pb-[20px] h-screen items-center">
      <section className="w-full top-0 border-gray-4 border-b-[1px]">
        <header className="w-full h-header bg-white text-center flex items-center">
          <IoChevronBack
            size={32}
            className="pl-2 cursor-pointer"
            onClick={() => setEditProfileMode((prev) => !prev)}
          />
        </header>
        <div className="flex flex-col items-center justify-center h-[140px]">
          <input type="file" name="profile" id="profile" className="hidden" ref={imgRef} onChange={handleChangeImage} />
          <img
            src={profileImg === 'default' ? defaultProfile : profileImg || defaultProfile}
            alt="profile"
            className="w-[60px] h-[60px] rounded-full object-cover mb-[10px] cursor-pointer"
            onClick={() => imgRef.current.click()}
          />
          <label htmlFor="profile" className="text-primary text-[14px] font-medium tracking-tight cursor-pointer">
            사진 수정
          </label>
        </div>
      </section>

      <div className="px-[23px] mt-[50px] flex flex-col gap-[16px]">
        <label htmlFor="email" className="text-[14px] font-bold flex items-center w-full justify-between">
          <span className="w-[100px]">이메일</span>
          <div className=" flex flex-1">
            <input
              value={email}
              type="email"
              name="email"
              id="email"
              className="w-full border-b border-gray-4 focus:outline-none p-[5px] text-[14px] font-medium disabled:bg-white"
              disabled
            />
          </div>
        </label>
        <label htmlFor="nickname" className="text-[14px] font-bold flex items-center w-full justify-between">
          <span className="w-[100px]">이름</span>
          <div className="flex">
            <input
              type="nickname"
              name="nickname"
              id="nickname"
              className="w-full mr-5 border-b border-gray-4 focus:outline-none p-[5px] text-[14px] font-medium"
              ref={nicknameRef}
              value={newNickname}
              onChange={(e) => setNewNickname(e.target.value)}
            />
            <Button type="default" size={'medium'} onClick={handleCheckNickname}>
              중복 확인
            </Button>
          </div>
        </label>
        {/* <label htmlFor="email" className="text-[14px] font-bold flex items-center">
          <span className="w-[175px]">비밀번호</span>
          <input
            type="password"
            name="password"
            id="password"
            className="w-full border-b border-gray-4 focus:outline-none p-[5px] text-[14px] font-medium"
            ref={passwordRef}
          />
        </label>
        <label htmlFor="email" className="text-[14px] font-bold flex items-center">
          <span className="w-[175px]">비밀번호 확인</span>
          <input
            type="password"
            name="password-confirm"
            id="password-confirm"
            className="w-full border-b border-gray-4 focus:outline-none p-[5px] text-[14px] font-medium"
          />
        </label> */}
      </div>
      <div className="mt-auto flex flex-col gap-[11px] px-[24px] w-full">
        <Button type="primary" size={'large'} text={'bold'} onClick={handleInfoModify}>
          <span className="font-bold text-[14px]">회원 정보 수정</span>
        </Button>
        <Button type={'kakao'} size={'large'} text={'bold'} onClick={withdraw}>
          <span className="font-bold text-[14px]">탈퇴하기</span>
        </Button>
      </div>
    </div>
  );
}

Profile.propTypes = {
  setEditProfileMode: PropTypes.func.isRequired,
};
