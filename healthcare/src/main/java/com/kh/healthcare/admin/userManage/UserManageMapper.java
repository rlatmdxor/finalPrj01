package com.kh.healthcare.admin.userManage;

import org.apache.ibatis.annotations.*;

import java.util.List;

@Mapper
public interface UserManageMapper {

    @Select("""
            <script>
                SELECT NO, NAME, ID, NICK, EMAIL, ENROLL_DATE, DEL_YN
                FROM (
                    SELECT M.NO, M.NAME, M.ID, M.NICK, M.EMAIL, M.DEL_YN, M.ENROLL_DATE,
                           ROW_NUMBER() OVER (ORDER BY NO) AS RN
                    FROM MEMBER M
                    WHERE 1=1
                    <!-- ✅ 모든 유저 / 활성 유저 / 탈퇴 유저 선택 가능 -->
                    <if test='delYn != null and delYn != ""'>
                        AND M.DEL_YN = #{delYn}
                    </if>
                    <!-- ✅ 검색 조건 적용 -->
                    <if test='searchType != null and searchType != "" and keyword != null and keyword != ""'>
                        <choose>
                            <when test='searchType == "name"'>
                                AND M.NAME LIKE '%' || #{keyword} || '%'
                            </when>
                            <when test='searchType == "id"'>
                                AND M.ID LIKE '%' || #{keyword} || '%'
                            </when>
                            <when test='searchType == "nick"'>
                                AND M.NICK LIKE '%' || #{keyword} || '%'
                            </when>
                            <when test='searchType == "email"'>
                                AND M.EMAIL LIKE '%' || #{keyword} || '%'
                            </when>
                        </choose>
                    </if>
                )
                WHERE RN BETWEEN #{offset} + 1 AND #{offset} + #{size}
            </script>
    """)
    List<UserManageVo> searchUsers(
            @Param("keyword") String keyword,
            @Param("searchType") String searchType,
            @Param("delYn") String delYn,
            @Param("size") int size,
            @Param("offset") int offset
    );


    @Select("""
        <script>
            SELECT COUNT(*)
            FROM MEMBER M
            WHERE 1=1

            <!-- 삭제 여부 검색 -->
            <if test='delYn != null and delYn != ""'>
                AND M.DEL_YN = #{delYn}
            </if>

            <!-- 검색 조건 추가 -->
            <if test='searchType != null and searchType != "" and keyword != null and keyword != ""'>
                <choose>
                    <when test='searchType == "name"'>
                        AND M.NAME LIKE '%' || #{keyword} || '%'
                    </when>
                    <when test='searchType == "id"'>
                        AND M.ID LIKE '%' || #{keyword} || '%'
                    </when>
                    <when test='searchType == "nick"'>
                        AND M.NICK LIKE '%' || #{keyword} || '%'
                    </when>
                    <when test='searchType == "email"'>
                        AND M.EMAIL LIKE '%' || #{keyword} || '%'
                    </when>
                </choose>
            </if>
        </script>
    """)
    int countUsers(
            @Param("keyword") String keyword,
            @Param("searchType") String searchType,
            @Param("delYn") String delYn
    );

    @Update("""
        UPDATE MEMBER
        SET DEL_YN = 'Y'
        WHERE ID = #{id}
    """)
    void delete(UserManageVo vo);

}