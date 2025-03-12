import React, { useEffect, useState } from 'react';
import { Avatar } from '@mui/material';
import styled from 'styled-components';
import { useDispatch, useSelector } from 'react-redux';
import { close, open } from '../../../redux/modalSlice';
import { useRef } from 'react';
import Btn from '../../util/Btn';

const Layout = styled.div`
  position: fixed;
  right: 40px;
  bottom: 40px;
`;

const ContainerDiv = styled.div`
  display: flex;
  flex-direction: column;
  z-index: 500;
  height: 650px;
  width: 450px;
  border: 1px solid gray;
  background-color: #ffffff;
  position: fixed;
  right: 40px;
  bottom: 40px;
  border-radius: 15px;
  box-shadow: 0px 2px 10px rgba(0, 0, 0, 0.1);

  display: ${(props) => {
    return props.display;
  }};
`;

const StyleDiv = styled.div`
  height: 60px;
  border-bottom: 1px solid lightgrey;
`;

const CloseBtn = styled.button`
  position: absolute;
  display: flex;
  justify-content: end;
  margin-left: 420px;
  margin-top: -35px;
  background-color: #ffffff;
  border: none;
  cursor: pointer;
`;

const ContentDiv = styled.div`
  height: 410px;
  padding: 25px 25px 0px 25px;
  overflow-y: auto;

  &::-webkit-scrollbar {
    width: 8px;
    opacity: 1;
  }

  &::-webkit-scrollbar-track {
    background: #f1f1f1;
    border-radius: 10px;
  }

  &::-webkit-scrollbar-thumb {
    background: rgba(196, 196, 196, 0.6);
    border-radius: 10px;
  }

  &::-webkit-scrollbar-thumb:hover {
    background: rgba(156, 156, 156, 0.8);
  }
`;

const TitleDiv = styled.div`
  font-size: 20px;
  font-weight: 900;
  width: 450px;
  height: 90px;
  box-sizing: border-box;
  padding: 20px;
  position: absolute;
`;

const ChatInput = styled.input`
  font-family: 'goorm-sans-bold';
  width: 100%;
  height: 14px;
  padding: 10px 15px;
  border: 1px solid gray;
  border-radius: 15px;
  margin-right: 13px;
`;

const ChatAreaDiv = styled.div`
  display: flex;
  flex-direction: column;
`;

const NickTextDiv = styled.div`
  font-size: 13px;
  align-self: ${(props) => {
    return props.isuser ? 'flex-end' : 'flex-start';
  }};
`;

const ChatTextDiv = styled.div`
  width: fit-content;
  max-width: 100%;
  word-break: break-all;
  margin-top: 5px;
  margin-bottom: 10px;
  padding: 12px 18px;
  font-size: 14px;
  border-radius: 15px;
  background-color: ${(props) => {
    return props.isuser ? '#fff2e6' : 'aliceblue';
  }};
  align-self: ${(props) => {
    return props.isuser ? 'flex-end' : 'flex-start';
  }};
`;

const SuggestedQuestionsArea = styled.div`
  display: flex;
  border-bottom: 1px solid lightgrey;
  gap: 6px;
  overflow-x: auto;
  padding: 11px 20px;
  white-space: nowrap;
  overflow-x: auto;

  &::-webkit-scrollbar {
    height: 6px;
    opacity: 1;
  }

  &::-webkit-scrollbar-track {
    background: #f1f1f1;
    border-radius: 10px;
  }

  &::-webkit-scrollbar-thumb {
    background: rgba(196, 196, 196, 0.6);
    border-radius: 10px;
  }

  &::-webkit-scrollbar-thumb:hover {
    background: rgba(156, 156, 156, 0.8);
  }
`;

const SuggestedQuestion = styled.div`
  width: fit-content;
  max-width: 100%;
  padding: 9px 16px;
  font-size: 13px;
  border-radius: 20px;
  border: 1px solid #ff8a60;
  margin-top: 5px;
  margin-bottom: 3px;
  cursor: pointer;
`;

const BottomContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding-top: 23px;
  padding-left: 20px;
  padding-right: 20px;
`;

const Chatbot = () => {
  const dispatch = useDispatch();
  const contentRef = useRef(null);
  const { modals } = useSelector((state) => {
    return state.modal;
  });
  const title = '챗봇';
  const token = localStorage.getItem('token');

  const displayValue = modals[title] || 'none';

  const [inputData, setInputData] = useState({ content: '' });
  const [chatHistory, setChatHistory] = useState([]);

  useEffect(() => {
    if (contentRef.current) {
      contentRef.current.scrollTop = contentRef.current.scrollHeight;
    }
  }, [chatHistory]);

  const handleClose = () => {
    if (contentRef.current) {
      const inputs = contentRef.current.querySelectorAll('input');
      inputs.forEach((input) => (input.value = ''));
    }
    dispatch(close(title));
  };

  const handleOpenChatbotModal = () => {
    dispatch(open({ title: '챗봇', value: 'block' }));
  };

  const handleChange = (e) => {
    setInputData((prev) => {
      return {
        ...prev,
        [e.target.name]: e.target.value,
      };
    });
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSubmit();
    }
  };

  const handleSubmit = () => {
    if (!inputData.content.trim()) {
      return;
    }

    setChatHistory((prev) => [...prev, { message: inputData.content, isUser: true }]);
    setInputData({ content: '' });

    fetch('http://127.0.0.1:80/api/chat', {
      method: 'POST',
      headers: {
        'content-type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(inputData),
    })
      .then((resp) => resp.text())
      .then((data) => {
        console.log(data);
        setChatHistory((prev) => [...prev, { message: data, isUser: false }]);
      });
  };

  const handleSleepPatternClick = () => {
    if (!token) {
      setChatHistory((prev) => [
        ...prev,
        { message: '나의 수면패턴 분석', isUser: true },
        { message: '로그인 후 이용할 수 있습니다.', isUser: false },
      ]);
    }
  };

  const handleDrinkPatternClick = () => {
    if (!token) {
      setChatHistory((prev) => [
        ...prev,
        { message: '나의 음주패턴 분석', isUser: true },
        { message: '로그인 후 이용할 수 있습니다.', isUser: false },
      ]);
    }
  };

  const handleDietRecommendClick = () => {
    if (!token) {
      setChatHistory((prev) => [
        ...prev,
        { message: '식단 추천받기', isUser: true },
        { message: '로그인 후 이용할 수 있습니다.', isUser: false },
      ]);
    }
  };

  return (
    <>
      <Layout>
        <Avatar onClick={handleOpenChatbotModal} />
      </Layout>

      <ContainerDiv key={title} display={displayValue}>
        <StyleDiv>
          <TitleDiv>{title}</TitleDiv>
        </StyleDiv>

        <CloseBtn onClick={handleClose}>X</CloseBtn>
        <ContentDiv ref={contentRef}>
          <ChatAreaDiv>
            <NickTextDiv>힐링챗봇</NickTextDiv>
            <ChatTextDiv>안녕하세요 힐링로그 챗봇입니다. 무엇을 도와드릴까요?</ChatTextDiv>
            {chatHistory.map((vo, index) => {
              return (
                <>
                  <NickTextDiv isuser={vo.isUser}>{vo.isUser ? '사용자' : '힐링챗봇'}</NickTextDiv>
                  <ChatTextDiv key={index} isuser={vo.isUser}>
                    {vo.message}
                  </ChatTextDiv>
                </>
              );
            })}
          </ChatAreaDiv>
        </ContentDiv>
        <SuggestedQuestionsArea>
          <SuggestedQuestion onClick={handleSleepPatternClick}>나의 수면패턴 분석</SuggestedQuestion>
          <SuggestedQuestion onClick={handleDrinkPatternClick}>나의 음주패턴 분석</SuggestedQuestion>
          <SuggestedQuestion onClick={handleDietRecommendClick}>식단 추천받기</SuggestedQuestion>
        </SuggestedQuestionsArea>
        <BottomContainer>
          <ChatInput
            type="text"
            name="content"
            value={inputData.content}
            onKeyDown={handleKeyDown}
            onChange={handleChange}
          />
          <Btn title={'챗봇'} str={'전송'} mt={'0'} mb={'0'} mr={'0'} c={'#ff8a60'} fc={'white'} f={handleSubmit}></Btn>
        </BottomContainer>
      </ContainerDiv>
    </>
  );
};

export default Chatbot;
