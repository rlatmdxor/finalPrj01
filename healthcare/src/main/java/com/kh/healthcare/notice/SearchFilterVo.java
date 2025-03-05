package com.kh.healthcare.notice;

import lombok.Data;

@Data
public class SearchFilterVo {
    private String searchValue;
    private String searchType;
    private String order;
}
