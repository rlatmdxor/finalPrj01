import React from 'react';
import Title from '../util/Title';
import ContentLayout from '../util/ContentLayout';
import Table from '../util/Table';

const AdminUserManage = () => {
  const dataVoList = [
    {
      no: '20',
      id: 'user01',
      email: 'user01@gmail.com',
      nick: 'nick01',
      enrollDate: '2024-05-11',
      address: '경기도 수원시 팔달구 중부대로 93, (지동)',
      number: '010-0000-0000',
      delYn: 'N',
    },
    {
      no: '19',
      id: 'user02',
      email: 'user02@gmail.com',
      nick: 'nick02',
      enrollDate: '2024-07-11',
      address: '서울 강남구 테헤란로14길 6 2,3,4,5,6층 505-4111',
      number: '010-0000-0001',
      delYn: 'N',
    },
    {
      no: '20',
      id: 'user01',
      email: 'user01@gmail.com',
      nick: 'nick01',
      enrollDate: '2024-05-11',
      address: '경기도 수원시 팔달구 중부대로 93, (지동)',
      number: '010-0000-0000',
      delYn: 'N',
    },
    {
      no: '19',
      id: 'user02',
      email: 'user02@gmail.com',
      nick: 'nick02',
      enrollDate: '2024-07-11',
      address: '서울 강남구 테헤란로14길 6 2,3,4,5,6층 505-4111',
      number: '010-0000-0001',
      delYn: 'N',
    },
    {
      no: '20',
      id: 'user01',
      email: 'user01@gmail.com',
      nick: 'nick01',
      enrollDate: '2024-05-11',
      address: '경기도 수원시 팔달구 중부대로 93, (지동)',
      number: '010-0000-0000',
      delYn: 'N',
    },
    {
      no: '19',
      id: 'user02',
      email: 'user02@gmail.com',
      nick: 'nick02',
      enrollDate: '2024-07-11',
      address: '서울 강남구 테헤란로14길 6 2,3,4,5,6층 505-4111',
      number: '010-0000-0001',
      delYn: 'N',
    },
    {
      no: '20',
      id: 'user01',
      email: 'user01@gmail.com',
      nick: 'nick01',
      enrollDate: '2024-05-11',
      address: '경기도 수원시 팔달구 중부대로 93, (지동)',
      number: '010-0000-0000',
      delYn: 'N',
    },
    {
      no: '19',
      id: 'user02',
      email: 'user02@gmail.com',
      nick: 'nick02',
      enrollDate: '2024-07-11',
      address: '서울 강남구 테헤란로14길 6 2,3,4,5,6층 505-4111',
      number: '010-0000-0001',
      delYn: 'N',
    },
    {
      no: '20',
      id: 'user01',
      email: 'user01@gmail.com',
      nick: 'nick01',
      enrollDate: '2024-05-11',
      address: '경기도 수원시 팔달구 중부대로 93, (지동)',
      number: '010-0000-0000',
      delYn: 'N',
    },
    {
      no: '19',
      id: 'user02',
      email: 'user02@gmail.com',
      nick: 'nick02',
      enrollDate: '2024-07-11',
      address: '서울 강남구 테헤란로14길 6 2,3,4,5,6층 505-4111',
      number: '010-0000-0001',
      delYn: 'N',
    },
  ];

  return (
    <>
      <Title>회원 관리</Title>

      <div></div>
      <ContentLayout>
        <Table>
          <thead>
            <tr>
              <th>회원 번호</th>
              <th>아이디</th>
              <th>이메일</th>
              <th>닉네임</th>
              <th>가입일자</th>
              {/* <th>주소</th> */}
              <th>전화번호</th>
              <th>탈퇴여부</th>
              <th>탈퇴</th>
            </tr>
          </thead>
          <tbody>
            {dataVoList.map((vo) => (
              <tr key={vo.no}>
                <td>{vo.no}</td>
                <td>{vo.id}</td>
                <td>{vo.email}</td>
                <td>{vo.nick}</td>
                <td>{vo.enrollDate}</td>
                {/* <td>{vo.address}</td> */} {/* 일단 칸수 애매한거같음*/}
                <td>{vo.number}</td>
                <td>{vo.delYn}</td>
                <td>
                  <button>삭제</button>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      </ContentLayout>
    </>
  );
};

export default AdminUserManage;
