import React from 'react';
import Title from '../../util/Title';
import BoardEditor from '../../util/BoardEditor';
import styled from 'styled-components';
import Btn from '../../util/Btn';
import { useNavigate } from 'react-router-dom';

const LayoutDiv = styled.div`
  margin: 5px 50px;

  & .header {
    margin-top: 18px;
    margin-bottom: 15px;
    margin-left: 2px;
    font-size: 17px;
    font-weight: 600;
    color: #24292f;
  }
`;

const FormDiv = styled.div`
  width: 100%;
  display: grid;
  grid-template-columns: 180px auto;
  column-gap: 6px;
  row-gap: 2px;

  & .form-label {
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: #d3ebcf;
    color: #32383f;
    font-weight: 600;
    font-size: 14px;
    padding: 2px 0px;
    text-align: center;
    height: 33px;
  }

  & .form-input {
    display: flex;
    justify-content: start;
    align-items: center;
  }

  & select,
  input {
    box-sizing: border-box;
    width: 100%;
    height: 34px;
    font-size: 14px;
    border: 1px solid #ccc;
    padding: 0px 8px;
  }

  & .form-editor {
    grid-column: span 2;
    padding: 5px 0px;
    background-color: #fff;
  }
`;

const ButtonDiv = styled.div`
  display: flex;
  gap: 6px;
  justify-content: end;
  margin-top: 10px;
  margin-bottom: 40px;
`;

const BoardWrite = () => {
  const navigate = useNavigate();

  const handleCancleClick = () => {
    navigate('/board');
  };

  return (
    <div>
      <Title>꿀팁게시판</Title>
      <LayoutDiv>
        <div className="header">게시글 작성</div>
        <FormDiv>
          <div className="form-label">카테고리</div>
          <div className="form-input">
            <select>
              <option>병원</option>
              <option>약국</option>
              <option>생할</option>
              <option>보험</option>
            </select>
          </div>
          <div className="form-label">제목</div>
          <div className="form-input">
            <input type="text" name="title" placeholder="제목을 입력하세요." />
          </div>
          <div className="form-editor">
            <BoardEditor />
          </div>
          <div className="form-label">첨부파일</div>
          <div className="form-input">
            <button>파일선택</button>
          </div>
        </FormDiv>
        <ButtonDiv>
          <Btn str={'등록'} c={'#FF7F50'} fc={'#ffffff'} h={'40'} />
          <Btn str={'취소'} c={'#D9D9D9'} fc={'#24292f'} h={'40'} f={handleCancleClick} />
        </ButtonDiv>
      </LayoutDiv>
    </div>
  );
};

export default BoardWrite;
