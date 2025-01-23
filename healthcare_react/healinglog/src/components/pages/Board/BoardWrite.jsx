import React from 'react';
import Title from '../../util/Title';
import BoardEditor from '../../util/BoardEditor';

const BoardWrite = () => {
  return (
    <div>
      <Title>꿀팁게시판</Title>
      <div>게시글 작성</div>
      <label>제목</label>
      <br />
      <input></input>
      <br />
      <label>내용</label>
      <br />
      <BoardEditor />
    </div>
  );
};

export default BoardWrite;
