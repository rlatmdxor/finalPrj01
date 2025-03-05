package com.kh.healthcare.notice;

import lombok.Data;

@Data
public class NoticeAttachVo {
    private String no;
    private String boardNo;
    private String originName;
    private String path;
    private String uploadDate;
    private String delYn;
}
