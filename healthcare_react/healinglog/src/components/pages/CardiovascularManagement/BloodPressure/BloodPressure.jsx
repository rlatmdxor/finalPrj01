import React from 'react';
import Calendar from '../../../util/Calendar'; // 캘린더 컴포넌트
import Modal from '../../../util/Modal'; // 모달 컴포넌트
import Input from '../../../util/Input'; // 입력 컴포넌트
import Title from '../../../util/Title';

const BloodPressure = () => {
  // 표시할 데이터 정의 (예시)
  const events = {
    '2025-1-8': ['1980 Kcal', '5L 물 섭취'],
    '2025-1-9': ['1451 Kcal', '1시간 운동'],
    '2025-1-14': ['1000 ml', '6시간 수면'],
  };

  return (
    <div>
      <Title>혈압</Title>
      <Modal title="캘린더 모달">
        {/* 모달 내용 */}
        <div>
          <Input type="text" placeholder="이벤트 내용을 입력하세요" size="size3" mb={20} />
        </div>
      </Modal>

      <Calendar
        modalTitle="캘린더 모달"
        vo={[]} // 이벤트 정보 배열 (필요시 서버에서 가져온 데이터 사용)
        events={events} // 날짜별 데이터를 캘린더에 전달
        width={800}
        height={100}
      />
    </div>
  );
};

export default BloodPressure;
