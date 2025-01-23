import styled from 'styled-components';

const TitleDiv = styled.div`
  font-size: 20px;
  font-weight: 900;
  width: 500px;
  height: 90px;
  box-sizing: border-box;
  padding: 20px;
  position: absolute;
`;
const ModalTitle = ({ children }) => {
  return <TitleDiv>{children}</TitleDiv>;
};

export default ModalTitle;
