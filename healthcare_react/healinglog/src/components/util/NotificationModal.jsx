import React, { useRef } from 'react';
import styled from 'styled-components';
import { useDispatch, useSelector } from 'react-redux';
import { close } from '../../redux/modalSlice';

const NotificationModal = ({ children, title, width }) => {
  const dispatch = useDispatch();
  const contentRef = useRef(null);
  const { modals } = useSelector((state) => state.modal);

  // 현재 모달이 열려 있는지 여부
  const displayValue = modals[title] || 'none';

  // 모달 닫기
  const handleClose = () => {
    if (contentRef.current) {
      const inputs = contentRef.current.querySelectorAll('input');
      inputs.forEach((input) => (input.value = ''));
    }
    dispatch(close(title));
  };

  return (
    <ContainerDiv display={displayValue} width={width}>
      <HeaderDiv>
        <Title>알림</Title>
      </HeaderDiv>

      {/* 원하는 콘텐츠를 children으로 넘길 수 있습니다. */}
      <ContentDiv ref={contentRef}>{children}</ContentDiv>
    </ContainerDiv>
  );
};

export default NotificationModal;

/* 모달 전체 컨테이너 */
const ContainerDiv = styled.div`
  /* 화면 오른쪽 상단에 위치 (원하시는 위치로 조정 가능) */
  position: absolute;
  top: 50px;
  right: 30px;

  width: ${(props) => (props.width ? props.width + 'px' : '380px')};

  /* 디자인 */
  background-color: #fff;
  border: 1px solid #ddd;
  border-radius: 10px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.15);

  /* Redux로 제어되는 display 속성 */
  display: ${(props) => props.display};

  z-index: 1000;
`;

/* 헤더(상단 영역) */
const HeaderDiv = styled.div`
  position: relative;
  padding: 16px;
  border-bottom: 1px solid #eee;
`;

/* 제목(예: '알림') */
const Title = styled.div`
  font-weight: bold;
  font-size: 16px;
`;

/* 실제 컨텐츠 영역 */
const ContentDiv = styled.div`
  background-color: #ebebeb;
  padding: 16px;

  max-height: 700px;
  overflow-y: auto;
`;
