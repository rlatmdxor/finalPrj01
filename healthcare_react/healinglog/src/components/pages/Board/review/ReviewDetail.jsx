import Title from '../../../util/Title';
import styled from 'styled-components';
import Btn from '../../../util/Btn';
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
import { FaThumbsUp, FaStar } from 'react-icons/fa';
import Modal from '../../../util/Modal';
import { useDispatch } from 'react-redux';
import { close, open } from '../../../../redux/modalSlice';
import { isTokenExpired, getRoleFromToken } from '../../../util/JwtUtil';
import { BASE_URL } from '../../../services/config';

const ModalContainer = styled.div`
  display: flex;
  justify-content: end;
`;

const ContentDiv = styled.div`
  margin: 0;
  padding-left: 5%;
  width: 95%;
  display: grid;
  grid-template-rows: 40px 40px 1fr 50px 60px 105px 100px 140px;
`;

const InputDiv2 = styled.div`
  width: 95%;
  height: 40px;
  display: grid;
  grid-template-columns: 130px 170px 130px 1fr;
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
  grid-template-columns: 130px 170px 130px 150px 130px 1fr 100px 100px;
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
const CommentWriteDiv = styled.div`
  width: 95%;
  padding-left: 25px;
  display: grid;
  grid-template-columns: 7fr 1fr;
`;
const CommentTextArea = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
`;
const CommentBtnArea = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
`;
const CommentListDiv = styled.div`
  width: 95%;
  display: grid;
  grid-template-rows: 1fr;
  border-top: 1px solid #ccc;
`;

const CommentDiv = styled.div`
  display: grid;
  grid-template-columns: 1fr 7fr 0.85fr 0.5fr;
  min-height: 65px;
  border-bottom: 1px solid #ccc;
`;
const MiddleStartDiv = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;
const StartStartDiv = styled.div`
  display: flex;
  justify-content: start;
  align-items: center;
  margin: 15px;
`;
const LayoutTextarea = styled.textarea`
  width: 90%;
  height: 70%;
  padding: 10px;
  border-radius: 10px;
  resize: none; /* 크기 조정 방지 */
`;

const ModalDiv = styled.div``;

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
const DelDiv = styled.div`
  display: flex;
  justify-content: start;
  align-items: end;
  color: red;
  cursor: pointer;
`;

const TimeDiv = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
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

const ReviewDetail = () => {
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
  const [sendReport, setSendReport] = useState({ reviewNo: bno, reportType: '', commentNo: '' });
  const [sendComment, setSendComment] = useState({ reviewNo: bno, content: '', no: '' });
  const [commentList, setCommentList] = useState([]);
  const [radio, setRadio] = useState();
  const [userNo, setUserNo] = useState('');

  const dispatch = useDispatch();

  useEffect(() => {
    const fetchPost = async () => {
      try {
        const response = await fetch(`${BASE_URL}/api/review/detail?bno=${bno}`, {
          method: 'GET',
          headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` },
        });
        const data = await response.json();

        setUserNo(() => data.userNo);

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

  const handleChange = (e) => {
    setRadio(e.target.value);
  };

  const handleReportModalOpen = (e) => {
    const commentNo = e.target.getAttribute('value');
    setRadio('1');
    setSendReport((prev) => {
      return {
        ...prev,
        commentNo: commentNo,
      };
    });
    dispatch(open({ title: '리뷰댓글 신고', value: 'block' }));
  };

  const handleBoardReport = () => {
    setSendReport((prev) => {
      const ssr = { ...prev, reportType: radio };
      handleSubmit(ssr);
      return ssr;
    });
  };

  const handleSubmit = (ssr) => {
    Swal.fire({
      title: '신고하시겠습니까?',
      icon: 'question',
      showCancelButton: true,
      confirmButtonText: '확인',
      cancelButtonText: '취소',
    }).then((result) => {
      if (result.isConfirmed) {
        fetch(`${BASE_URL}/api/review/report`, {
          method: 'POST',
          headers: {
            'content-type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(ssr),
        })
          .then((resp) => resp.text())
          .then((data) => {
            if (data == 1) {
              Swal.fire({
                title: '신고되었습니다.',
                icon: 'success',
                draggable: true,
              });
              reset();
            } else {
              Swal.fire({
                icon: 'error',
                title: 'ERROR',
                text: '지정되지 않은 신고항목',
              });
            }
          });
        dispatch(close('병원 리뷰 신고'));
      }
    });
  };

  const handleNaviEditPage = () => {
    navigate(`/review/edit?bno=${bno}`);
  };
  const reset = () => {
    setSendReport({ memberNo: '', reviewNo: bno, reportType: '', commentNo: '' });
    setRadio('1');
  };
  const handleNaviList = () => {
    navigate('/review');
  };
  const handleNaviAdminList = () => {
    navigate('/admin/review');
  };

  const handleDeleteReview = () => {
    Swal.fire({
      title: '삭제하시겠습니까?',
      icon: 'question',
      showCancelButton: true,
      confirmButtonText: '확인',
      cancelButtonText: '취소',
    }).then((result) => {
      if (result.isConfirmed) {
        fetch(`${BASE_URL}/api/review/delete`, {
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
              if (isAdmin) {
                navigate('/admin/review');
              }
              if (!isAdmin) {
                navigate('/review');
              }
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

  const handleEnrollComment = (e) => {
    Swal.fire({
      title: '댓글을 등록하시겠습니까??',
      icon: 'question',
      showCancelButton: true,
      confirmButtonText: '확인',
      cancelButtonText: '취소',
    }).then((result) => {
      if (result.isConfirmed) {
        fetch(`${BASE_URL}/api/review/comment/write`, {
          method: 'POST',
          headers: {
            'content-type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(sendComment),
        })
          .then((resp) => resp.text())
          .then((data) => {
            if (data == 1) {
              Swal.fire({
                title: '등록되었습니다.',
                icon: 'success',
                draggable: true,
              });
              setNum((prev) => prev + 1);
              setSendComment((prev) => {
                return {
                  ...prev,
                  content: '',
                };
              });
            } else if (data == 0) {
              Swal.fire({
                icon: 'error',
                title: 'ERROR',
                text: '내용을 입력해주세요',
              });
            } else {
              Swal.fire({
                icon: 'error',
                title: 'ERROR',
                text: '등록 실패',
              });
            }
          });
      }
    });
  };

  const handleFetchDeleteComment = (e) => {
    const commentNo = e.target.getAttribute('commentno');

    setSendComment((prev) => {
      const updatedComment = { ...prev, no: commentNo };
      fetchDeleteComment(updatedComment);
      return updatedComment;
    });
  };

  const fetchDeleteComment = (updatedComment) => {
    Swal.fire({
      title: '댓글을 삭제하시겠습니까?',
      icon: 'question',
      showCancelButton: true,
      confirmButtonText: '확인',
      cancelButtonText: '취소',
    }).then((result) => {
      if (result.isConfirmed) {
        fetch(`${BASE_URL}/api/review/comment/delete`, {
          method: 'POST',
          headers: {
            'content-type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(updatedComment),
        })
          .then((resp) => resp.text())
          .then((data) => {
            if (data == 1) {
              Swal.fire({
                title: '삭제되었습니다.',
                icon: 'success',
                draggable: true,
              });
              setNum((prev) => prev - 1);
            } else {
              Swal.fire({
                icon: 'error',
                title: 'ERROR',
                text: '삭제 실패',
              });
            }
          });
        setSendComment((prev) => {
          return {
            ...prev,
            content: '',
          };
        });
      }
    });
  };

  const handleCommentReport = () => {
    setSendReport((prev) => {
      const ssr = { ...prev, reportType: radio };
      handleReportComment(ssr);
      return ssr;
    });
  };

  const handleReportComment = (ssr) => {
    Swal.fire({
      title: '신고하시겠습니까?',
      icon: 'question',
      showCancelButton: true,
      confirmButtonText: '확인',
      cancelButtonText: '취소',
    }).then((result) => {
      if (result.isConfirmed) {
        fetch(`${BASE_URL}/api/review/comment/report`, {
          method: 'POST',
          headers: {
            'content-type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(ssr),
        })
          .then((resp) => resp.text())
          .then((data) => {
            if (data == 1) {
              Swal.fire({
                title: '신고되었습니다.',
                icon: 'success',
                draggable: true,
              });
              reset();
            } else {
              Swal.fire({
                icon: 'error',
                title: 'ERROR',
                text: '지정되지 않은 신고항목',
              });
            }
          });
        dispatch(close('리뷰댓글 신고'));
      }
    });
  };

  useEffect(() => {
    fetch(`${BASE_URL}/api/review/comment/list?bno=${bno}`, {
      method: 'GET',
      headers: {
        'content-type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    })
      .then((resp) => resp.json())
      .then((data) => setCommentList(() => data));
  }, [num]);

  const handleChangeSendComment = (e) => {
    setSendComment((prev) => {
      return {
        ...prev,
        content: e.target.value,
      };
    });
  };
  return (
    <>
      <Title>리뷰 상세</Title>
      <LayDiv></LayDiv>
      <ContentDiv>
        <Modal title="병원 리뷰 신고">
          <ModalDiv>
            {[
              { id: 'reason1', value: '1', label: '성적인 콘텐츠' },
              { id: 'reason2', value: '2', label: '폭력적 또는 혐오스러운 콘텐츠' },
              { id: 'reason3', value: '3', label: '증오 또는 악의적인 콘텐츠' },
              { id: 'reason4', value: '4', label: '괴롭힘 또는 폭력' },
              { id: 'reason5', value: '5', label: '유해하거나 위험한 행위' },
              { id: 'reason6', value: '6', label: '잘못된 정보' },
              { id: 'reason7', value: '7', label: '아동 학대' },
              { id: 'reason8', value: '8', label: '스팸 또는 혼동을 야기하는 콘텐츠' },
              { id: 'reason9', value: '9', label: '법적 문제' },
            ].map((item) => (
              <div key={item.id}>
                <input
                  type="radio"
                  id={item.id}
                  name="reportReason"
                  value={item.value}
                  checked={radio == item.value}
                  onChange={handleChange}
                />
                <label htmlFor={item.id}>{item.label}</label>
                <br />
              </div>
            ))}
          </ModalDiv>

          <ModalContainer>
            <Btn
              title={'병원 리뷰 신고'}
              f={handleBoardReport}
              mt={'10'}
              mb={'20'}
              mr={'-10'}
              c={'#FF7F50'}
              fc={'white'}
              str={'신고'}
            ></Btn>
          </ModalContainer>
        </Modal>
        <Modal title="리뷰댓글 신고">
          <ModalDiv>
            {[
              { id: 'reason11', value: '1', label: '성적인 콘텐츠' },
              { id: 'reason21', value: '2', label: '폭력적 또는 혐오스러운 콘텐츠' },
              { id: 'reason31', value: '3', label: '증오 또는 악의적인 콘텐츠' },
              { id: 'reason41', value: '4', label: '괴롭힘 또는 폭력' },
              { id: 'reason51', value: '5', label: '유해하거나 위험한 행위' },
              { id: 'reason61', value: '6', label: '잘못된 정보' },
              { id: 'reason71', value: '7', label: '아동 학대' },
              { id: 'reason81', value: '8', label: '스팸 또는 혼동을 야기하는 콘텐츠' },
              { id: 'reason91', value: '9', label: '법적 문제' },
            ].map((item) => (
              <div key={item.id}>
                <input
                  type="radio"
                  id={item.id}
                  name="reportReasonzzz"
                  value={item.value}
                  checked={radio == item.value}
                  onChange={handleChange}
                />
                <label htmlFor={item.id}>{item.label}</label>
                <br />
              </div>
            ))}
          </ModalDiv>
          <ModalContainer>
            <Btn
              title={'리뷰댓글 신고'}
              f={handleCommentReport}
              mt={'10'}
              mb={'20'}
              mr={'-10'}
              c={'#FF7F50'}
              fc={'white'}
              str={'신고'}
            ></Btn>
          </ModalContainer>
        </Modal>
        <MinDiv>
          <div className="form-label">방문시간</div>
          <div className="form-input">{boardVo.visitDate}</div>
          <div className="form-label">진료과</div>
          <div className="form-input">{boardVo.department}</div>
          <div className="form-label">병원명</div>
          <div className="form-input">{boardVo.name}</div>
          <div className="form-label">작성자</div>
          <div className="form-input">{boardVo.nick}</div>
        </MinDiv>
        <InputDiv2>
          <div className="form-label">별점</div>
          <div className="form-input">
            {' '}
            {[1, 2, 3, 4, 5].map((value) => (
              <FaStar
                key={value}
                style={{
                  color: boardVo.rating >= value ? 'gold' : 'grey',
                  cursor: 'pointer',
                  fontSize: '24px',
                  marginRight: '4px',
                }}
              />
            ))}
          </div>
          <div className="form-label">제목</div>
          <div className="form-input">{boardVo.title}</div>
        </InputDiv2>

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
            <Btn str={'삭제하기'} c={'#D9D9D9'} fc={'#3d4147'} w={'100'} f={handleDeleteReview} />
          </ButtonDiv>
        ) : boardVo.memberNo == userNo ? (
          <ButtonDiv>
            <Btn str={'수정하기'} c={'#FF7F50'} fc={'#ffffff'} w={'100'} mr={'10'} f={handleNaviEditPage} />
            <Btn str={'삭제하기'} c={'#D9D9D9'} fc={'#3d4147'} w={'100'} f={handleDeleteReview} />
          </ButtonDiv>
        ) : (
          <ReportDiv
            onClick={() => {
              reset();
              dispatch(open({ title: '병원 리뷰 신고', value: 'block' }));
            }}
          >
            신고하기
          </ReportDiv>
        )}
        <ThumbsupDiv></ThumbsupDiv>
        <ButtonDiv>
          {isAdmin ? (
            <Btn str={'목록으로'} c={'lightgray'} fc={'black'} h={'40'} w={'120'} f={handleNaviAdminList} />
          ) : (
            <Btn str={'목록으로'} c={'lightgray'} fc={'black'} h={'40'} w={'120'} f={handleNaviList} />
          )}
        </ButtonDiv>
        <CommentWriteDiv>
          <CommentTextArea>
            <LayoutTextarea
              name="content"
              onChange={handleChangeSendComment}
              value={sendComment.content}
            ></LayoutTextarea>
          </CommentTextArea>
          <CommentBtnArea>
            <Btn str={'등록하기'} c={'#d3ebcf'} fc={'black'} h={'80'} w={'100'} f={handleEnrollComment} />
          </CommentBtnArea>
        </CommentWriteDiv>
        <LayDiv />
        <LayDiv />
        <CommentListDiv>
          {commentList?.map((vo) => {
            return (
              <>
                <CommentDiv>
                  <MiddleStartDiv>{vo.nick}</MiddleStartDiv>
                  <StartStartDiv>{vo.content}</StartStartDiv>
                  <TimeDiv>{vo.enrollDate}</TimeDiv>
                  {vo.memberNo == userNo || isAdmin ? (
                    <>
                      <DelDiv commentNo={vo.no} onClick={handleFetchDeleteComment}>
                        삭제하기
                      </DelDiv>
                    </>
                  ) : (
                    <DelDiv value={vo.no} onClick={handleReportModalOpen}>
                      신고하기
                    </DelDiv>
                  )}
                </CommentDiv>
              </>
            );
          })}
        </CommentListDiv>
      </ContentDiv>
      <LayDiv />
      <LayDiv />
      <LayDiv />
    </>
  );
};

export default ReviewDetail;
