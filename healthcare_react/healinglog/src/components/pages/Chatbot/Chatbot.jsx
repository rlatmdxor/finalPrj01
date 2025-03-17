import { BASE_URL } from '../../services/config';

import React, { useEffect, useState } from 'react';
import { CircularProgress } from '@mui/material';
import styled from 'styled-components';
import { useDispatch, useSelector } from 'react-redux';
import { close, open } from '../../../redux/modalSlice';
import { useRef } from 'react';
import Btn from '../../util/Btn';

const Layout = styled.div`
  position: fixed;
  right: 55px;
  bottom: 50px;
  cursor: pointer;
`;

const IconImg = styled.img`
  width: 55px;
  height: 55px;
  padding: 8px;
  border: 1px solid skyblue;
  border-radius: 50px;
  background-color: white;
`;

const ContainerDiv = styled.div`
  display: flex;
  flex-direction: column;
  z-index: 500;
  height: 690px;
  width: 450px;
  border: 1px solid gray;
  background-color: #ffffff;
  position: fixed;
  right: 45px;
  bottom: 45px;
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
  height: 440px;
  padding: 25px 25px 0px 25px;
  border-bottom: 1px solid lightgrey;
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

  & > div {
    display: flex;
    flex-direction: column;
  }
`;

const ChatIconImg = styled.img`
  width: 50px;
  height: 50px;
  margin-bottom: 7px;
`;

const NickTextDiv = styled.div`
  font-size: 13px;
  align-self: ${(props) => {
    return props.$isuser ? 'flex-end' : 'flex-start';
  }};
`;

const ChatTextDiv = styled.div`
  width: fit-content;
  max-width: 100%;
  word-break: break-all;
  margin-top: 5px;
  margin-bottom: 14px;
  padding: 12px 18px;
  font-size: 14px;
  border-radius: 15px;
  background-color: ${(props) => {
    return props.$isuser ? '#fff2e6' : 'aliceblue';
  }};
  align-self: ${(props) => {
    return props.$isuser ? 'flex-end' : 'flex-start';
  }};
`;

const SuggestedQuestionsArea = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 6px;
  padding: 8px 20px;
  margin-top: 8px;
  margin-bottom: 8px;
`;

const SuggestedQuestion = styled.div`
  width: fit-content;
  max-width: 100%;
  padding: 7px 16px;
  font-size: 13px;
  border-radius: 20px;
  border: 1px solid #ff8a60;
  margin-bottom: 1px;
  cursor: pointer;
`;

const BottomContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding-left: 20px;
  padding-right: 20px;
`;

const SelectAreaDiv = styled.div`
  font-size: 13px;
  margin-left: 5px;
`;

const StyledSelect = styled.div`
  width: fit-content;
  padding: 7px 12px;
  border: 1px solid skyblue;
  border-radius: 15px;
  margin-bottom: 5px;
  color: #000000;
  cursor: pointer;
`;

const IsLoadingArea = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 20px 0px;
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
  const [isLoading, setIsLoading] = useState(false);
  const isAdminPage = window.location.pathname.includes('/admin');

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

  const getUserHealthData = async () => {
    const response = await fetch(`${BASE_URL}/api/chat`, {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    if (!response.ok) {
      throw new Error(`서버 오류: ${response.status}`);
    }

    const data = await response.json();
    return data;
  };

  const chatbotResponse = async (chatbotRequest) => {
    const response = await fetch(`${BASE_URL}/api/chat`, {
      method: 'POST',
      headers: {
        'content-type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(chatbotRequest),
    });

    if (!response.ok) {
      throw new Error(`서버 오류: ${response.status}`);
    }

    const data = await response.text();
    return data;
  };

  const handleSubmit = async () => {
    if (!inputData.content.trim()) {
      return;
    }

    setChatHistory((prev) => [...prev, { message: inputData.content, isUser: true }]);
    setInputData({ content: '' });
    setIsLoading(true);

    const responseData = await chatbotResponse(inputData);
    setChatHistory((prev) => [...prev, { message: responseData, isUser: false }]);
    setIsLoading(false);
  };

  const filterSleepData = (data) => {
    return data.map(({ sleepStart, sleepEnd }) => ({
      sleepStartTime: sleepStart,
      sleepEndTime: sleepEnd,
    }));
  };

  const filterAlcoholData = (data) => {
    return data.map(({ alcType, abv, cc }) => ({
      alcoholName: alcType,
      alcoholByVolume: abv,
      ml: cc,
    }));
  };

  const filterAerobicData = (data) => {
    return data.map(({ exname, exerciseMinutes, enrollDate }) => ({
      name: exname,
      exerciseMinutes: exerciseMinutes,
      enrollDate: enrollDate,
    }));
  };

  const filterAnAerobicData = (data) => {
    return data.map(({ exname, weight, reps, enrollDate }) => ({
      name: exname,
      weight: weight,
      reps: reps,
      enrollDate: enrollDate,
    }));
  };

  const filterBloodPressureData = (data) => {
    return data.map(({ systole, diastole, purse, day, time, note }) => ({
      systole: systole,
      diastole: diastole,
      purse: purse,
      day: day,
      time: time,
      memo: note,
    }));
  };
  const filterBloodSugarData = (data) => {
    return data.map(({ sugar, day, time, note }) => ({
      sugar: sugar,
      day: day,
      time: time,
      memo: note,
    }));
  };

  const handleSleepPatternClick = async () => {
    if (!token) {
      setChatHistory((prev) => [
        ...prev,
        { message: '나의 수면패턴 분석', isUser: true },
        { message: '로그인 후 이용할 수 있습니다.', isUser: false },
      ]);
      return;
    }

    try {
      const data = await getUserHealthData();
      const sleepData = filterSleepData(data.sleep);

      setChatHistory((prev) => [
        ...prev,
        { message: '나의 수면패턴 분석', isUser: true },
        { message: '최근 30일 간 회원님의 수면 패턴을 분석합니다.', isUser: false },
      ]);
      setIsLoading(true);

      const chatbotRequest = {
        content: `최근 30일 간의 사용자의 수면 기록: ${JSON.stringify(sleepData)}.
        이 데이터를 기반으로 사용자의 수면 습관, 평균 수면시간 등에 대해서 분석하고 간단하게 조언해줘.
        수면을 분석하기에 데이터가 부족하면 수면 데이터가 부족하다는 답변을 해줘.
        응답에 마크다운 기호(**, *, -, # 등)는 사용하지 말고, 평범한 문장으로만 답변해줘.
        한글 기준 600자 이내로 대답해줘.`,
      };

      const responseData = await chatbotResponse(chatbotRequest);

      setChatHistory((prev) => [...prev, { message: responseData, isUser: false }]);
      setIsLoading(false);
    } catch (error) {
      console.error('API 요청 실패:', error);
    }
  };

  const handleDrinkPatternClick = async () => {
    if (!token) {
      setChatHistory((prev) => [
        ...prev,
        { message: '나의 음주습관 분석', isUser: true },
        { message: '로그인 후 이용할 수 있습니다.', isUser: false },
      ]);
      return;
    }

    try {
      const data = await getUserHealthData();
      const alcData = filterAlcoholData(data.alcohol);

      setChatHistory((prev) => [
        ...prev,
        { message: '나의 음주습관 분석', isUser: true },
        { message: '최근 30일 간 회원님의 음주 습관을 분석합니다.', isUser: false },
      ]);
      setIsLoading(true);

      const chatbotRequest = {
        content: `최근 30일 간의 사용자의 음주 기록: ${JSON.stringify(alcData)}.
        이 데이터를 기반으로 사용자의 음주 습관, 평균 음주량 등에 대해서 분석하고 간단하게 조언해줘.
        음주습관을 분석하기에 데이터가 부족하면 음주 데이터가 부족하다는 답변을 해줘.
        응답에 마크다운 기호(**, *, -, # 등)는 사용하지 말고, 평범한 문장으로만 답변해줘.
        한글 기준 600자 이내로 대답해줘.`,
      };

      const responseData = await chatbotResponse(chatbotRequest);

      setChatHistory((prev) => [...prev, { message: responseData, isUser: false }]);
      setIsLoading(false);
    } catch (error) {
      console.error('API 요청 실패:', error);
    }
  };

  const handleDietRecommendClick = () => {
    setChatHistory((prev) => [
      ...prev,
      { message: '식단 추천받기', isUser: true },
      {
        message: '어떤 식단을 추천받고 싶나요? 아래에서 선택해주세요!',
        isUser: false,
        options: ['비건', '다이어트', '저혈당 식단', '저속노화 식단', '고혈압에 좋은 식단'],
      },
    ]);
  };

  const handleDietOptionClick = async (option) => {
    try {
      setChatHistory((prev) => [...prev, { message: option, isUser: true }]);
      setIsLoading(true);

      const chatbotRequest = {
        content: `사용자가 '${option}' 식단 추천을 요청했습니다.
        이와 관련하여 하루 식단을 간단히 추천해줘. 한국인이 주로 먹는 음식으로 구성해줘.
        아침, 점심, 저녁으로 나눠서 구조적으로 대답해줘. 
        응답에 마크다운 기호(**, *, -, # 등)는 사용하지 말고, 평범한 문장으로만 답변해줘. 
        한글 기준 600자 이내로 대답해줘.`,
      };

      const responseData = await chatbotResponse(chatbotRequest);

      setChatHistory((prev) => [...prev, { message: responseData, isUser: false }]);
      setIsLoading(false);
    } catch (error) {
      console.error('API 요청 실패:', error);
    }
  };

  const handleExercisePatternClick = async () => {
    if (!token) {
      setChatHistory((prev) => [
        ...prev,
        { message: '나의 운동내역 분석', isUser: true },
        { message: '로그인 후 이용할 수 있습니다.', isUser: false },
      ]);
      return;
    }

    try {
      const data = await getUserHealthData();
      const aerobicData = filterAerobicData(data.aerobicHistory);
      const anAerobicData = filterAnAerobicData(data.anAerobicHistory);
      setIsLoading(true);

      setChatHistory((prev) => [
        ...prev,
        { message: '나의 운동내역 분석', isUser: true },
        { message: '최근 30일 간 회원님의 운동 내역을 분석합니다.', isUser: false },
      ]);

      const chatbotRequest = {
        content: `최근 30일 간의 사용자의 운동 기록: 
        유산소 데이터 : ${JSON.stringify(aerobicData)}.
        무산소 데이터 : ${JSON.stringify(anAerobicData)}.
        운동명과 운동일 데이터를 잘 해석해서 운동 분포에 대해 판단해서 조언하고,
        지금 상태에 알맞는 운동을 추천해주기도 했으면 좋겠어.
        운동시간, 유산소 운동과 무산소 운동의 효과는 답변에 포함하지마.
        이 데이터를 기반으로 사용자의 운동 내역에 대해서 분석하고 간단하게 조언해줘.
        운동 내역을 분석하기에 데이터가 부족하면 운동 데이터가 부족하다는 답변을 해줘.
        응답에 마크다운 기호(**, *, -, # 등)는 사용하지 말고, 평범한 문장으로만 답변해줘.
        한글 기준 580자 이내로 대답해줘.`,
      };

      const responseData = await chatbotResponse(chatbotRequest);

      setChatHistory((prev) => [...prev, { message: responseData, isUser: false }]);
      setIsLoading(false);
    } catch (error) {
      console.error('API 요청 실패:', error);
    }
  };

  const handleCardiovascularClick = async () => {
    if (!token) {
      setChatHistory((prev) => [
        ...prev,
        { message: '나의 혈압/혈당 분석', isUser: true },
        { message: '로그인 후 이용할 수 있습니다.', isUser: false },
      ]);
      return;
    }

    try {
      const data = await getUserHealthData();
      const bloodPressureData = filterBloodPressureData(data.bloodPressure);
      const bloodSugarData = filterBloodSugarData(data.bloodSugar);
      setIsLoading(true);

      setChatHistory((prev) => [
        ...prev,
        { message: '나의 혈압/혈당 분석', isUser: true },
        { message: '최근 30일 간 회원님의 혈압 및 혈당을 분석합니다', isUser: false },
      ]);

      const chatbotRequest = {
        content: `최근 30일 간의 사용자의 혈압 및 혈당 기록: 
        혈압 : ${JSON.stringify(bloodPressureData)}. 혈당 : ${JSON.stringify(bloodSugarData)}.
        이 데이터를 기반으로 사용자의 최고혈압, 최저혈압, 정상 범위 및
        최고혈당, 최저혈당, 정상범위 등에 대해서 분석하고 간단하게 조언해줘.
        혈압 또는 혈당 내역을 분석하기에 데이터가 부족하면 데이터가 부족하다는 답변을 해줘.
        응답에 마크다운 기호(**, *, -, # 등)는 사용하지 말고, 평범한 문장으로만 답변해줘.
        한글 기준 600자 이내로 대답해줘.`,
      };

      const responseData = await chatbotResponse(chatbotRequest);

      setChatHistory((prev) => [...prev, { message: responseData, isUser: false }]);
      setIsLoading(false);
    } catch (error) {
      console.error('API 요청 실패:', error);
    }
  };

  const handleDrugClick = async () => {
    if (!token) {
      setChatHistory((prev) => [
        ...prev,
        { message: '복용중인 약 부작용 확인', isUser: true },
        { message: '로그인 후 이용할 수 있습니다.', isUser: false },
      ]);
      return;
    }
    try {
      const data = await getUserHealthData();

      if (!data.drug || data.drug.length === 0) {
        setChatHistory((prev) => [
          ...prev,
          { message: '복용중인 약 부작용 확인', isUser: true },
          { message: '회원님이 현재 복용중인 약이 없습니다. 어떤 약의 부작용을 확인하고 싶나요?', isUser: false },
        ]);
        return;
      }

      const drugOptions = data.drug.map((drug) => drug.name);
      setIsLoading(true);

      setChatHistory((prev) => [
        ...prev,
        { message: '복용중인 약 부작용 확인', isUser: true },
        {
          message: '현재 회원님이 복용중인 약입니다. 어떤 약의 부작용을 확인하고 싶나요? 아래에서 선택해주세요!',
          isUser: false,
          options: drugOptions,
        },
      ]);

      setIsLoading(false);
    } catch (error) {
      console.error('API 요청 실패:', error);
    }
  };

  const handleDrugOptionClick = async (option) => {
    try {
      setChatHistory((prev) => [...prev, { message: option, isUser: true }]);
      setIsLoading(true);

      const chatbotRequest = {
        content: `사용자가 '${option}' 약의 부작용을 알려달라고 요청했습니다.
        이와 관련하여 이 약의 부작용과 복용 시 주의사항을 간단하게 설명해줘. 
        응답에 마크다운 기호(**, *, -, # 등)는 사용하지 말고, 평범한 문장으로만 답변해줘. 
        한글 기준 600자 이내로 대답해줘.`,
      };

      const responseData = await chatbotResponse(chatbotRequest);

      setChatHistory((prev) => [...prev, { message: responseData, isUser: false }]);
      setIsLoading(false);
    } catch (error) {
      console.error('API 요청 실패:', error);
    }
  };

  return (
    <>
      {!isAdminPage ? (
        <Layout>
          <IconImg
            src="https://img.icons8.com/?size=100&id=L3uh0mNuxBXw&format=png&color=000000"
            onClick={handleOpenChatbotModal}
          />
        </Layout>
      ) : (
        ''
      )}

      <ContainerDiv key={title} display={displayValue}>
        <StyleDiv>
          <TitleDiv>{title}</TitleDiv>
        </StyleDiv>

        <CloseBtn onClick={handleClose}>X</CloseBtn>
        <ContentDiv ref={contentRef}>
          <ChatAreaDiv>
            <ChatIconImg src="https://img.icons8.com/?size=100&id=L3uh0mNuxBXw&format=png&color=000000" />
            <NickTextDiv>힐링챗봇</NickTextDiv>
            <ChatTextDiv>안녕하세요, 힐링로그 챗봇입니다. 무엇을 도와드릴까요?</ChatTextDiv>
            {chatHistory.map((vo, index) => {
              return (
                <div key={index}>
                  <NickTextDiv $isuser={vo.isUser}>{vo.isUser ? '사용자' : '힐링챗봇'}</NickTextDiv>
                  <ChatTextDiv $isuser={vo.isUser}>{vo.message}</ChatTextDiv>
                  {vo.options && (
                    <SelectAreaDiv>
                      {vo.options.map((option, idx) => {
                        const handleClick = vo.message.includes('식단')
                          ? () => handleDietOptionClick(option)
                          : () => handleDrugOptionClick(option);
                        return (
                          <StyledSelect key={idx} onClick={handleClick}>
                            {option}
                          </StyledSelect>
                        );
                      })}
                    </SelectAreaDiv>
                  )}
                </div>
              );
            })}
            {isLoading ? (
              <IsLoadingArea>
                <CircularProgress />
              </IsLoadingArea>
            ) : (
              ''
            )}
          </ChatAreaDiv>
        </ContentDiv>
        <SuggestedQuestionsArea>
          <SuggestedQuestion onClick={handleSleepPatternClick}>수면 패턴 분석</SuggestedQuestion>
          <SuggestedQuestion onClick={handleDrinkPatternClick}>음주 습관 분석</SuggestedQuestion>
          <SuggestedQuestion onClick={handleDrugClick}>복용중인 약 부작용 확인</SuggestedQuestion>
          <SuggestedQuestion onClick={handleExercisePatternClick}>운동 내역 분석</SuggestedQuestion>
          <SuggestedQuestion onClick={handleCardiovascularClick}>혈압/혈당 분석</SuggestedQuestion>
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
