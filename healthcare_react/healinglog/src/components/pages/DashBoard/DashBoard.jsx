import React, { useEffect, useState } from 'react';
import Title from '../../util/Title';
import ContentLayout from '../../util/ContentLayout';
import styled from 'styled-components';
import Navi from '../../util/Navi';
import SmallCard from '../../util/SmallCard';
import Btn from '../../util/Btn';
import useWeekRange from '../../hook/useWeekRange';
import { Switch } from '@mui/material';
import { getDashboardData, getDashboardSetting, editDashboardSetting } from '../../services/dashboardService';
import Modal from '../../util/Modal';
import { useDispatch } from 'react-redux';
import { close, open } from '../../../redux/modalSlice';
import { useNavigate } from 'react-router-dom';
import { getRoleFromToken, isTokenExpired } from '../../util/JwtUtil';

const NaviContainer = styled.div`
  display: grid;
  position: relative;
  width: 200px;
  top: 20px;
  left: 40px;
  grid-template-columns: 4fr 3fr;
`;

const DateDiv = styled.div`
  display: flex;
  width: 100%;
  height: 50px;
  justify-content: space-between;
  align-items: center;
  padding: 12px;
  background-color: #78be78;
  box-sizing: border-box;
  border-radius: 5px;
  color: white;
  font-weight: bold;

  & input {
    background: none;
    border: none;
    font-family: Arial, sans-serif;
    font-size: 19px;
    cursor: pointer;
    color: white;
  }

  & button {
    background: none;
    border: none;
    font-size: 18px;
    cursor: pointer;
    color: white;
  }
`;

const DateTextDiv = styled.div`
  font-size: 17px;
`;

const SettingBtnDiv = styled.div`
  display: flex;
  height: 25px;
  justify-content: flex-end;
  margin-top: 30px;
  margin-bottom: 20px;
`;

const ContentArea = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  column-gap: 20px;
  row-gap: 28px;
  width: 100%;
  max-width: 1020px;
  min-height: 400px;
  margin-top: 30px;
  margin-left: auto;
  margin-right: auto;
  margin-bottom: 70px;
`;

const SmallTextDiv = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 25px;
  margin-top: 23px;
  padding: 0px 14px;
  font-size: 16px;
  font-weight: 500;
  color: #3b3b3b;
`;

const BigTextDiv = styled.div`
  margin-left: auto;
  margin-right: auto;
  margin-top: 8px;
  margin-bottom: 9px;
  font-size: 30px;
`;

const IncDecTextDiv = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 0px 14px;
  font-size: 17px;
  font-weight: 500;
  color: ${({ value }) => {
    const strValue = value ? String(value).trim() : '0';
    return strValue.startsWith('+') ? 'red' : strValue.startsWith('-') ? 'blue' : '#3b3b3b';
  }};
`;

const BigCard = styled.div`
  width: 100%;
  height: 145px;
  grid-column: span 3;
  display: flex;
  justify-content: space-around;
  align-items: center;
  border: 1px solid #c5cbd1;
  border-radius: 6px;
`;

const BigCardInnerDiv = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const BigCardInnerTopDiv = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  color: #5f5f5f;
`;

const BigCardInnerMidDiv = styled.div`
  font-size: 25px;
  color: #000000;
  margin-top: 5px;
  margin-bottom: 6px;
`;

const ModalContainer = styled.div`
  display: flex;
  justify-content: end;
`;

const ContentDiv = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-template-rows: auto;
  column-gap: 20px;
  row-gap: 2px;
  margin-bottom: 10px;
`;

const SwitchInputDiv = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
`;

const DashBoard = () => {
  const navi = useNavigate();
  const dispatch = useDispatch();
  const Swal = require('sweetalert2');

  const token = localStorage.getItem('token');
  const [isAuthorized, setIsAuthorized] = useState(false); // 로그인 여부 체크

  const { currentMonday, currentSunday, handlePrevWeek, handleNextWeek } = useWeekRange();
  const [dashboardData, setDashboardData] = useState({ currentWeek: {}, previousWeek: {}, difference: {} });

  const [settings, setSettings] = useState([]);
  const [inputData, setInputData] = useState([]);

  const [isAllSelected, setIsAllSelected] = useState(false);

  useEffect(() => {
    if (!token || isTokenExpired(token) || getRoleFromToken(token) == 'ROLE_ADMIN') {
      window.localStorage.removeItem('token'); // 토큰 삭제
      navi('/login'); // 로그인 페이지로 이동
      Swal.fire({
        icon: 'warning',
        title: '로그인이 필요합니다',
        text: '로그인 후 이용해주세요',
        confirmButtonText: '확인',
      });
    } else {
      setIsAuthorized(true); // 로그인 성공 시 데이터 요청 가능
    }
  }, [navi, token]);

  useEffect(() => {
    if (!isAuthorized) {
      return;
    }

    const fetchDashboardData = async () => {
      try {
        const fetchData = await getDashboardData(currentMonday, currentSunday, token);
        setDashboardData(fetchData);
      } catch (error) {
        console.error('[ERROR] GET DASHBOARD DATA FAIL', error);
      }
    };

    const fetchDashboardSettings = async () => {
      try {
        const fetchData = await getDashboardSetting(token);
        setSettings(fetchData);
      } catch (error) {
        console.error('[ERROR] GET DASHBOARD SETTING FAIL', error);
      }
    };

    const fetchData = async () => {
      await fetchDashboardData();
      await fetchDashboardSettings();
    };
    fetchData();
  }, [isAuthorized, token, currentMonday, currentSunday]);

  useEffect(() => {
    const allSelected = inputData.every((item) => item.visibleYn === 'Y');
    setIsAllSelected(allSelected);
  }, [inputData]);

  const handleSettingModal = () => {
    setInputData([...settings]);
    dispatch(open({ title: '대시보드 설정', value: 'block' }));
  };

  const handleChange = (index) => {
    setInputData((prev) =>
      prev.map((vo, i) => (i === index ? { ...vo, visibleYn: vo.visibleYn === 'Y' ? 'N' : 'Y' } : vo))
    );
  };

  const handleToggleAll = () => {
    const newValue = isAllSelected ? 'N' : 'Y';
    setInputData((prev) => prev.map((vo) => ({ ...vo, visibleYn: newValue })));
  };

  const handleSave = () => {
    const getFetch = async () => {
      try {
        const result = await editDashboardSetting(inputData, token);
        if (result == 200) {
          Swal.fire({
            icon: 'success',
            title: '저장되었습니다.',
            confirmButtonText: '확인',
          });
          setSettings(inputData);
        } else {
          Swal.fire({
            title: '오류발생...',
            confirmButtonText: '확인',
          });
        }
      } catch (error) {
        console.error('[ERROR] EDIT DASHBOARD SETTING FAIL', error);
      }
      dispatch(close('대시보드 설정'));
    };
    getFetch();
  };

  // 시간 변환 (시간, 분)
  const timeFormat = (minutes) => {
    if (!minutes || isNaN(minutes)) {
      return '0시간 00분';
    }

    const hours = Math.floor(minutes / 60);
    const remainMinutes = minutes % 60;

    return `${hours}시간 ${remainMinutes.toString().padStart(2, '0')}분`;
  };

  return (
    <>
      <Title>나의 건강 현황</Title>
      <NaviContainer>
        <Navi target="dashboard" tag={'대시보드'}></Navi>
      </NaviContainer>
      <ContentLayout>
        <SettingBtnDiv>
          <Btn str={'설정'} w={'60'} h={'32'} mt={'0'} mb={'0'} ml={'0'} mr={'0'} fs={'14'} f={handleSettingModal} />
        </SettingBtnDiv>
        <DateDiv>
          <button onClick={handlePrevWeek}>◀</button>
          <DateTextDiv>
            {currentMonday} (월) ~ {currentSunday} (일)
          </DateTextDiv>
          <button onClick={handleNextWeek}>▶</button>
        </DateDiv>
        <ContentArea>
          {(settings.some((s) => s.name === '혈압' && s.visibleYn === 'Y') ||
            settings.some((s) => s.name === '혈당' && s.visibleYn === 'Y')) && (
            <BigCard>
              {settings.find((s) => s.name === '혈압' && s.visibleYn === 'Y') && (
                <>
                  <BigCardInnerDiv>
                    <BigCardInnerTopDiv>
                      <div>이번주 최고 혈압</div>
                    </BigCardInnerTopDiv>
                    <BigCardInnerMidDiv>{dashboardData.currentWeek.maxBloodPressure} mmHg</BigCardInnerMidDiv>
                    <IncDecTextDiv value={dashboardData.difference.maxBloodPressure}>
                      ( {dashboardData.difference.maxBloodPressure} )
                    </IncDecTextDiv>
                  </BigCardInnerDiv>
                  <BigCardInnerDiv>
                    <BigCardInnerTopDiv>
                      <div>이번주 최저 혈압</div>
                    </BigCardInnerTopDiv>
                    <BigCardInnerMidDiv>{dashboardData.currentWeek.minBloodPressure} mmHg</BigCardInnerMidDiv>
                    <IncDecTextDiv value={dashboardData.difference.minBloodPressure}>
                      ( {dashboardData.difference.minBloodPressure} )
                    </IncDecTextDiv>
                  </BigCardInnerDiv>
                </>
              )}
              {settings.find((s) => s.name === '혈당' && s.visibleYn === 'Y') && (
                <>
                  <BigCardInnerDiv>
                    <BigCardInnerTopDiv>
                      <div>이번주 최고 혈당</div>
                    </BigCardInnerTopDiv>
                    <BigCardInnerMidDiv>{dashboardData.currentWeek.maxBloodSugar} mg/dL</BigCardInnerMidDiv>
                    <IncDecTextDiv value={dashboardData.difference.maxBloodSugar}>
                      ( {dashboardData.difference.maxBloodSugar} )
                    </IncDecTextDiv>
                  </BigCardInnerDiv>
                  <BigCardInnerDiv>
                    <BigCardInnerTopDiv>
                      <div>이번주 최저 혈당</div>
                    </BigCardInnerTopDiv>
                    <BigCardInnerMidDiv>{dashboardData.currentWeek.minBloodSugar} mg/dL</BigCardInnerMidDiv>
                    <IncDecTextDiv value={dashboardData.difference.minBloodSugar}>
                      ( {dashboardData.difference.minBloodSugar} )
                    </IncDecTextDiv>
                  </BigCardInnerDiv>
                </>
              )}
            </BigCard>
          )}
          {settings.find((s) => s.name === '수면' && s.visibleYn === 'Y') && (
            <SmallCard>
              <SmallTextDiv>이번주 평균 수면시간</SmallTextDiv>
              <BigTextDiv>{timeFormat(dashboardData.currentWeek.avgSleep)}</BigTextDiv>
              <IncDecTextDiv value={dashboardData.difference.avgSleep}>
                ( {dashboardData.difference.avgSleep} )
              </IncDecTextDiv>
            </SmallCard>
          )}
          {settings.find((s) => s.name === '흡연' && s.visibleYn === 'Y') && (
            <SmallCard>
              <SmallTextDiv>이번주 소모 담배량</SmallTextDiv>
              <BigTextDiv>{dashboardData.currentWeek.countCigarette} 갑</BigTextDiv>
              <IncDecTextDiv value={dashboardData.difference.countCigarette}>
                ( {dashboardData.difference.countCigarette} )
              </IncDecTextDiv>
            </SmallCard>
          )}
          {settings.find((s) => s.name === '알코올 섭취량' && s.visibleYn === 'Y') && (
            <SmallCard>
              <SmallTextDiv>이번주 알코올 섭취량</SmallTextDiv>
              <BigTextDiv>{dashboardData.currentWeek.sumAlc} ml</BigTextDiv>
              <IncDecTextDiv value={dashboardData.difference.sumAlc}>
                ( {dashboardData.difference.sumAlc} )
              </IncDecTextDiv>
            </SmallCard>
          )}
          {settings.find((s) => s.name === '체중' && s.visibleYn === 'Y') && (
            <SmallCard>
              <SmallTextDiv>이번주 평균 체중</SmallTextDiv>
              <BigTextDiv>{dashboardData.currentWeek.avgWeight} kg</BigTextDiv>
              <IncDecTextDiv value={dashboardData.difference.avgWeight}>
                ( {dashboardData.difference.avgWeight} )
              </IncDecTextDiv>
            </SmallCard>
          )}
          {settings.find((s) => s.name === '칼로리 섭취량' && s.visibleYn === 'Y') && (
            <SmallCard>
              <SmallTextDiv>이번주 평균 칼로리 섭취량</SmallTextDiv>
              <BigTextDiv>{dashboardData.currentWeek.avgKcal} Kcal</BigTextDiv>
              <IncDecTextDiv value={dashboardData.difference.avgKcal}>
                ( {dashboardData.difference.avgKcal} )
              </IncDecTextDiv>
            </SmallCard>
          )}
          {settings.find((s) => s.name === '물 섭취량' && s.visibleYn === 'Y') && (
            <SmallCard>
              <SmallTextDiv>이번주 평균 물 섭취량</SmallTextDiv>
              <BigTextDiv>{dashboardData.currentWeek.avgWater} ml</BigTextDiv>
              <IncDecTextDiv value={dashboardData.difference.avgWater}>
                ( {dashboardData.difference.avgWater} )
              </IncDecTextDiv>
            </SmallCard>
          )}
          {settings.find((s) => s.name === '칼로리 소모량' && s.visibleYn === 'Y') && (
            <SmallCard>
              <SmallTextDiv>이번주 칼로리 소모량</SmallTextDiv>
              <BigTextDiv>{dashboardData.currentWeek.sumCalConsume} Kcal</BigTextDiv>
              <IncDecTextDiv value={dashboardData.difference.sumCalConsume}>
                ( {dashboardData.difference.sumCalConsume} )
              </IncDecTextDiv>
            </SmallCard>
          )}
          {settings.find((s) => s.name === '유산소 운동시간' && s.visibleYn === 'Y') && (
            <SmallCard>
              <SmallTextDiv>이번주 유산소 운동시간</SmallTextDiv>
              <BigTextDiv>{timeFormat(dashboardData.currentWeek.sumAerobic)}</BigTextDiv>
              <IncDecTextDiv value={dashboardData.difference.sumAerobic}>
                ( {dashboardData.difference.sumAerobic} )
              </IncDecTextDiv>
            </SmallCard>
          )}
          {settings.find((s) => s.name === '무산소 운동일수' && s.visibleYn === 'Y') && (
            <SmallCard>
              <SmallTextDiv>이번주 무산소 운동일수</SmallTextDiv>
              <BigTextDiv>{dashboardData.currentWeek.countAnaerobic}</BigTextDiv>
              <IncDecTextDiv value={dashboardData.difference.countAnaerobic}>
                ( {dashboardData.difference.countAnaerobic} )
              </IncDecTextDiv>
            </SmallCard>
          )}
        </ContentArea>

        <Modal title="대시보드 설정">
          <ContentDiv>
            <SwitchInputDiv>
              <div>전체</div>
              <Switch checked={isAllSelected} onChange={handleToggleAll} />
            </SwitchInputDiv>
            {inputData.map((vo, index) => {
              return (
                <SwitchInputDiv key={vo.no}>
                  <div>{vo.name}</div>
                  <Switch checked={vo.visibleYn === 'Y'} onChange={() => handleChange(index)} />
                </SwitchInputDiv>
              );
            })}
          </ContentDiv>
          <ModalContainer>
            <Btn
              title={'대시보드 설정'}
              str={'저장'}
              mt={'17'}
              mb={'30'}
              mr={'0'}
              c={'#ff8a60'}
              fc={'white'}
              f={handleSave}
            ></Btn>
          </ModalContainer>
        </Modal>
      </ContentLayout>
    </>
  );
};

export default DashBoard;
