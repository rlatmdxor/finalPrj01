package com.kh.healthcare.admin.userManage;

import lombok.Data;

@Data
public class UserSearchFilterVo {
    private String searchType;
    private String searchValue;
    private String order;

}
