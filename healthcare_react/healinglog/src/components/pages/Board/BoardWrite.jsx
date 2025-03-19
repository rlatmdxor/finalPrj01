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
import Swal from 'sweetalert2';
import { BASE_URL } from '../../services/config';

const ContentDiv = styled.div`
  margin: 0;
  padding-left: 5%;
  width: 95%;
  min-height: 2000px;
  display: grid;
  grid-template-rows: 40px 40px 1fr 40px 40px;
  /* border: 1px solid #ccc; */
`;
const InputDiv = styled.div`
  width: 95%;
  height: 40px;
  display: grid;
  grid-template-columns: 130px 150px 130px 1fr;

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
    height: 40px;
    font-size: 14px;
    border: 1px solid #ccc;
    padding: 0px 8px;
  }
`;
const ToolboxDiv = styled.div`
  height: 40px;
  width: 95%;
  margin-top: 1px;
`;

const AttachDiv = styled.div`
  margin-top: 5px;
  height: 40px;
  width: 95%;
  display: grid;
  grid-template-columns: 180px 1fr;
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
    height: 40px;
  }
  & .form-input {
    display: grid;
    grid-template: 1fr / 110px 1fr;
    border: 1px solid #ccc;
    padding: 0px 8px;
  }
  & select,
  input {
    box-sizing: border-box;
    width: 95%;
    height: 100%;
    font-size: 14px;
  }
  .hidden-file-input {
    opacity: 0;
    width: 0;
    height: 0;
    position: absolute;
  }

  .custom-file-button {
    display: inline-block;
    padding: 8px 16px;
    background-color: #007bff;
    color: white;
    border-radius: 4px;
    cursor: pointer;
  }

  .custom-file-button:hover {
    background-color: #0056b3;
  }
  .buttonArea {
    display: flex;
    justify-content: start;
    align-items: center;
  }
`;

const ButtonDiv = styled.div`
  display: flex;
  gap: 6px;
  justify-content: end;
  margin-top: 10px;
  margin-bottom: 40px;
`;

const EditorDiv = styled.div`
  box-sizing: border-box;
  width: 95%;
  font-size: 14px;
  border: 1px solid #ccc;
  overflow: auto;
  padding: 10px;
`;
const LayDiv = styled.div`
  height: 30px;
`;
const attachLayDiv = styled.div`
  width: 95%;
`;

const staticToolbarPlugin = createToolbarPlugin();
const textAlignmentPlugin = createTextAlignmentPlugin();
const linkPlugin = createLinkPlugin();
const imagePlugin = createImagePlugin();
const { Toolbar } = staticToolbarPlugin;
const plugins = [staticToolbarPlugin, textAlignmentPlugin, linkPlugin, imagePlugin];

const ImageComponent = (props) => {
  const { block, contentState } = props;
  const entity = contentState.getEntity(block.getEntityAt(0));
  const { src, width } = entity.getData();
  return <img src={src} alt="Inserted" style={{ width: width || '50%', maxWidth: '100%', height: 'auto' }} />;
};

const blockRendererFn = (block, contentState) => {
  if (block.getType() === 'atomic') {
    const entity = contentState.getEntity(block.getEntityAt(0));
    if (entity.getType() === 'IMAGE') {
      return {
        component: ImageComponent,
        editable: false,
      };
    }
  }
  return null;
};

const BoardWrite = () => {
  const token = localStorage.getItem('token');
  if (!token) {
    alert('로그인 정보가 없습니다.');
    window.location.href = '/login';
  }
  const navigate = useNavigate();
  const [inputData, setInputData] = useState({ categoryNo: '', title: '', content: '' });
  const [f, setFiles] = useState([]);
  const [editorState, setEditorState] = useState(() => EditorState.createEmpty());
  const editorRef = useRef(null);
  const [isFocused, setIsFocused] = useState(false);
  const [num, setNum] = useState(1);

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

  const handleEnrollBoard = async () => {
    const result = await Swal.fire({
      title: '등록하시겠습니까?',
      icon: 'question',
      showCancelButton: true,
      confirmButtonText: '확인',
      cancelButtonText: '취소',
    });

    if (result.isConfirmed) {
      try {
        if (inputData.categoryNo == '' || inputData.categoryNo == null || inputData.categoryNo == '0') {
          Swal.fire({
            title: '카테고리를 선택해주세요',
            icon: 'error',
          });
          return;
        }
        if (inputData.title == '' || inputData.title == null) {
          Swal.fire({
            title: '제목을 입력해주세요',
            icon: 'error',
          });
          return;
        }
        if (editorState.getCurrentContent().hasText() == '' || editorState.getCurrentContent().hasText() == null) {
          Swal.fire({
            title: '내용을 입력해주세요',
            icon: 'error',
          });
          return;
        }
        if (inputData.title.length > 40) {
          Swal.fire({
            title: '최대 제목 길이를 초과했습니다. (최대40자)',
            icon: 'error',
          });
          return;
        }

        const formData = new FormData();

        const jsonBlob = new Blob([JSON.stringify(inputData)], { type: 'application/json' });
        formData.append('data', jsonBlob);

        f.forEach((file) => {
          formData.append('f', file);
        });

        const response = await fetch(`${BASE_URL}/api/board/honeytip/write`, {
          method: 'POST',
          headers: { Authorization: `Bearer ${token}` },
          body: formData,
        });

        const data = await response.text();
        if (data !== '0') {
          Swal.fire({
            title: '등록되었습니다.',
            icon: 'success',
            draggable: true,
          });
          setInputData({ title: '', memberNo: '', content: '', categoryNo: '' });
          setFiles([]);
          navigate('/board');
        } else {
          Swal.fire({
            title: '등록 중 오류가 발생했습니다.',
            icon: 'error',
          });
        }
      } catch (error) {
        console.error('Error:', error);
      }
    }
  };
  const handleImageUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        const contentState = editorState.getCurrentContent();
        const contentStateWithEntity = contentState.createEntity('IMAGE', 'IMMUTABLE', {
          src: reader.result,
          width: '100%',
        });
        const entityKey = contentStateWithEntity.getLastCreatedEntityKey();
        const newEditorState = AtomicBlockUtils.insertAtomicBlock(editorState, entityKey, ' ');
        setEditorState(EditorState.forceSelection(newEditorState, newEditorState.getSelection()));
      };
      reader.readAsDataURL(file);
    }
  };

  const handleFileChange = (e) => {
    const file = e.target.files;
    for (let index = 0; index < file.length; index++) {
      const files = e.target.files[index];
      f.push(files);
    }
    setFiles(() => f);
    handleCounter();
  };
  const handleCounter = () => {
    setNum((prev) => prev + 1);
  };

  const removeFile = (index) => {
    setFiles((prev) => prev.filter((_, i) => i !== index));
  };

  return (
    <>
      <Title>꿀팁 작성</Title>
      <LayDiv></LayDiv>
      <ContentDiv>
        <InputDiv>
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
        </InputDiv>
        <ToolboxDiv className="toolbar">
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
        </ToolboxDiv>
        <EditorDiv onClick={focus}>
          <Editor
            editorState={editorState}
            onChange={handleEditorChange}
            plugins={plugins}
            ref={editorRef}
            placeholder={isFocused ? '' : '내용을 입력해주세요.'}
            blockRendererFn={(block) => blockRendererFn(block, editorState.getCurrentContent())}
          />
        </EditorDiv>
        <AttachDiv>
          <div className="form-label">첨부파일</div>
          <div className="form-input">
            <div className="buttonArea">
              <input type="file" id="fileUpload" multiple onChange={handleFileChange} className="hidden-file-input" />
              <label htmlFor="fileUpload" className="custom-file-button">
                파일 추가
              </label>
            </div>
            <div>
              {f?.map((file, index) => (
                <>
                  <span key={index}>{file.name}</span>
                  <button onClick={() => removeFile(index)}>삭제</button>
                </>
              ))}
            </div>
          </div>
        </AttachDiv>
        <AttachDiv>
          <div className="form-label">이미지 삽입</div>
          <div className="form-input">
            <div className="buttonArea">
              <input
                type="file"
                accept="image/*"
                onChange={handleImageUpload}
                id="fileUploads"
                className="hidden-file-input"
              />
              <label htmlFor="fileUploads" className="custom-file-button">
                파일 추가
              </label>
            </div>
            <div>
              {/* {f?.map((file, index) => (
                <span key={index} onClick={() => removeFile(index)}>
                  {file.name} 삭제
                </span>
              ))} */}
            </div>
          </div>
        </AttachDiv>
      </ContentDiv>
      <ButtonDiv>
        <Btn str={'등록'} c={'#FF7F50'} fc={'#ffffff'} mr={'10'} h={'40'} f={handleEnrollBoard} />
        <Btn str={'취소'} c={'#D9D9D9'} fc={'#3d4147'} mr={'65'} h={'40'} f={() => navigate('/board')} />
      </ButtonDiv>
    </>
  );
};
export default BoardWrite;
