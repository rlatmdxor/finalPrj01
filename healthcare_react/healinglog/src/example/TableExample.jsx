import React from 'react';
import BoardList from '../components/BoardList';
import Table from '../components/Table';
import styled from 'styled-components';

const Layout = styled.div`
  width: 1000px;
  margin: 0 auto;
`;

const TableExample = () => {
  return (
    <Layout>
      <h1>게시글 리스트</h1>
      <BoardList>
        <thead>
          <tr>
            <th>번호</th>
            <th>카테고리</th>
            <th>제목</th>
            <th>추천수</th>
            <th>작성자</th>
            <th>등록일자</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>3</td>
            <td>병원</td>
            <td>제목11111111111111111</td>
            <td>15</td>
            <td>홍길동</td>
            <td>2025-01-18</td>
          </tr>
          <tr>
            <td>2</td>
            <td>보험</td>
            <td>제목222222222222222222</td>
            <td>25</td>
            <td>홍길동</td>
            <td>2025-01-18</td>
          </tr>
          <tr>
            <td>1</td>
            <td>생활</td>
            <td>제목333333333333333333</td>
            <td>36</td>
            <td>홍길동</td>
            <td>2025-01-18</td>
          </tr>
        </tbody>
      </BoardList>

      <h1>표</h1>

      <Table width="" thBgColor="">
        <thead>
          <tr>
            <th>일자</th>
            <th>술종류</th>
            <th>마신 량(cc)</th>
            <th>도수</th>
            <th>표준 잔</th>
            <th>마신 알코올 량</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>2024-01-10</td>
            <td>소주</td>
            <td>150</td>
            <td>20</td>
            <td>3</td>
            <td>24</td>
          </tr>
          <tr>
            <td>2024-01-11</td>
            <td>소주</td>
            <td>150</td>
            <td>20</td>
            <td>3</td>
            <td>24</td>
          </tr>
          <tr>
            <td>2024-01-12</td>
            <td>소주</td>
            <td>150</td>
            <td>20</td>
            <td>3</td>
            <td>24</td>
          </tr>
        </tbody>
      </Table>

      <Table width="" thBgColor="">
        <thead>
          <tr>
            <th colSpan="2">측정일</th>
            <th>측정시간</th>
            <th>이완기</th>
            <th>수축기</th>
            <th>맥박/분</th>
            <th>특이사항</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td rowSpan="2">2025-01-02 (목)</td>
            <td>아침</td>
            <td>07:00</td>
            <td>80 mmHg</td>
            <td>120 mmHg</td>
            <td>95 회</td>
            <td>특이사항입니당</td>
          </tr>
          <tr>
            <td>저녁</td>
            <td>07:00</td>
            <td>80 mmHg</td>
            <td>120 mmHg</td>
            <td>95 회</td>
            <td>특이사항입니당</td>
          </tr>
          <tr>
            <td rowSpan="2">2025-01-01 (수)</td>
            <td>아침</td>
            <td>07:00</td>
            <td>80 mmHg</td>
            <td>120 mmHg</td>
            <td>95 회</td>
            <td>특이사항입니당</td>
          </tr>
          <tr>
            <td>저녁</td>
            <td>07:00</td>
            <td>80 mmHg</td>
            <td>120 mmHg</td>
            <td>95 회</td>
            <td>특이사항입니당</td>
          </tr>
        </tbody>
      </Table>

      <Table width="" thBgColor="">
        <thead>
          <tr>
            <th colSpan="4">닉네임 님의 현재 복용약</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td rowSpan="3">1</td>
            <td rowSpan="2">복용 약 사진</td>
            <td>타이레놀</td>
            <td rowSpan="3">삭제</td>
          </tr>
          <tr>
            <td>1. 해열 및 감기에 의한 동통(통증)과 두통, 치통, 근육통, 허리동통(통증), 생리통, 관절통의 완화</td>
          </tr>
          <tr>
            <td>해열 진통제</td>
            <td>1회 1정 / 3회</td>
          </tr>
          <tr>
            <td rowSpan="3">2</td>
            <td rowSpan="2">복용 약 사진</td>
            <td>타이레놀</td>
            <td rowSpan="3">삭제</td>
          </tr>
          <tr>
            <td>1. 해열 및 감기에 의한 동통(통증)과 두통, 치통, 근육통, 허리동통(통증), 생리통, 관절통의 완화</td>
          </tr>
          <tr>
            <td>해열 진통제</td>
            <td>1회 1정 / 3회</td>
          </tr>
        </tbody>
      </Table>

      <Table width="" thBgColor="">
        <thead>
          <tr>
            <th colSpan="3">약 상세정보</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td rowSpan="3">기본정보</td>
            <td rowSpan="3">약 사진</td>
            <td>타이레놀</td>
          </tr>
          <tr>
            <td>해열 진통 소염제</td>
          </tr>
          <tr>
            <td>1회 1정 / 3회</td>
          </tr>
          <tr>
            <td rowSpan="4">세부정보</td>
            <td>효능</td>
            <td>1. 해열 및 감기에 의한 동통(통증)과 두통, 치통, 근육통, 허리동통(통증), 생리통, 관절통의 완화</td>
          </tr>
          <tr>
            <td>부작용</td>
            <td>
              <div>
                1) 쇽: 쇽, 아나필락시양 증상(과민성유사증상: 호흡곤란, 온몸이 붉어짐, 혈관부기, 두드러기 등), 천식발작
              </div>
              <div>
                2) 혈액: 혈소판 감소, 과립구감소, 용혈성빈혈, 메트헤모글로빈혈증, 혈소판기능 저하(출혈시간 연장), 청색증
              </div>
              <div>3) 과민증: 과민증상(얼굴부기, 호흡곤란, 땀이 남, 저혈압, 쇽)</div>
              <div>
                4) 소화기: 구역, 구토, 식욕부진, 장기복용시 위장출혈, 소화성궤양, 천공(뚫림) 등의 위장관계 이상반응
              </div>
            </td>
          </tr>
          <tr>
            <td>금기사항</td>
            <td>
              <div>1) 이 약에 과민증 환자</div>
              <div>2) 소화성궤양 환자</div>
              <div>3) 심한 혈액 이상 환자</div>
              <div>4) 심한 간장애 환자</div>
            </td>
          </tr>
          <tr>
            <td>주의사항</td>
            <td>
              <div>1) 간장애 또는 그 병력이 있는 환자</div>
              <div>2) 신장(콩팥)장애 또는 그 병력이 있는 환자</div>
              <div>3) 소화성궤양의 병력이 있는 환자</div>
              <div>4) 혈액이상 또는 그 병력이 있는 환자</div>
            </td>
          </tr>
        </tbody>
      </Table>
    </Layout>
  );
};

export default TableExample;
