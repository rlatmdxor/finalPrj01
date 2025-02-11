import React, { useRef } from 'react';
import { useSelector } from 'react-redux';
import Btn from './Btn';
import styled, { useTheme } from 'styled-components';

const Profile = ({ receiveData }) => {
  const { profile } = useSelector((state) => state.join);
  const fileInputRef = useRef(null);
  const theme = useTheme();

  //프로필 변경
  const handleFileChange = (e) => {
    // console.log('handleFileChange called ~~~');

    const selectedFile = e.target.files[0];
    if (!selectedFile) return;

    const reader = new FileReader();
    reader.readAsDataURL(selectedFile); // 파일을 Base64로 변환

    reader.onload = () => {
      receiveData(reader.result);
    };
  };

  //프로필 삭제
  const handleFileDelete = () => {
    if (window.confirm('이미지를 삭제하겠습니까?')) {
      receiveData('/img/profile.jpg');
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
          alt="프로필 미리보기"
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
        <Btn
          str="삭제"
          f={handleFileDelete}
          c={theme.gray}
          // w={'90'}
          // h={'50'}
          // fs={'20'}
          mt={'0'}
          mb={'0'}
          ml={'0'}
          mr={'0'}
        ></Btn>
      </BtnContainer>
      <div></div>
    </>
  );
};

export default Profile;

const ProfileContainer = styled.div`
  display: grid;
`;
const BtnContainer = styled.div`
  display: grid;
  justify-items: end;
  align-items: end;
`;
