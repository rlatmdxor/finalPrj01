import React from 'react';
import Title from '../../util/Title';
import BoardEditor from '../../util/BoardEditor';
import styled from 'styled-components';

const FormDiv = styled.div`
  margin: 5px 50px;
`;
const BoardWrite = () => {
  return (
    <div>
      <Title>꿀팁게시판</Title>
      <FormDiv>
        <div>게시글 작성</div>
        <label>제목</label>
        <br />
        <input></input>
        <br />
        <label>내용</label>
        <br />
        <BoardEditor />
      </FormDiv>
    </div>
  );
};

export default BoardWrite;
