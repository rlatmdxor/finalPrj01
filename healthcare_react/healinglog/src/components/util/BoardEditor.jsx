import React, { useState } from 'react';
import { Editor, EditorState, RichUtils, convertToRaw, Entity, DefaultDraftBlockRenderMap } from 'draft-js';
import 'draft-js/dist/Draft.css';
import styled from 'styled-components';
import { Map } from 'immutable';

const ButtonDiv = styled.div`
  border: 1px solid #ececec;
  display: flex;
  padding: 6px;
  gap: 2px;
`;

const IconButton = styled.button`
  background-color: white;
  border: none;
  width: 28px;
  height: 28px;
  padding: 5px;
`;

const StyledImg = styled.img`
  width: ${(props) => props.width || '100%'};
  height: 100%;
`;

const EditorContainer = styled.div`
  border: 1px solid #ddd;
  min-height: 200px;
  padding: 10px;

  .leftAlign {
    text-align: left;
  }

  .centerAlign {
    text-align: center;
  }

  .rightAlign {
    text-align: right;
  }
`;

const BoardEditor = () => {
  const [editorState, setEditorState] = useState(() => EditorState.createEmpty());

  const toggleInlineStyle = (style) => {
    setEditorState(RichUtils.toggleInlineStyle(editorState, style));
  };

  const toggleBlockType = (blockType) => {
    setEditorState(RichUtils.toggleBlockType(editorState, blockType));
  };

  // 에디터 콘텐츠를 JSON으로 저장
  const saveContent = () => {
    const rawContent = convertToRaw(editorState.getCurrentContent());
    console.log('Saved Content:', JSON.stringify(rawContent));
  };

  return (
    <>
      <div style={{ border: '1px solid #ccc', padding: '10px' }}>
        <ButtonDiv>
          <IconButton onClick={() => toggleInlineStyle('BOLD')}>
            <StyledImg src="https://img.icons8.com/?size=100&id=78937&format=png&color=000000" />
          </IconButton>
          <IconButton onClick={() => toggleInlineStyle('ITALIC')}>
            <StyledImg src="https://img.icons8.com/?size=100&id=99640&format=png&color=000000" />
          </IconButton>
          <IconButton onClick={() => toggleInlineStyle('UNDERLINE')}>
            <StyledImg src="https://img.icons8.com/?size=100&id=99845&format=png&color=000000" />
          </IconButton>

          <IconButton>
            <StyledImg src="https://img.icons8.com/?size=100&id=J3mppEmJhtqg&format=png&color=000000" />
          </IconButton>
          <IconButton>
            <StyledImg src="https://img.icons8.com/?size=100&id=Mw0fxlGLXJlb&format=png&color=000000" />
          </IconButton>
          <IconButton>
            <StyledImg src="https://img.icons8.com/?size=100&id=LcazPDNFek1d&format=png&color=000000" />
          </IconButton>

          <IconButton onClick={() => toggleBlockType('unordered-list-item')}>
            <StyledImg src="https://img.icons8.com/?size=100&id=20440&format=png&color=000000" />
          </IconButton>
          <IconButton onClick={() => toggleBlockType('ordered-list-item')}>
            <StyledImg src="https://img.icons8.com/?size=100&id=6501&format=png&color=000000" />
          </IconButton>

          {/* 저장 버튼 */}
          {/* <button onClick={saveContent}>Save Content</button> */}
        </ButtonDiv>

        {/* 에디터 */}
        <EditorContainer>
          <Editor editorState={editorState} onChange={setEditorState} placeholder="내용을 입력해주세요." />
        </EditorContainer>
      </div>
    </>
  );
};

export default BoardEditor;
