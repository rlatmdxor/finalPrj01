import React, { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Btn from '../../util/Btn';
import styled, { useTheme } from 'styled-components';
import { setProfile } from '../../../redux/JoinSlice';

const MyProfile = () => {
  const dispatch = useDispatch();
  const { profile } = useSelector((state) => state.join);
  const fileInputRef = useRef(null);
  const theme = useTheme();

  const token = localStorage.getItem('token');

  //프로필 변경
  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    if (!selectedFile) return;

    const formData = new FormData();
    formData.append('profileImage', selectedFile);

    fetch('http://127.0.0.1:80/api/member/profileChange', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${token}`,
      },
      body: formData,
    })
      .then((resp) => resp.text())
      .then((data) => {
        dispatch(setProfile(data));
        console.log(data);

        alert('프로필 변경 완료!');
      });
  };

  //프로필 삭제
  const handleFileDelete = async () => {
    if (window.confirm('이미지를 삭제하겠습니까?')) {
      dispatch(setProfile(''));
      localStorage.setItem('profile', 'https://healinglog-kh.s3.ap-northeast-2.amazonaws.com/default_profile.jpg');
      fileInputRef.current.value = '';
    }
  };

  const handleImageClick = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  return (
    <>
      <ProfileContainer>
        <input
          type="file"
          accept="image/*"
          ref={fileInputRef}
          style={{ display: 'none' }}
          onChange={handleFileChange}
        />

        <img
          src={profile}
          // alt="프로필 미리보기"
          onClick={handleImageClick}
          style={{
            width: '150px',
            height: '150px',
            borderRadius: '50%',
            cursor: 'pointer',
            objectFit: 'cover',
            border: '2px solid #ccc',
          }}
        />
      </ProfileContainer>
      <BtnContainer>
        <Btn str="삭제" f={handleFileDelete} c={theme.gray} mt={'0'} mb={'0'} ml={'0'} mr={'0'}></Btn>
      </BtnContainer>
      <div></div>
    </>
  );
};

export default MyProfile;

const ProfileContainer = styled.div`
  display: grid;
`;
const BtnContainer = styled.div`
  display: grid;
  justify-items: end;
  align-items: end;
`;
