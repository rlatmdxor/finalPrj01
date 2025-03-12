import React, { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Btn from '../../util/Btn';
import styled, { useTheme } from 'styled-components';
import { setProfile } from '../../../redux/JoinSlice';
import Swal from 'sweetalert2';
import { BASE_URL } from '../../services/config';

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

    fetch(`${BASE_URL}/api/member/profileChange`, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${token}`,
      },
      body: formData,
    })
      .then((resp) => resp.text())
      .then((data) => {
        dispatch(setProfile(data));

        Swal.fire({
          icon: 'success',
          title: '프로필 변경 완료!',
          confirmButtonText: '확인',
        });
      });
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
        fetch(`${BASE_URL}/api/member/profileDelete`, {
          method: 'POST',
          headers: {
            Authorization: `Bearer ${token}`,
          },
          body: {},
        })
          .then((resp) => resp.text())
          .then((data) => {
            dispatch(setProfile(data));
            Swal.fire({
              icon: 'success',
              title: '프로필 삭제 완료!',
              confirmButtonText: '확인',
            });
          });
        fileInputRef.current.value = '';
      }
    });
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
