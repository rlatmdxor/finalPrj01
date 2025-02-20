import Title from '../../util/Title';
import styled from 'styled-components';
import Btn from '../../util/Btn';
import { useNavigate } from 'react-router-dom';
import React, { useState, useRef } from 'react';
import { AtomicBlockUtils, convertToRaw, EditorState } from 'draft-js';
import Editor from '@draft-js-plugins/editor';
import createToolbarPlugin from '@draft-js-plugins/static-toolbar';
import createTextAlignmentPlugin from '@draft-js-plugins/text-alignment';
import createLinkPlugin from '@draft-js-plugins/anchor';
import createImagePlugin from '@draft-js-plugins/image';
import '@draft-js-plugins/static-toolbar/lib/plugin.css';
import '@draft-js-plugins/text-alignment/lib/plugin.css';
import {
  ItalicButton,
  BoldButton,
  UnderlineButton,
  HeadlineOneButton,
  HeadlineTwoButton,
  HeadlineThreeButton,
  UnorderedListButton,
  OrderedListButton,
} from '@draft-js-plugins/buttons';
import ContentLayout from '../../util/ContentLayout';
import Swal from 'sweetalert2';

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
    padding: 5px;
    background-color: #fff;
    border: 1px solid #d8d8d8;
    min-height: 400px;
  }
`;
const ButtonDiv = styled.div`
  display: flex;
  gap: 6px;
  justify-content: end;
  margin-top: 10px;
  margin-bottom: 40px;
`;

const LayoutDivs = styled.div`
  display: grid;
  grid-template-columns: 100%;
  grid-template-rows: auto 400px;
  width: 100%;
  height: 100%;
`;
const ToolbarDiv = styled.div`
  & > div {
    display: flex;
    background-color: #fbfbfb;
    align-items: center;
  }

  & .toolbar-select {
    width: 80px;
    height: 26px;
    margin: 0px 10px;
  }
`;
const ContentDiv = styled.div`
  width: 100%;
  height: 100%;
  box-sizing: border-box;
  padding: 18px;
  border-left: 1px solid #d8d8d8;
  border-right: 1px solid #d8d8d8;
  border-bottom: 1px solid #d8d8d8;
  overflow: auto;

  .public-DraftEditorPlaceholder-root {
    color: #808080;
  }
`;
const staticToolbarPlugin = createToolbarPlugin();
const textAlignmentPlugin = createTextAlignmentPlugin();
const linkPlugin = createLinkPlugin();
const imagePlugin = createImagePlugin();
const { Toolbar } = staticToolbarPlugin;
const plugins = [staticToolbarPlugin, textAlignmentPlugin, linkPlugin, imagePlugin];

const BoardWrite = () => {
  const token = null;
  const navigate = useNavigate();
  const [inputData, setInputData] = useState({ memberNo: '1', categoryNo: '', title: '', content: '' });
  const [editorState, setEditorState] = useState(() => EditorState.createEmpty());
  const editorRef = useRef(null);
  const [isFocused, setIsFocused] = useState(false);

  const focus = () => {
    if (editorRef.current) {
      editorRef.current.focus();
      setIsFocused(true);
    }
  };
  const handleChangeInput = (e) => {
    setInputData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };
  const handleEditorChange = (newEditorState) => {
    setEditorState(newEditorState);
    const rawContent = JSON.stringify(convertToRaw(newEditorState.getCurrentContent()));
    setInputData((prev) => ({ ...prev, content: rawContent }));
  };
  const handleEnrollBoard = () => {
    Swal.fire({
      title: '등록하시겠습니까?',
      icon: 'question',
      showCancelButton: true,
      confirmButtonText: '확인',
      cancelButtonText: '취소',
    }).then((result) => {
      if (result.isConfirmed) {
        const formData = new FormData();
        formData.append('data', new Blob([JSON.stringify(inputData)], { type: 'application/json' }));
        fetch('http://127.0.0.1:80/api/board/honeytip/write', {
          method: 'POST',
          headers: { Authorization: `Bearer ${token}` },
          body: formData,
        })
          .then((resp) => resp.json())
          .then((data) => {
            Swal.fire({ title: data.message, icon: data.success ? 'success' : 'error' });
          });
      }
    });
  };

  // 이미지 삽입 핸들러
  const handleImageUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        const contentState = editorState.getCurrentContent();
        const contentStateWithEntity = contentState.createEntity('IMAGE', 'IMMUTABLE', { src: reader.result });
        const entityKey = contentStateWithEntity.getLastCreatedEntityKey();
        const newEditorState = AtomicBlockUtils.insertAtomicBlock(editorState, entityKey, ' ');
        setEditorState(newEditorState);
      };
      reader.readAsDataURL(file);
    }
  };
  return (
    <>
      <Title>꿀팁게시판</Title>
      <div></div>
      <ContentLayout>
        <LayoutDiv>
          <div className="header">게시글 작성</div>
          <FormDiv>
            <div className="form-label">카테고리</div>
            <div className="form-input">
              <select onChange={handleChangeInput} name="categoryNo">
                <option value="0">-- 카테고리 선택 --</option>
                <option value="1">병원</option>
                <option value="2">약국</option>
                <option value="3">생활</option>
                <option value="4">보험</option>
              </select>
            </div>
            <div className="form-label">제목</div>
            <div className="form-input">
              <input type="text" name="title" onChange={handleChangeInput} placeholder="제목을 입력하세요." />
            </div>
            <div className="form-editor">
              <LayoutDivs className="editor" onClick={focus}>
                <ToolbarDiv>
                  <Toolbar className="toolbar">
                    {(externalProps) => (
                      <>
                        <ItalicButton {...externalProps} />
                        <BoldButton {...externalProps} />
                        <UnderlineButton {...externalProps} />
                        <textAlignmentPlugin.TextAlignment {...externalProps} />
                        <HeadlineOneButton {...externalProps} />
                        <HeadlineTwoButton {...externalProps} />
                        <HeadlineThreeButton {...externalProps} />
                        <UnorderedListButton {...externalProps} />
                        <OrderedListButton {...externalProps} />
                        <linkPlugin.LinkButton {...externalProps} />
                      </>
                    )}
                  </Toolbar>
                </ToolbarDiv>
                <ContentDiv>
                  <Editor
                    editorState={editorState}
                    onChange={handleEditorChange}
                    plugins={plugins}
                    ref={editorRef}
                    placeholder={isFocused ? '' : '내용을 입력해주세요.'}
                  />
                </ContentDiv>
              </LayoutDivs>
            </div>
            <div className="form-label">첨부파일</div>
            <div className="form-input">
              <button>파일선택</button>
            </div>
            <div className="form-label">이미지 삽입</div>
            <div className="form-input">
              <input type="file" accept="image/*" onChange={handleImageUpload} />
            </div>
          </FormDiv>
          <ButtonDiv>
            <Btn str={'등록'} c={'#FF7F50'} fc={'#ffffff'} h={'40'} f={handleEnrollBoard} />
            <Btn str={'취소'} c={'#D9D9D9'} fc={'#3d4147'} h={'40'} f={() => navigate('/board')} />
          </ButtonDiv>
        </LayoutDiv>
      </ContentLayout>
    </>
  );
};
export default BoardWrite;

////////////////////////////////////////////////////

/////////////////////////////////////////////////////

const text = '';
