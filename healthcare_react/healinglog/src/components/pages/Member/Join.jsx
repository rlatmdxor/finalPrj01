import React from 'react';
import { useState } from 'react';
import Title from '../../util/Title';
import styled, { useTheme } from 'styled-components';
import Btn from '../../util/Btn';
import { useNavigate } from 'react-router-dom';
import ContentLayout from '../../util/ContentLayout';

const Join = () => {
  const [allChecked, setAllChecked] = useState(false);
  const [termsChecked, setTermsChecked] = useState(false);
  const [privacyChecked, setPrivacyChecked] = useState(false);
  const [optionalChecked, setOptionalChecked] = useState(false);

  const handleAllChecked = () => {
    const newValue = !allChecked;
    setAllChecked(newValue);
    setTermsChecked(newValue);
    setPrivacyChecked(newValue);
    setOptionalChecked(newValue);
  };

  const handleIndividualChecked = (setter, value) => {
    setter(!value);
    if (!(!value && allChecked)) {
      setAllChecked(false);
    }
  };

  const navigate = useNavigate();

  const isSubmitEnabled = termsChecked && privacyChecked;
  const theme = useTheme();
  return (
    <>
      <Title>회원가입</Title>
      <div></div>
      <ContentLayout>
        <Checkbox_Container>
          <Checkbox_Group>
            <Checkbox_label>
              <Checkbox type="checkbox" checked={allChecked} onChange={handleAllChecked} />
              전체 동의하기
            </Checkbox_label>
            <BlankSpace />
            <Checkbox_label>
              <Checkbox
                type="checkbox"
                checked={termsChecked}
                onChange={() => handleIndividualChecked(setTermsChecked, termsChecked)}
              ></Checkbox>
              <Essential color="#7ca96d">[필수]</Essential> 힐링로그 이용약관
            </Checkbox_label>
            <TextBox height="220px">
              <div style={{ fontSize: '20px', fontWeight: 'bold' }}>여러분을 환영합니다.</div>
              <div style={{ fontSize: '16px', color: '#757575', marginTop: '20px' }}>
                HealingLog 서비스 및 제품(이하 ‘서비스’)을 이용해 주셔서 감사합니다. 본 약관은 다양한 HealingLog
                서비스의 이용과 관련하여 HealingLog 서비스를 제공하는 HealingLog 주식회사(이하 ‘HealingLog’)와 이를
                이용하는 HealingLog 서비스 회원(이하 ‘회원’) 또는 비회원과의 관계를 설명하며, 아울러 여러분의 HealingLog
                서비스 이용에 도움이 될 수 있는 유익한 정보를 포함하고 있습니다.
              </div>
            </TextBox>
            <BlankSpace />
            <Checkbox_label>
              <Checkbox
                type="checkbox"
                checked={privacyChecked}
                onChange={() => handleIndividualChecked(setPrivacyChecked, privacyChecked)}
              />
              <Essential color="#7ca96d">[필수]</Essential> 개인정보 수집 및 이용
            </Checkbox_label>
            <TextBox height="140px">
              <div style={{ fontSize: '16px', color: '#757575' }}>
                개인정보보호법에 따라 HealingLog에 회원가입 신청하시는 분께 수집하는 개인정보의 항목, 개인정보의 수집 및
                이용목적, 개인정보의 보유 및 이용기간, 동의 거부권 및 동의 거부 시 불이익에 관한 사항을 안내 드리오니
                자세히 읽은 후 동의하여 주시기 바랍니다.
              </div>
            </TextBox>
            <BlankSpace />
            <Checkbox_label>
              <Checkbox
                type="checkbox"
                checked={optionalChecked}
                onChange={() => handleIndividualChecked(setOptionalChecked, optionalChecked)}
              />
              <Essential color="#757575">[선택]</Essential> 실명 인증된 아이디로 가입
            </Checkbox_label>
            <TextBox height="100px">
              <div style={{ fontSize: '16px', color: '#757575' }}>
                실명 인증된 아이디로 가입하시면 본인인증이 필요한 서비스를 가입 후 바로 이용하실 수 있어요.
              </div>
            </TextBox>
          </Checkbox_Group>
          <BtnContainer>
            <Btn
              w="920"
              h="60"
              str="다음"
              c={() => {
                if (isSubmitEnabled) {
                  return theme.green;
                } else {
                  return theme.gray;
                }
              }}
              fs="20"
              fc="white"
              disabled={!isSubmitEnabled}
              f={() => {
                if (isSubmitEnabled) {
                  navigate('/join2');
                }
              }}
            >
              다음
            </Btn>
          </BtnContainer>
        </Checkbox_Container>
      </ContentLayout>
    </>
  );
};

export default Join;

const Container = styled.div`
  margin-bottom: 20px;
`;

const BlankSpace = styled.div`
  height: 50px;
`;

const Checkbox_Container = styled.div`
  display: grid;
  justify-content: center;
  align-items: center;
`;

const Checkbox_Group = styled.div`
  margin-top: 100px;
`;

const Checkbox = styled.input`
  width: 20px;
  height: 20px;
  margin-right: 15px;
`;

const TextBox = styled.div`
  box-sizing: border-box;
  width: 920px;
  height: ${(props) => {
    return props.height;
  }};
  margin-top: 20px;
  padding-top: 40px;
  padding-left: 20px;
  padding-right: 20px;
  border: 1px solid #757575;
  border-radius: 15px;
`;

const Essential = styled.span`
  color: ${(props) => {
    return props.color;
  }};
`;

const Checkbox_label = styled.label`
  display: block;
  margin-bottom: 10px;
  font-size: 20px;
  font-weight: bold;
`;

const BtnContainer = styled.div`
  margin-top: 100px;
  margin-bottom: 100px;
`;
