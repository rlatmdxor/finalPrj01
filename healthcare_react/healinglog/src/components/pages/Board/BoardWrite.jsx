import React, { useState } from 'react';
import Title from '../../util/Title';
import BoardEditor from '../../util/BoardEditor';
import styled from 'styled-components';
import Btn from '../../util/Btn';
import { useNavigate } from 'react-router-dom';

const LayoutDiv = styled.div`
  margin: 5px 50px;

  & .header {
    margin-top: 18px;
    margin-bottom: 14px;
    margin-left: 2px;
    font-size: 18px;
    font-weight: 600;
    color: #353535;
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
    height: 35px;
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
    height: 35px;
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

  const [title, setTitle] = useState('');
  const [category, setCategory] = useState('');
  const [content, setContent] = useState('');

  const handleChangeContent = (newContent) => {
    setContent(newContent);
  };

  const handleEnrollBoard = () => {
    // fetch 함수
    console.log('category : ' + category);
    console.log('title : ' + title);
    console.log('content : ' + content);
  };

  return (
    <div>
      <Title>꿀팁게시판</Title>
      <LayoutDiv>
        <div className="header">게시글 작성</div>
        <FormDiv>
          <div className="form-label">카테고리</div>
          <div className="form-input">
            <select value={category} onChange={(e) => setCategory(e.target.value)}>
              <option>-- 카테고리 선택 --</option>
              <option>병원</option>
              <option>약국</option>
              <option>생할</option>
              <option>보험</option>
            </select>
          </div>
          <div className="form-label">제목</div>
          <div className="form-input">
            <input
              type="text"
              placeholder="제목을 입력하세요."
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
          </div>
          <div className="form-editor">
            <BoardEditor onChangeContent={handleChangeContent} />
          </div>
          <div className="form-label">첨부파일</div>
          <div className="form-input">
            <button>파일선택</button>
          </div>
        </FormDiv>
        <ButtonDiv>
          <Btn str={'등록'} c={'#FF7F50'} fc={'#ffffff'} h={'40'} f={handleEnrollBoard} />
          <Btn str={'취소'} c={'#D9D9D9'} fc={'#3d4147'} h={'40'} f={handleCancleClick} />
        </ButtonDiv>
      </LayoutDiv>
    </div>
  );
};

export default BoardWrite;
