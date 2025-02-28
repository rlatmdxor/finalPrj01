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
import { getBannerList, enrollBanner, editBanner, deleteBanner } from '../../services/bannerService';

const ButtonAreaDiv = styled.div`
  display: flex;
  justify-content: flex-end;
  align-items: center;
  gap: 10px;
`;

const TableAreaDiv = styled.div`
  margin-top: 30px;
`;

const TitleTd = styled.td`
  max-width: 450px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
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
  margin-top: 19px;
  margin-bottom: 5px;
`;

const ModalContentSmallText = styled.div`
  margin-top: 7px;
  margin-bottom: 4px;
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
  width: 99%;
  object-fit: contain;
`;

const DeleteImgBtn = styled.button`
  background-color: transparent;
  border: none;
  color: #363636;
  cursor: pointer;
`;

const AdminBanner = () => {
  const token = localStorage.getItem('token');
  const Swal = require('sweetalert2');

  const boardType = 'bannerManagement';

  const dispatch = useDispatch();

  const [bannerList, setBannerList] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isAllSelected, setIsAllSelected] = useState(false);

  const currentPage = useSelector((state) => state.paging[boardType]?.currentPage || 1);
  const boardLimit = useSelector((state) => state.paging[boardType]?.boardLimit || 12);
  const offset = (currentPage - 1) * boardLimit;

  const initialInputData = {
    no: '',
    writer: '1',
    title: '',
    showYn: 'Y',
    imageUrl: '',
    imagePreview: '',
  };
  const [inputData, setInputData] = useState(initialInputData);

  const enrollImgRef = useRef(null);
  const editImgRef = useRef(null);

  const getFetch = async () => {
    try {
      const data = await getBannerList(token);
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
    getFetch();
  }, [currentPage, boardLimit]);

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
      writer: vo.writer || '1',
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
        title: '배너명을 입력해주세요.',
        confirmButtonText: '확인',
      });
      return;
    }

    if (!inputData.imageUrl || inputData.imageUrl.length === 0) {
      Swal.fire({
        title: '배너사진을 선택해주세요.',
        confirmButtonText: '확인',
      });
      return;
    }

    Swal.fire({
      title: '등록하시겠습니까?',
      showCancelButton: true,
      confirmButtonText: '확인',
      cancelButtonText: '취소',
    }).then((result) => {
      if (result.isConfirmed) {
        const formData = new FormData();
        formData.append('writer', inputData.writer);
        formData.append('title', inputData.title);
        formData.append('showYn', inputData.showYn);
        formData.append('f', inputData.imageUrl);

        const enrollBannerFetch = async () => {
          try {
            const result = await enrollBanner(formData, token);
            if (result == 200) {
              Swal.fire({
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
          getFetch();
        };
        enrollBannerFetch();
      }
    });
  };

  const handleAllCheckBoxClick = () => {};

  const handleEdit = () => {
    if (!inputData.title || inputData.title.length === 0) {
      Swal.fire({
        title: '배너명을 입력해주세요.',
        confirmButtonText: '확인',
      });
      return;
    }

    if (!inputData.imageUrl || inputData.imageUrl.length === 0) {
      Swal.fire({
        title: '배너사진을 선택해주세요.',
        confirmButtonText: '확인',
      });
      return;
    }

    Swal.fire({
      title: '저장하시겠습니까?',
      showCancelButton: true,
      confirmButtonText: '확인',
      cancelButtonText: '취소',
    }).then((result) => {
      if (result.isConfirmed) {
        const formData = new FormData();
        formData.append('no', inputData.no);
        formData.append('title', inputData.title);
        formData.append('showYn', inputData.showYn);
        formData.append('f', inputData.imageUrl);

        const editBannerFetch = async () => {
          try {
            const result = await editBanner(formData, token);
            if (result == 200) {
              Swal.fire({
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
          getFetch();
        };
        editBannerFetch();
      }
    });
  };

  const handleDelete = () => {
    console.log(inputData.no);
    Swal.fire({
      title: '삭제하시겠습니까?',
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
          getFetch();
        };
        deleteBannerFetch();
      }
    });
  };

  return (
    <>
      <Title>배너 관리</Title>
      <ContentLayout>
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
                  <input type="checkbox" onClick={handleAllCheckBoxClick} />
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
                    <td>
                      <input type="checkbox" />
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
            <Btn str={'삭제'} mr={'0'} f={''} />
          </ButtonAreaDiv>
        </BottomAreaDiv>

        <Modal title="배너 등록">
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
          <ModalContentText>노출여부</ModalContentText>
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
          <ModalContentText>배너사진</ModalContentText>
          <ModalContentSmallText>* 적정 사이즈 : 1380 * 500 px</ModalContentSmallText>
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
          <ModalContentText>노출여부</ModalContentText>
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
          <ModalContentText>배너사진</ModalContentText>
          <ModalContentSmallText>* 적정 사이즈 : 1380 * 500 px</ModalContentSmallText>
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
