import React, { useState, useRef } from 'react';
import { convertToRaw, RichUtils } from 'draft-js';
import Editor, { createEditorStateWithText } from '@draft-js-plugins/editor';
import createTextAlignmentPlugin from '@draft-js-plugins/text-alignment';
import createLinkPlugin from '@draft-js-plugins/anchor';
import '@draft-js-plugins/static-toolbar/lib/plugin.css';
import '@draft-js-plugins/text-alignment/lib/plugin.css';
import {
  ItalicButton,
  BoldButton,
  UnderlineButton,
  HeadlineOneButton,
  HeadlineTwoButton,
  HeadlineThreeButton,
  UnorderedListButton,
  OrderedListButton,
} from '@draft-js-plugins/buttons';
import createToolbarPlugin from '@draft-js-plugins/static-toolbar';
import styled from 'styled-components';

const staticToolbarPlugin = createToolbarPlugin();
const textAlignmentPlugin = createTextAlignmentPlugin();
const linkPlugin = createLinkPlugin({
  placeholder: 'http://…',
});
const { Toolbar } = staticToolbarPlugin;
const plugins = [staticToolbarPlugin, textAlignmentPlugin, linkPlugin];
const text = '';

const LayoutDiv = styled.div`
  display: grid;
  grid-template-columns: 100%;
  grid-template-rows: auto 400px;
  width: 100%;
  height: 100%;
`;

const ToolbarDiv = styled.div`
  & > div {
    display: flex;
    background-color: #fbfbfb;
    align-items: center;
  }

  & .toolbar-select {
    width: 80px;
    height: 26px;
    margin: 0px 10px;
  }
`;

const ContentDiv = styled.div`
  width: 100%;
  height: 100%;
  box-sizing: border-box;
  padding: 18px;
  border-left: 1px solid #d8d8d8;
  border-right: 1px solid #d8d8d8;
  border-bottom: 1px solid #d8d8d8;
  overflow: auto;

  .public-DraftEditorPlaceholder-root {
    color: #808080;
  }
`;

const BoardEditor = ({ onChangeContent }) => {
  const [editorState, setEditorState] = useState(() => createEditorStateWithText(text));
  const [isFocused, setIsFocused] = useState(false);

  const editorRef = useRef(null);

  const focus = () => {
    if (editorRef.current) {
      editorRef.current.focus();
      setIsFocused(true);
    }
  };

  const handleEditorChange = (newEditorState) => {
    setEditorState(newEditorState);
    const rawContent = JSON.stringify(convertToRaw(newEditorState.getCurrentContent()));
    onChangeContent(rawContent);
  };

  return (
    <LayoutDiv className="editor" onClick={focus}>
      <ToolbarDiv>
        <Toolbar className="toolbar">
          {(externalProps) => (
            <>
              <ItalicButton {...externalProps} />
              <BoldButton {...externalProps} />
              <UnderlineButton {...externalProps} />
              <textAlignmentPlugin.TextAlignment {...externalProps} />
              <HeadlineOneButton {...externalProps} />
              <HeadlineTwoButton {...externalProps} />
              <HeadlineThreeButton {...externalProps} />
              <UnorderedListButton {...externalProps} />
              <OrderedListButton {...externalProps} />
              <linkPlugin.LinkButton {...externalProps} />
            </>
          )}
        </Toolbar>
      </ToolbarDiv>
      <ContentDiv>
        <Editor
          editorState={editorState}
          onChange={handleEditorChange}
          plugins={plugins}
          ref={editorRef}
          placeholder={isFocused ? '' : '내용을 입력해주세요.'}
        />
      </ContentDiv>
    </LayoutDiv>
  );
};

export default BoardEditor;
