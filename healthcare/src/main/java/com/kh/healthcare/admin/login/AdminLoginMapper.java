package com.kh.healthcare.admin.login;

import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Select;

@Mapper
public interface AdminLoginMapper {


    @Select("""
            SELECT
                NO
                ,ID
                ,PWD
                ,NICK
            FROM
                ADMIN
            WHERE
                ID = #{id}
            """)
    AdminLoginVo findAdminById(String id);

}
