package com.kh.healthcare.board.honeyTip;

import lombok.Data;

@Data
public class HoneyTipCommentVo {
    private String no;
    private String memberNo;
    private String boardNo;
    private String content;
    private String enrollDate;
    private String modifyDate;
    private String delYn;
    private String nick;
}
