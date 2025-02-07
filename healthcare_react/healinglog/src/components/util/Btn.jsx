import styled from 'styled-components';

const CommonBtn = styled.button`
  display: flex;
  background-color: ${(props) => {
    return props.c;
  }};
  width: ${({ w }) => (w ? `${w}px` : '70px')};
  height: ${({ h }) => (h ? `${h}px` : '35px')};
  border-radius: 15px;
  border: none;
  font-size: ${({ fs }) => (fs ? `${fs}px` : '17px')};
  font-weight: bold;
  color: ${({ fc }) => (fc ? `${fc}` : 'black')};
  align-items: center;
  justify-content: center;
  cursor: pointer;
  margin-top: ${({ mt }) => (mt ? `${mt}px` : '30px')};
  margin-bottom: ${({ mb }) => (mb ? `${mb}px` : '30px')};
  margin-left: ${({ ml }) => (ml ? `${ml}px` : '0px')};
  margin-right: ${({ mr }) => (mr ? `${mr}px` : '50px')};
`;

const Btn = ({ type, str, f, c, fc, w, h, fs, mt, mb, mr, ml, title }) => {
  return (
    <CommonBtn
      ml={ml}
      title={title}
      type={type || 'button'}
      onClick={f}
      c={c}
      fc={fc}
      fs={fs}
      w={w}
      h={h}
      mt={mt}
      mb={mb}
      mr={mr}
    >
      {str}
    </CommonBtn>
  );
};

export default Btn;
