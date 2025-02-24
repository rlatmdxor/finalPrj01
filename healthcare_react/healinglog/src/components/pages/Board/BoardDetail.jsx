import Title from '../../util/Title';
import styled from 'styled-components';
import Btn from '../../util/Btn';
import { data, Link, useNavigate, useParams, useSearchParams } from 'react-router-dom';
import React, { useState, useRef, useEffect } from 'react';
import { AtomicBlockUtils, convertFromRaw, convertToRaw, EditorState } from 'draft-js';
import Editor from '@draft-js-plugins/editor';
import createToolbarPlugin from '@draft-js-plugins/static-toolbar';
import createTextAlignmentPlugin from '@draft-js-plugins/text-alignment';
import createLinkPlugin from '@draft-js-plugins/anchor';
import createImagePlugin from '@draft-js-plugins/image';
import '@draft-js-plugins/static-toolbar/lib/plugin.css';
import '@draft-js-plugins/text-alignment/lib/plugin.css';
import Swal from 'sweetalert2';

const ContentDiv = styled.div`
  margin: 0;
  padding-left: 5%;
  width: 95%;
  min-height: 1000px;
  display: grid;
  grid-template-rows: 40px 1fr 40px 40px;
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
    box-sizing: border-box;
    width: 99%;
    height: 40px;
    font-size: 14px;
    border: 1px solid #ccc;
    padding: 0px 8px;
  }
`;

const AttachDiv = styled.div`
  margin-top: 5px;
  height: 40px;
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
  .attach-box {
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
`;
const MinDiv = styled.div`
  display: grid;
  grid-template-columns: repeat(8, 1fr);
  border-collapse: collapse;
  box-sizing: border-box;

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
    display: flex;
    justify-content: center;
    align-items: center;
    width: 99%;
    height: 40px;
    font-size: 14px;
    border: 1px solid #ccc;
    /* padding: 0px 2px; */
  }
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

// 블록 렌더러 설정
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

const BoardDetail = () => {
  const token = null;
  const [searchParams] = useSearchParams(); // 쿼리스트링 값 가져오기
  const bno = searchParams.get('bno'); // 'bno' 키의 값 가져오기
  const navigate = useNavigate();
  const [boardVo, setBoardVo] = useState({});
  const [f, setFiles] = useState([]);
  const [editorState, setEditorState] = useState(() => EditorState.createEmpty());
  const [num, setNum] = useState(1);

  useEffect(() => {
    const fetchPost = async () => {
      console.log('bnooooooooooooooooooooooooo', bno);
      try {
        const response = await fetch(`http://127.0.0.1:80/api/board/honeytip/detail?bno=${bno}`, {});
        const data = await response.json();
        console.log(data.attachVoList);

        setBoardVo(data.detailVo);
        if (data.attachVoList.length > 0) {
          setFiles(data.attachVoList);
        }

        if (data.detailVo.content) {
          const contentState = convertFromRaw(JSON.parse(data.detailVo.content));
          setEditorState(EditorState.createWithContent(contentState));
        }
      } catch (error) {
        console.error('데이터 불러오기 오류:', error);
      }
    };

    if (bno) fetchPost();
  }, [bno]);

  const handleCounter = () => {
    setNum((prev) => prev + 1);
  };

  const handleDownload = (url, fileName) => {
    const a = document.createElement('a');
    a.href = url;
    a.download = fileName || 'downloaded-file'; // 🔹 파일 이름 지정 가능
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
  };
  return (
    <>
      <Title>꿀팁 상세</Title>
      <div></div>
      <ContentDiv>
        <InputDiv>
          <div className="form-label">카테고리</div>
          <div className="form-input">{boardVo.categoryName}</div>
          <div className="form-label">제목</div>
          <div className="form-input">{boardVo.title}</div>
        </InputDiv>

        <EditorDiv>
          <Editor
            editorState={editorState}
            readOnly={true}
            plugins={plugins}
            blockRendererFn={(block) => blockRendererFn(block, editorState.getCurrentContent())}
          />
        </EditorDiv>
        <MinDiv>
          <div className="form-label">추천수</div>
          <div className="form-input">{boardVo.recommendCount}</div>
          <div className="form-label">조회수</div>
          <div className="form-input">{boardVo.hit}</div>
          <div className="form-label">작성자</div>
          <div className="form-input">{boardVo.nick}</div>
          <div className="form-label">등록일</div>
          <div className="form-input">{boardVo.enrollDate}</div>
        </MinDiv>
        <AttachDiv>
          <div className="form-label">첨부파일</div>
          <div className="form-input">
            <div className="attach-box">
              {f?.map((file, index) => (
                <span
                  key={index}
                  onClick={() => handleDownload(file.path, file.originName)} // ✅ URL만으로 다운로드 실행
                  style={{ cursor: 'pointer', color: 'blue', textDecoration: 'underline' }}
                >
                  {file.originName}&nbsp;&nbsp;&nbsp;
                </span>
              ))}
            </div>
          </div>
        </AttachDiv>
      </ContentDiv>
      <ButtonDiv>
        {/* <Btn str={'등록'} c={'#FF7F50'} fc={'#ffffff'} h={'40'} f={handleEnrollBoard} />
        <Btn str={'취소'} c={'#D9D9D9'} fc={'#3d4147'} h={'40'} f={() => navigate('/board')} /> */}
      </ButtonDiv>
    </>
  );
};

export default BoardDetail;
