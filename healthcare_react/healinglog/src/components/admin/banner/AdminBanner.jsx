import React, { useEffect, useRef, useState } from 'react';
import Title from '../../util/Title';
import styled from 'styled-components';
import ContentLayout from '../../util/ContentLayout';
import Table from '../../util/Table';
import { resetPaging, setTotalCount } from '../../../redux/pagingSlice';
import Pagination from '../../util/Pagination';
import Btn from '../../util/Btn';
import { useDispatch, useSelector } from 'react-redux';
import Modal from '../../util/Modal';
import Input from '../../util/Input';
import { open, close } from '../../../redux/modalSlice';
import { getBannerList, enrollBanner, editBanner, deleteBanner, multiDeleteBanner } from '../../services/bannerService';
import SearchBar from '../../util/SearchBar';
import { useNavigate } from 'react-router-dom';
import { getRoleFromToken, isTokenExpired } from '../../util/JwtUtil';

const SearchDiv = styled.div`
  display: flex;
  justify-content: end;
  gap: 5px;
  align-items: center;
  margin-top: 10px;
  margin-bottom: 7px;
`;

const SelectBox = styled.select`
  width: ${(props) => props.width || '100px'};
  height: 40px;
  padding: 8px;
  border: 1px solid #ccc;
  border-radius: 4px;
  margin: 0px 3px;
  &:focus {
    border-color: #007bff;
    outline: none;
  }
`;

const ButtonAreaDiv = styled.div`
  display: flex;
  justify-content: flex-end;
  align-items: center;
  gap: 10px;
`;

const TableAreaDiv = styled.div``;

const TitleTd = styled.td`
  width: 430px;
  max-width: 430px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  text-align: left;
`;

const BottomAreaDiv = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
`;

const ModalContainer = styled.div`
  display: flex;
  justify-content: end;
  gap: 10px;
  margin-top: 10px;
`;

const ModalContentText = styled.div`
  margin-top: 20px;
  margin-bottom: 6px;
`;

const ModalContentSmallText = styled.div`
  margin-top: 7px;
  margin-bottom: 6px;
  font-size: 13px;
  color: blue;
`;

const ModalRadioBtnDiv = styled.div`
  display: flex;
  gap: 5px;
  margin-top: 8px;
  margin-bottom: 20px;
`;

const FileInput = styled.input`
  margin-top: 5px;
  margin-bottom: 15px;
`;

const PreviewDiv = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: flex-start;
  align-items: flex-start;
  margin-bottom: 5px;
`;

const UploadedImg = styled.img`
  width: 98%;
  object-fit: contain;
`;

const DeleteImgBtn = styled.button`
  background-color: transparent;
  border: none;
  color: #363636;
  cursor: pointer;
`;

const RequiredMark = styled.span`
  color: red;
`;

const AdminBanner = () => {
  const navi = useNavigate();
  const Swal = require('sweetalert2');

  const token = localStorage.getItem('token');
  const [isAuthorized, setIsAuthorized] = useState(false); // 로그인 여부 체크

  useEffect(() => {
    if (!token || isTokenExpired(token) || getRoleFromToken(token) !== 'ROLE_ADMIN') {
      navi('/admin/login'); // 로그인 페이지로 이동
      Swal.fire({
        icon: 'warning',
        title: '어드민 로그인이 필요합니다',
        text: '어드민 로그인 후 이용해주세요',
        confirmButtonText: '확인',
      });
      window.localStorage.removeItem('token'); // 토큰 삭제
    } else {
      setIsAuthorized(true); // 로그인 성공 시 데이터 요청 가능
    }
  }, [navi, token]);

  const boardType = 'bannerManagement';

  const dispatch = useDispatch();

  const [bannerList, setBannerList] = useState([]);
  const [selectedNo, setSelectedNo] = useState([]);
  const [isAllSelected, setIsAllSelected] = useState(false);

  const initstate = {
    showYn: '',
    searchValue: '',
  };
  const [searchInput, setSearchInput] = useState(initstate);

  const currentPage = useSelector((state) => state.paging[boardType]?.currentPage || 1);
  const boardLimit = useSelector((state) => state.paging[boardType]?.boardLimit || 12);
  const offset = (currentPage - 1) * boardLimit;

  const initialInputData = {
    no: '',
    title: '',
    showYn: 'Y',
    imageUrl: '',
    imagePreview: '',
  };
  const [inputData, setInputData] = useState(initialInputData);

  const enrollImgRef = useRef(null);
  const editImgRef = useRef(null);

  const getFetch = async (showYn, searchValue) => {
    try {
      const data = await getBannerList(showYn, searchValue, token);
      if (data.length > 0) {
        dispatch(setTotalCount({ boardType, totalCount: data.length }));
        const pagedData = data.slice(offset, offset + boardLimit);
        setBannerList(pagedData);
      } else {
        dispatch(resetPaging({ boardType }));
        setBannerList([]);
      }
    } catch (error) {
      console.error('[ERROR] GET DASHBOARD DATA FAIL', error);
    }
  };

  useEffect(() => {
    if (!isAuthorized) {
      return;
    }
    getFetch(searchInput.showYn, searchInput.searchValue);
  }, [isAuthorized, token, currentPage, boardLimit]);

  const handleOpenModal = () => {
    setInputData(initialInputData);
    if (enrollImgRef.current) {
      enrollImgRef.current.value = '';
    }
    dispatch(open({ title: '배너 등록', value: 'block' }));
  };

  const handleOpenDetailModal = (no) => {
    const vo = bannerList.find((vo) => vo.no === no);
    setInputData((prev) => ({
      ...prev,
      no: vo.no,
      title: vo.title,
      showYn: vo.showYn,
      imageUrl: vo.imageUrl || '',
      imagePreview: vo.imageUrl ? vo.imageUrl : '',
    }));
    dispatch(open({ title: '배너 수정', value: 'block' }));
  };

  const handleInputChange = (e) => {
    setInputData((prev) => {
      return {
        ...prev,
        [e.target.name]: e.target.value,
      };
    });
  };

  const handleImageChange = (imgRef) => {
    const file = imgRef.current.files[0];

    if (!file) {
      return;
    }

    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onloadend = () => {
      setInputData((prev) => {
        return {
          ...prev,
          imageUrl: file,
          imagePreview: reader.result,
        };
      });
    };
  };

  const handleImageDelete = (imgRef) => {
    setInputData((prev) => ({
      ...prev,
      imageUrl: '',
      imagePreview: '',
    }));
    imgRef.current.value = '';
  };

  const handleSubmit = () => {
    if (!inputData.title || inputData.title.length === 0) {
      Swal.fire({
        icon: 'warning',
        title: '배너명을 입력해주세요.',
        confirmButtonText: '확인',
      });
      return;
    }

    if (!inputData.imageUrl || inputData.imageUrl.length === 0) {
      Swal.fire({
        icon: 'warning',
        title: '배너사진을 선택해주세요.',
        confirmButtonText: '확인',
      });
      return;
    }

    Swal.fire({
      title: '등록하시겠습니까?',
      icon: 'question',
      showCancelButton: true,
      confirmButtonText: '확인',
      cancelButtonText: '취소',
    }).then((result) => {
      if (result.isConfirmed) {
        const formData = new FormData();
        formData.append('title', inputData.title);
        formData.append('showYn', inputData.showYn);
        formData.append('f', inputData.imageUrl);

        const enrollBannerFetch = async () => {
          try {
            const result = await enrollBanner(formData, token);
            if (result == 200) {
              Swal.fire({
                icon: 'success',
                title: '등록되었습니다.',
                confirmButtonText: '확인',
              });
            } else {
              Swal.fire({
                title: '오류발생...',
                confirmButtonText: '확인',
              });
            }
          } catch (error) {
            console.error('[ERROR] ENROLL BANNER FAIL', error);
          }
          dispatch(close('배너 등록'));
          dispatch(resetPaging({ boardType }));
          getFetch(searchInput.showYn, searchInput.searchValue);
        };
        enrollBannerFetch();
      }
    });
  };

  const handleEdit = () => {
    if (!inputData.title || inputData.title.length === 0) {
      Swal.fire({
        icon: 'warning',
        title: '배너명을 입력해주세요.',
        confirmButtonText: '확인',
      });
      return;
    }

    if (!inputData.imageUrl || inputData.imageUrl.length === 0) {
      Swal.fire({
        icon: 'warning',
        title: '배너사진을 선택해주세요.',
        confirmButtonText: '확인',
      });
      return;
    }

    Swal.fire({
      title: '저장하시겠습니까?',
      icon: 'question',
      showCancelButton: true,
      confirmButtonText: '확인',
      cancelButtonText: '취소',
    }).then((result) => {
      if (result.isConfirmed) {
        const formData = new FormData();
        formData.append('no', inputData.no);
        formData.append('title', inputData.title);
        formData.append('showYn', inputData.showYn);

        if (typeof inputData.imageUrl === 'string') {
          formData.append('imageUrl', inputData.imageUrl); // 기존 이미지 URL 유지
        } else if (inputData.imageUrl) {
          formData.append('f', inputData.imageUrl); // 새 이미지 업로드
        }

        const editBannerFetch = async () => {
          try {
            const result = await editBanner(formData, token);
            if (result == 200) {
              Swal.fire({
                icon: 'success',
                title: '수정되었습니다.',
                confirmButtonText: '확인',
              });
            } else {
              Swal.fire({
                title: '오류발생...',
                confirmButtonText: '확인',
              });
            }
          } catch (error) {
            console.error('[ERROR] EDIT BANNER FAIL', error);
          }
          dispatch(close('배너 수정'));
          getFetch(searchInput.showYn, searchInput.searchValue);
        };
        editBannerFetch();
      }
    });
  };

  const handleDelete = () => {
    console.log(inputData.no);
    Swal.fire({
      title: '삭제하시겠습니까?',
      icon: 'question',
      showCancelButton: true,
      confirmButtonText: '확인',
      cancelButtonText: '취소',
    }).then((result) => {
      if (result.isConfirmed) {
        const deleteBannerFetch = async () => {
          try {
            const result = await deleteBanner(inputData.no, token);
            if (result == 200) {
              Swal.fire({
                icon: 'success',
                title: '삭제되었습니다.',
                confirmButtonText: '확인',
              });
            } else {
              Swal.fire({
                title: '오류발생...',
                confirmButtonText: '확인',
              });
            }
          } catch (error) {
            console.error('[ERROR] EDIT BANNER FAIL', error);
          }
          dispatch(close('배너 수정'));
          getFetch(searchInput.showYn, searchInput.searchValue);
        };
        deleteBannerFetch();
      }
    });
  };

  useEffect(() => {
    setIsAllSelected(selectedNo.length > 0 && selectedNo.length === bannerList.length);
  }, [selectedNo, bannerList]);

  const handleCheckboxClick = (no) => {
    setSelectedNo((prev) => {
      const updatedSelection = prev.includes(no) ? prev.filter((item) => item !== no) : [...prev, no];
      return updatedSelection;
    });
  };
  const handleAllCheckBoxClick = () => {
    if (isAllSelected) {
      setSelectedNo([]);
    } else {
      setSelectedNo(bannerList.map((vo) => vo.no));
    }
  };

  const handleMultiDeleteClick = () => {
    if (!selectedNo || selectedNo?.length === 0) {
      Swal.fire({
        icon: 'warning',
        title: '선택된 건이 없습니다.',
        confirmButtonText: '확인',
      });
      return;
    }

    Swal.fire({
      title: '삭제하시겠습니까?',
      icon: 'question',
      showCancelButton: true,
      confirmButtonText: '확인',
      cancelButtonText: '취소',
    }).then((result) => {
      if (result.isConfirmed) {
        const multiDeleteBannerFetch = async () => {
          try {
            const result = await multiDeleteBanner(selectedNo, token);
            if (result == 200) {
              Swal.fire({
                icon: 'success',
                title: '삭제되었습니다.',
                confirmButtonText: '확인',
              });
            } else {
              Swal.fire({
                title: '오류발생...',
                confirmButtonText: '확인',
              });
            }
          } catch (error) {
            console.error('[ERROR] MULTI DELETE BANNER FAIL', error);
          }
          setSelectedNo([]);
          setIsAllSelected(false);
          getFetch(searchInput.showYn, searchInput.searchValue);
        };
        multiDeleteBannerFetch();
      }
    });
  };

  const searchFilter = {
    showYn: ['노출여부 전체', 'Y', 'N'],
  };

  const handleFilter = (e, searchValue) => {
    setSearchInput((prev) => {
      return {
        ...prev,
        showYn: e.target.value,
      };
    });
    dispatch(resetPaging({ boardType }));
    getFetch(e.target.value, searchValue);
  };

  const handleChange = (e) => {
    setSearchInput((prev) => {
      return {
        ...prev,
        searchValue: e.target.value,
      };
    });
  };

  const handleClearClick = () => {
    setSearchInput((prev) => {
      return {
        ...prev,
        showYn: '노출여부 전체',
        searchValue: '',
      };
    });
    dispatch(resetPaging({ boardType }));
    getFetch('노출여부 전체', '');
  };

  const handleClick = (e, showYn, searchValue) => {
    dispatch(resetPaging({ boardType }));
    getFetch(showYn, searchValue);
  };

  return (
    <>
      <Title>배너 관리</Title>
      <ContentLayout>
        <SearchDiv>
          <SelectBox
            width={'120'}
            value={searchInput.showYn}
            onChange={(e) => {
              handleFilter(e, searchInput.searchValue);
            }}
          >
            {searchFilter.showYn.map((option, idx) => (
              <option key={idx} value={option} name={option}>
                {option}
              </option>
            ))}
          </SelectBox>
          <SearchBar
            value={searchInput.searchValue}
            handleChange={handleChange}
            handleClearClick={handleClearClick}
            handleClick={(e) => {
              handleClick(e, searchInput.showYn, searchInput.searchValue);
            }}
          />
        </SearchDiv>
        <TableAreaDiv>
          <Table>
            <thead>
              <tr>
                <th>번호</th>
                <th>배너명</th>
                <th>노출여부</th>
                <th>작성자</th>
                <th>등록일자</th>
                <th>
                  <input type="checkbox" checked={isAllSelected} onChange={handleAllCheckBoxClick} />
                </th>
              </tr>
            </thead>
            <tbody>
              {bannerList.map((vo) => {
                return (
                  <tr key={vo.no} onClick={() => handleOpenDetailModal(vo.no)}>
                    <td>{vo.no}</td>
                    <TitleTd>{vo.title}</TitleTd>
                    <td>{vo.showYn}</td>
                    <td>{vo.nick}</td>
                    <td>{vo.enrollDate}</td>
                    <td onClick={(e) => e.stopPropagation()}>
                      <input
                        type="checkbox"
                        checked={selectedNo.includes(vo.no)}
                        onChange={() => {
                          handleCheckboxClick(vo.no);
                        }}
                      />
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </Table>
        </TableAreaDiv>
        <BottomAreaDiv>
          <div></div>
          <Pagination boardType={boardType} />
          <ButtonAreaDiv>
            <Btn str={'등록'} c={'#FF7F50'} fc={'#ffffff'} mr={'0'} f={handleOpenModal} />
            <Btn str={'삭제'} mr={'0'} f={handleMultiDeleteClick} />
          </ButtonAreaDiv>
        </BottomAreaDiv>

        <Modal title="배너 등록">
          <RequiredMark>* </RequiredMark>
          <Input
            type="text"
            name="title"
            value={inputData.title}
            title="배너명"
            size={'size2'}
            mb={'14'}
            mt={'7'}
            min={0}
            f={handleInputChange}
          />
          <ModalContentText>
            <RequiredMark>* </RequiredMark>노출여부
          </ModalContentText>
          <ModalRadioBtnDiv>
            <input
              type="radio"
              name="showYn"
              value="Y"
              checked={inputData.showYn === 'Y'}
              onChange={handleInputChange}
            />
            Y
            <input
              type="radio"
              name="showYn"
              value="N"
              checked={inputData.showYn === 'N'}
              onChange={handleInputChange}
            />
            N
          </ModalRadioBtnDiv>
          <ModalContentText>
            <RequiredMark>* </RequiredMark>배너사진
          </ModalContentText>
          <ModalContentSmallText>적정 사이즈 : 1380 * 500 px</ModalContentSmallText>
          <FileInput type="file" accept="image/*" onChange={() => handleImageChange(enrollImgRef)} ref={enrollImgRef} />
          <PreviewDiv>
            {inputData.imageUrl ? (
              <>
                <UploadedImg src={inputData.imagePreview} alt="이미지" />
                <DeleteImgBtn onClick={() => handleImageDelete(enrollImgRef)}>✖</DeleteImgBtn>
              </>
            ) : (
              ''
            )}
          </PreviewDiv>
          <ModalContainer>
            <Btn
              title={'배너 등록'}
              str={'등록'}
              mt={'17'}
              mb={'30'}
              mr={'0'}
              c={'#ff8a60'}
              fc={'white'}
              f={handleSubmit}
            ></Btn>
          </ModalContainer>
        </Modal>

        <Modal title="배너 수정">
          <RequiredMark>* </RequiredMark>
          <Input
            type="text"
            name="title"
            value={inputData.title}
            title="배너명"
            size={'size2'}
            mb={'14'}
            mt={'7'}
            min={0}
            f={handleInputChange}
          />
          <ModalContentText>
            <RequiredMark>* </RequiredMark>노출여부
          </ModalContentText>
          <ModalRadioBtnDiv>
            <input
              type="radio"
              name="editShowYn"
              value="Y"
              checked={inputData.showYn === 'Y'}
              onChange={(e) => setInputData((prev) => ({ ...prev, showYn: e.target.value }))}
            />
            Y
            <input
              type="radio"
              name="editShowYn"
              value="N"
              checked={inputData.showYn === 'N'}
              onChange={(e) => setInputData((prev) => ({ ...prev, showYn: e.target.value }))}
            />
            N
          </ModalRadioBtnDiv>
          <ModalContentText>
            <RequiredMark>* </RequiredMark>배너사진
          </ModalContentText>
          <ModalContentSmallText>적정 사이즈 : 1380 * 500 px</ModalContentSmallText>
          <FileInput type="file" accept="image/*" onChange={() => handleImageChange(editImgRef)} ref={editImgRef} />
          <PreviewDiv>
            {inputData.imageUrl ? (
              <>
                <UploadedImg src={inputData.imagePreview} alt="이미지" />
                <DeleteImgBtn onClick={() => handleImageDelete(editImgRef)}>✖</DeleteImgBtn>
              </>
            ) : (
              ''
            )}
          </PreviewDiv>
          <ModalContainer>
            <Btn
              title={'배너 수정'}
              str={'저장'}
              mt={'17'}
              mb={'30'}
              mr={'0'}
              c={'#ff8a60'}
              fc={'white'}
              f={handleEdit}
            ></Btn>
            <Btn title={'배너 삭제'} str={'삭제'} mt={'17'} mb={'30'} mr={'0'} f={handleDelete}></Btn>
          </ModalContainer>
        </Modal>
      </ContentLayout>
    </>
  );
};

export default AdminBanner;
