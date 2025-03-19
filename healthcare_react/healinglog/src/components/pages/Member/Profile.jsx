import React, { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Btn from '../../util/Btn';
import styled, { useTheme } from 'styled-components';
import { setProfile } from '../../../redux/JoinSlice';
import Swal from 'sweetalert2';

const Profile = () => {
  const dispatch = useDispatch();
  const [profileImg, setProfileImg] = useState('/img/profile.jpg');
  const { profile } = useSelector((state) => state.join);
  const fileInputRef = useRef(null);
  const theme = useTheme();

  //프로필 변경
  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    console.log(selectedFile);

    dispatch(setProfile(selectedFile));
    if (!selectedFile) return;

    //밑으로는 이미지 화면 출력용
    const reader = new FileReader();
    reader.readAsDataURL(selectedFile); // 파일을 Base64로 변환

    reader.onload = () => {
      setProfileImg(reader.result);
    };
  };

  //프로필 삭제
  const handleFileDelete = async () => {
    Swal.fire({
      title: '이미지를 삭제하시겠습니까?', // 제목
      icon: 'question', // 아이콘 유형 (warning, success, error 등)
      showCancelButton: true, // 취소 버튼 표시
      confirmButtonColor: '#3085d6', // 등록 버튼 색상
      cancelButtonColor: '#d33', // 취소 버튼 색상
      confirmButtonText: '삭제', // 등록 버튼 텍스트
      cancelButtonText: '취소', // 취소 버튼 텍스트
    }).then((result) => {
      if (result.isConfirmed) {
        //패치 넣기
        dispatch(setProfile(''));
        setProfileImg('/img/profile.jpg');
        fileInputRef.current.value = '';
      }
    });
  };

  const handleImageClick = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  useEffect(() => {
    console.log(profile);
  }, [profile]);

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
          src={profileImg}
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
        <Btn str="삭제" f={handleFileDelete} c={theme.gray} mt={'0'} mb={'0'} ml={'0'} mr={'0'}></Btn>
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
