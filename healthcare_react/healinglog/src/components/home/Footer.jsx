import React from 'react';
import styled from 'styled-components';

const LayoutDiv = styled.div`
  border-top: 1px solid lightgray;
  height: 230px;
`;

const FlexDiv = styled.div`
  display: flex;
  padding: 25px;
  gap: 20px;
`;

const ContentDiv = styled.div`
  display: grid;
  grid-auto-rows: 30px;
  width: 25%;
`;

const Footer = () => {
  return (
    <>
      <LayoutDiv>
        <FlexDiv>
          <ContentDiv>
            <div>🧩</div>
            <div>✖️📷▶️</div>
          </ContentDiv>
          <ContentDiv>
            <b>Use cases</b>
            <br />
            <div>UI design</div>
            <div>UX design</div>
            <div>Wireframing</div>
            <div>Diagramming</div>
          </ContentDiv>
          <ContentDiv>
            <b>Explore</b>
            <br />
            <div>Design</div>
            <div>Prototyping</div>
            <div>Development features</div>
            <div>Design systems</div>
          </ContentDiv>
          <ContentDiv>
            <b>Resources</b>
            <br />
            <div>Blog</div>
            <div>Best practices</div>
            <div>Colors</div>
            <div>Color wheel</div>
          </ContentDiv>
        </FlexDiv>
      </LayoutDiv>
    </>
  );
};

export default Footer;
