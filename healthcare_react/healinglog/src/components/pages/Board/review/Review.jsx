import Title from '../../../util/Title';

import ContentLayout from '../../../util/ContentLayout';
import HospitalReview from './HospitalReview';

const Review = () => {
  return (
    <>
      <Title>병원 리뷰 게시판</Title>
      <div></div>
      <ContentLayout>
        <HospitalReview />
      </ContentLayout>
    </>
  );
};

export default Review;
