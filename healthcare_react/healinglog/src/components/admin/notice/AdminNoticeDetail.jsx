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
import { useDispatch } from 'react-redux';
import { isTokenExpired, getRoleFromToken } from '../../util/JwtUtil';
import { BASE_URL } from '../../services/config';

const ContentDiv = styled.div`
  margin: 0;
  padding-left: 5%;
  width: 95%;
  display: grid;
  grid-template-rows: 40px 40px 1fr 50px 60px 105px 100px 140px;
`;
const InputDiv = styled.div`
  width: 95%;
  height: 40px;
  display: grid;
  grid-template-columns: 155px 1fr;
  margin-top: 5px;

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
    height: 88%;
  }
  & .form-input {
    display: flex;
    justify-content: center;
    align-items: center;
    box-sizing: border-box;
    width: 100%;
    /* height: 40px; */
    font-size: 14px;
    border: 1px solid #ccc;
    padding: 0px 8px;
    height: 96%;
  }
`;

const AttachDiv = styled.div`
  width: 95%;
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
  justify-content: end;
  width: 99%;
`;

const EditorDiv = styled.div`
  box-sizing: border-box;
  min-height: 1000px;
  width: 95%;
  font-size: 14px;
  border: 1px solid #ccc;
  overflow: auto;
  padding: 10px;
  margin-top: 8px;
`;
const MinDiv = styled.div`
  width: 95%;
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
    height: 90%;
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
const ThumbsupDiv = styled.div`
  display: flex;
  justify-content: center;
  align-items: end;
`;

const ReportDiv = styled.div`
  width: 95%;
  display: flex;
  justify-content: end;
  color: red;
  font-weight: 600;
  cursor: pointer;
`;
const LayDiv = styled.div`
  height: 30px;
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

const AdminNoticeDetail = () => {
  const navi = useNavigate();
  const token = localStorage.getItem('token');
  useEffect(() => {
    if (!token || isTokenExpired(token)) {
      setIsLogin(false);
    }
    if (getRoleFromToken(token) == 'ROLE_ADMIN') {
      setIsAdmin(true);
    }
    if (!token || isTokenExpired(token)) {
      setIsLogin(false);
    }
  }, [navi, token]);
  const [isAdmin, setIsAdmin] = useState(false);
  const [isLogin, setIsLogin] = useState(true);
  const [searchParams] = useSearchParams();
  const bno = searchParams.get('bno');
  const navigate = useNavigate();
  const [boardVo, setBoardVo] = useState({});
  const [f, setFiles] = useState([]);
  const [editorState, setEditorState] = useState(() => EditorState.createEmpty());
  const [num, setNum] = useState(0);

  const dispatch = useDispatch();

  useEffect(() => {
    const fetchPost = async () => {
      try {
        const response = await fetch(`${BASE_URL}/api/notice/detail?bno=${bno}`, {
          method: 'GET',
          headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` },
        });
        const data = await response.json();

        setBoardVo(data.detailVo);
        if (data.attachVoList && data.attachVoList.length > 0) {
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

    if (bno) {
      fetchPost();
    }
  }, [bno]);

  const handleDownload = (url, fileName) => {
    const a = document.createElement('a');
    a.href = url;
    a.download = fileName || 'downloaded-file';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
  };

  const handleNaviEditPage = () => {
    navigate(`/admin/notice/edit?bno=${bno}`);
  };

  const handleNaviList = () => {
    navigate('/admin/notice');
  };

  const handleDeleteHoneyTip = () => {
    Swal.fire({
      title: '삭제하시겠습니까?',
      icon: 'question',
      showCancelButton: true,
      confirmButtonText: '확인',
      cancelButtonText: '취소',
    }).then((result) => {
      if (result.isConfirmed) {
        fetch(`${BASE_URL}/api/notice/delete`, {
          method: 'POST',
          headers: {
            'content-type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({ no: bno }),
        })
          .then((resp) => resp.text())
          .then((data) => {
            if (data == 1) {
              Swal.fire({
                title: '삭제되었습니다.',
                icon: 'success',
                draggable: true,
              });
              navigate('/admin/notice');
            } else {
              Swal.fire({
                icon: 'error',
                title: 'ERROR',
                text: '잠시후 다시 시도해주세요',
              });
            }
          });
      }
    });
  };

  return (
    <>
      <Title>공지사항 상세</Title>
      <LayDiv></LayDiv>
      <ContentDiv>
        <MinDiv>
          <div className="form-label">카테고리</div>
          <div className="form-input">공지</div>
          <div className="form-label">조회수</div>
          <div className="form-input">{boardVo.hit}</div>
          <div className="form-label">작성자</div>
          <div className="form-input">{boardVo.nick}</div>
          <div className="form-label">등록일</div>
          <div className="form-input">{boardVo.enrollDate}</div>
        </MinDiv>
        <InputDiv>
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
        <AttachDiv>
          <div className="form-label">첨부파일</div>
          <div className="form-input">
            <div className="attach-box">
              {f?.map((file, index) => (
                <span
                  key={index}
                  onClick={() => handleDownload(file.path, file.originName)}
                  style={{ cursor: 'pointer', color: 'blue', textDecoration: 'underline' }}
                >
                  {file.originName}&nbsp;&nbsp;&nbsp;
                </span>
              ))}
            </div>
          </div>
        </AttachDiv>
        {isAdmin ? (
          <ButtonDiv>
            <Btn str={'수정하기'} c={'#FF7F50'} fc={'#ffffff'} w={'100'} mr={'10'} f={handleNaviEditPage} />
            <Btn str={'삭제하기'} c={'#D9D9D9'} fc={'#3d4147'} w={'100'} f={handleDeleteHoneyTip} />
          </ButtonDiv>
        ) : (
          <ButtonDiv></ButtonDiv>
        )}
        <ThumbsupDiv></ThumbsupDiv>
        <ButtonDiv>
          <Btn str={'목록으로'} c={'lightgray'} fc={'black'} h={'40'} w={'120'} f={handleNaviList} />
        </ButtonDiv>
      </ContentDiv>
      <LayDiv />
    </>
  );
};

export default AdminNoticeDetail;
