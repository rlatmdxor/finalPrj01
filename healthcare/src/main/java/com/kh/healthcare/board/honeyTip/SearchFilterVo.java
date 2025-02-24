package com.kh.healthcare.board.honeyTip;

import lombok.Data;

@Data
public class SearchFilterVo {
    private String searchValue;
    private String category;
    private String searchType;
    private String order;
}
