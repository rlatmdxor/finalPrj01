import React, { useEffect, useState } from 'react';
import Title from '../../util/Title';
import Navi from '../../util/Navi';
import styled from 'styled-components';
import ContentLayout from '../../util/ContentLayout';
import HoneytipBoard from '../../pages/Board/HoneytipBoard';
import Btn from '../../util/Btn';
import Pagination from '../../util/Pagination';
import { useSelector, useDispatch } from 'react-redux';
import { setTotalCount, resetPaging } from '../../../redux/pagingSlice';
import SearchBar from '../../util/SearchBar';
import Table from '../../util/Table';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import { BASE_URL } from '../../services/config';

const NaviContainer = styled.div`
  display: grid;
  position: relative;
  width: 500px;
  top: 20px;
  left: 40px;
  grid-template-columns: 5fr 7fr 6fr;
`;
const BottomDiv = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;
const LayDiv = styled.div`
  height: 27px;
`;
const BtnContainer = styled.div`
  display: flex;
  justify-content: end;
  margin-right: -45px;
`;
const ReportedHoneyBoard = () => {
  const token = localStorage.getItem('token');

  const boardType = 'reportedHoneyTip';

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [dataVoList, setVoList] = useState([]);
  const [pagedData, setPagedData] = useState([]);
  const [selectedItems, setSelectedItems] = useState([]);

  const currentPage = useSelector((state) => state.paging[boardType]?.currentPage || 1);
  const boardLimit = useSelector((state) => state.paging[boardType]?.boardLimit || 12);
  const [num, setNum] = useState(0);
  const offset = (currentPage - 1) * boardLimit;

  const url = `${BASE_URL}/api/board/honeytip/reported/list`;
  const options = {
    method: 'POST',
    headers: {
      'content-type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
  };

  useEffect(() => {
    dispatch(resetPaging({ boardType }));
  }, []);

  useEffect(() => {
    setPagedData(dataVoList.slice(offset, offset + boardLimit));
  }, [dataVoList, currentPage, boardLimit]);

  useEffect(() => {
    fetch(url, options)
      .then((resp) => resp.json())
      .then((data) => {
        if (data.length > 0) {
          dispatch(setTotalCount({ boardType, totalCount: data.length }));
          setVoList(data);
        } else {
          dispatch(resetPaging({ boardType }));
          setVoList([]);
        }
      })
      .catch((error) => console.error('데이터 불러오기 실패:', error));
  }, [num, token]);
  const handleCheckboxChange = (boardNo) => {
    setSelectedItems((prevSelected) =>
      prevSelected.includes(boardNo) ? prevSelected.filter((item) => item !== boardNo) : [...prevSelected, boardNo]
    );
  };

  const handleDelSubmit = (e) => {
    if (selectedItems.length == 0) {
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: '삭제하실 게시글을 선택해주세요',
      });
      return;
    }

    Swal.fire({
      title: `${selectedItems.length}개의 게시글을 삭제하시겠습니까?`,
      icon: 'question',
      showCancelButton: true,
      confirmButtonText: '확인',
      cancelButtonText: '취소',
    }).then((result) => {
      if (result.isConfirmed) {
        fetch(`${BASE_URL}/api/board/honeytip/reported/delete`, {
          method: 'POST',
          headers: {
            'content-type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(selectedItems),
        })
          .then((resp) => resp.text())
          .then((data) => {
            setSelectedItems([]);
            setNum((x) => x - 1);
            Swal.fire({
              title: `${data}개의 게시글이 삭제되었습니다.`,
              icon: 'success',
              draggable: true,
            });
          });
      }
    });
  };
  return (
    <>
      <Title>꿀팁 게시판</Title>
      <NaviContainer>
        <Navi target="admin/board" tag={'게시글 목록'}></Navi>
        <Navi target="admin/reported/honeytip" tag={'게시글 신고현황'}></Navi>
        <Navi target="admin/reported/honeytip/comment" tag={'댓글 신고현황'}></Navi>
      </NaviContainer>
      <ContentLayout>
        <LayDiv />
        <BtnContainer>
          <div onClick={handleDelSubmit}>
            <Btn mt={'50'} mr={'46'} mb={'20'} str={'삭제'} c={'#FF7F50'} fc={'white'}></Btn>
          </div>
        </BtnContainer>
        <Table>
          <thead>
            <tr>
              <th>게시글번호</th>
              <th>신고사유</th>
              <th>제목</th>
              <th>신고일</th>
              <th>작성자</th>
              <th>신고수</th>
              <th>비고</th>
            </tr>
          </thead>
          <tbody>
            {pagedData.map((vo) => {
              return (
                <tr key={vo.no}>
                  <td onClick={() => navigate(`/board/detail?bno=${vo.boardNo}`)}>{vo.boardNo}</td>
                  <td onClick={() => navigate(`/board/detail?bno=${vo.boardNo}`)}>{vo.name}</td>
                  <td onClick={() => navigate(`/board/detail?bno=${vo.boardNo}`)}>{vo.title}</td>
                  <td onClick={() => navigate(`/board/detail?bno=${vo.boardNo}`)}>{vo.enrollDate}</td>
                  <td onClick={() => navigate(`/board/detail?bno=${vo.boardNo}`)}>{vo.nick}</td>
                  <td onClick={() => navigate(`/board/detail?bno=${vo.boardNo}`)}>{vo.reportCount}</td>
                  <td>
                    <input
                      type="checkbox"
                      checked={selectedItems.includes(vo.boardNo)}
                      onChange={(e) => {
                        e.stopPropagation();
                        handleCheckboxChange(vo.boardNo);
                      }}
                    />
                  </td>
                </tr>
              );
            })}
          </tbody>
        </Table>
        <BottomDiv>
          <div></div>
          <div>
            <Pagination boardType={boardType} />
          </div>
          <div></div>
        </BottomDiv>
        <LayDiv />
        <LayDiv />
      </ContentLayout>
    </>
  );
};

export default ReportedHoneyBoard;
