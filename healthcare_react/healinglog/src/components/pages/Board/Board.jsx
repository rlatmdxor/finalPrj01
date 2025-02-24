import Title from '../../util/Title';

import ContentLayout from '../../util/ContentLayout';
import HoneytipBoard from './HoneytipBoard';

const Board = () => {
  return (
    <>
      <Title>꿀팁게시판</Title>
      <div></div>
      <ContentLayout>
        <HoneytipBoard />
      </ContentLayout>
    </>
  );
};

export default Board;
