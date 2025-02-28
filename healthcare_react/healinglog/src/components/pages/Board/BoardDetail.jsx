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
import { FaThumbsUp, FaStar } from 'react-icons/fa';
import Modal from '../../util/Modal';
import { useDispatch } from 'react-redux';
import { close, open } from '../../../redux/modalSlice';

//모달 안의 버튼 컨테이너
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
    /* height: 40px; */
  }
  & .form-input {
    display: flex;
    justify-content: start;
    align-items: center;
    box-sizing: border-box;
    width: 100%;
    /* height: 40px; */
    font-size: 14px;
    border: 1px solid #ccc;
    padding: 0px 8px;
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
const ThumbsupDiv = styled.div`
  display: flex;
  justify-content: center;
  align-items: end;
`;
const CommentWriteDiv = styled.div`
  width: 95%;
  border: 1px solid #ccc;
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
  border: 1px solid #ccc;
  display: grid;
  grid-template-rows: 15px 1fr;
`;
const SamhangDiv = styled.div`
  display: flex;
  justify-content: end;
  border-top: 1px solid #ccc;
`;
const CommentDiv = styled.div`
  display: grid;
  grid-template-columns: 1fr 7fr 1fr;
`;
const MiddleStartDiv = styled.div`
  display: flex;
  justify-content: center;
  align-items: start;
`;
const StartStartDiv = styled.div`
  display: flex;
  justify-content: start;
  align-items: start;
`;
const LayoutTextarea = styled.textarea`
  width: 90%;
  height: 70%;
  padding: 10px;
  border-radius: 10px;
  resize: none; /* 크기 조정 방지 */
`;
const StyledSpan = styled.span`
  cursor: pointer;
  color: darkgray;
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
  const [num, setNum] = useState(0);
  const [liked, setLiked] = useState(false);
  const [sendData, setSendData] = useState({ memberNo: '1', isLike: false, bno });
  const [sendReport, setSendReport] = useState({ memberNo: '2', boardNo: bno, reportType: '', commentNo: '' });
  const [sendComment, setSendComment] = useState({ memberNo: '1', boardNo: bno, content: '', no: '' });
  const [commentList, setCommentList] = useState([]);
  const [isEdit, setIsEdit] = useState({ edit: false, commentNo: '' });
  const [radio, setRadio] = useState();

  const dispatch = useDispatch();

  useEffect(() => {
    const fetchPost = async () => {
      try {
        const response = await fetch(`http://127.0.0.1:80/api/board/honeytip/detail?bno=${bno}&memberNo=1`);
        const data = await response.json();
        console.log('Fetched isRecommend:', data.isRecommend);
        const isRec = Number(data.isRecommend);
        // 서버에서 받은 추천 상태로 초기 상태 설정
        console.log(isRec);

        if (isRec === 1) {
          setLiked(true);
        }

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
    a.download = fileName || 'downloaded-file'; // 🔹 파일 이름 지정 가능
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
  };

  const handleLike = () => {
    const newLiked = !liked;
    setLiked(newLiked);
    setSendData((prev) => {
      const ssd = { ...prev, isLike: newLiked };
      countLike(ssd);
      return ssd;
    });
  };

  const countLike = (ssd) => [
    fetch('http://127.0.0.1:80/api/board/honeytip/recommend', {
      method: 'POST',
      headers: {
        'content-type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(ssd),
    })
      .then((resp) => resp.text())
      .then((data) => handleCountLike())
      .catch((err) => console.error(err)),
  ];

  const handleCountLike = () => {
    fetch('http://127.0.0.1:80/api/board/honeytip/countLike', {
      method: 'POST',
      headers: {
        'content-type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: bno,
    })
      .then((resp) => resp.json())
      .then((data) => {
        setBoardVo((prev) => {
          return {
            ...prev,
            recommendCount: data,
          };
        });
      });
  };

  const handleChange = (e) => {
    const rrr = e.target.value;

    setRadio(e.target.value);
  };

  const handleReportModalOpen = (e) => {
    setSendReport((prev) => {
      return {
        ...prev,
        commentNo: e.target.value,
      };
    });
    reset();
    dispatch(open({ title: '꿀팁댓글 신고', value: 'block' }));
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
        fetch('http://127.0.0.1:80/api/board/honeytip/report', {
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
        dispatch(close('게시글 신고'));
      }
    });
  };

  const handleNaviEditPage = () => {
    navigate(`/board/edit?bno=${bno}`);
  };
  const reset = () => {
    setSendReport({ memberNo: '2', boardNo: bno, reportType: '', commentNo: '' });
    setRadio('4');
  };
  const handleNaviList = () => {
    navigate('/board');
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
        fetch('http://127.0.0.1:80/api/board/honeytip/delete', {
          method: 'POST',
          headers: {
            'content-type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({ memberNo: '1', no: bno }),
        })
          .then((resp) => resp.text())
          .then((data) => {
            if (data == 1) {
              Swal.fire({
                title: '삭제되었습니다.',
                icon: 'success',
                draggable: true,
              });
              navigate('/board');
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
        fetch('http://127.0.0.1:80/api/board/honeytip/comment/write', {
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
        fetch('http://127.0.0.1:80/api/board/honeytip/comment/delete', {
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
        fetch('http://127.0.0.1:80/api/board/honeytip/comment/report', {
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
        dispatch(close('꿀팁댓글 신고'));
      }
    });
  };

  useEffect(() => {
    fetch(`http://127.0.0.1:80/api/board/honeytip/comment/list?bno=${bno}`, {})
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
      <Title>꿀팁 상세</Title>
      <LayDiv></LayDiv>
      <ContentDiv>
        <Modal title="게시글 신고">
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
              title={'게시글 신고'}
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
        <Modal title="꿀팁댓글 신고">
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
                  checked={radio == item.value} // ✅ 정확한 비교
                  onChange={handleChange}
                />
                <label htmlFor={item.id}>{item.label}</label>
                <br />
              </div>
            ))}
          </ModalDiv>
          <ModalContainer>
            <Btn
              title={'꿀팁댓글 신고'}
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
          <div className="form-label">추천수</div>
          <div className="form-input">{boardVo.recommendCount}</div>
          <div className="form-label">조회수</div>
          <div className="form-input">{boardVo.hit}</div>
          <div className="form-label">작성자</div>
          <div className="form-input">{boardVo.nick}</div>
          <div className="form-label">등록일</div>
          <div className="form-input">{boardVo.enrollDate}</div>
        </MinDiv>
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
        {boardVo.memberNo == 1 ? (
          <ButtonDiv>
            <Btn str={'수정하기'} c={'#FF7F50'} fc={'#ffffff'} h={'40'} w={'100'} mr={'10'} f={handleNaviEditPage} />
            <Btn str={'삭제하기'} c={'#D9D9D9'} fc={'#3d4147'} h={'40'} w={'100'} f={handleDeleteHoneyTip} />
          </ButtonDiv>
        ) : (
          <ReportDiv
            onClick={() => {
              console.log(sendReport);
              reset();
              dispatch(open({ title: '게시글 신고', value: 'block' }));
            }}
          >
            신고하기
          </ReportDiv>
        )}
        <ThumbsupDiv>
          <FaThumbsUp
            onClick={handleLike}
            style={{
              color: liked ? 'blue' : 'grey',
              cursor: 'pointer',
              fontSize: '48px',
            }}
          />
        </ThumbsupDiv>
        <ButtonDiv>
          <Btn str={'목록으로'} c={'lightgray'} fc={'black'} h={'40'} w={'120'} f={handleNaviList} />
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
        <CommentListDiv>
          {commentList?.map((vo) => {
            return (
              <>
                <SamhangDiv>
                  {vo.memberNo == '1' ? (
                    <>
                      <StyledSpan commentNo={vo.no} onClick={handleFetchDeleteComment}>
                        삭제하기
                      </StyledSpan>
                    </>
                  ) : (
                    <StyledSpan value={vo.no} onClick={handleReportModalOpen}>
                      신고하기
                    </StyledSpan>
                  )}
                </SamhangDiv>

                <CommentDiv>
                  <MiddleStartDiv>{vo.nick}</MiddleStartDiv>
                  <StartStartDiv>{vo.content}</StartStartDiv>
                  <MiddleStartDiv>{vo.enrollDate}</MiddleStartDiv>
                </CommentDiv>
              </>
            );
          })}
        </CommentListDiv>
      </ContentDiv>
      <LayDiv />
    </>
  );
};

export default BoardDetail;
