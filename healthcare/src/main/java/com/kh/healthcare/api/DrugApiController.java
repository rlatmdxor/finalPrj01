package com.kh.healthcare.api;
import jakarta.servlet.http.HttpServletRequest;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;


import java.io.InputStreamReader;
import java.net.HttpURLConnection;
import java.net.URL;
import java.net.URLEncoder;
import java.io.BufferedReader;
import java.io.IOException;

import org.springframework.web.bind.annotation.*;
import java.io.*;
import java.net.*;

@RestController
@RequestMapping("api/drug/impo")
public class DrugApiController {

    @GetMapping
    public String getDrugInfo(HttpServletRequest request) throws IOException {
        String itemName = request.getParameter("item_name"); // ❗ 직접 파라미터 가져오기
        if (itemName == null) itemName = ""; // 기본값 처리

        System.out.println("Received item_name: " + itemName); // ✅ 입력값 확인

        StringBuilder urlBuilder = new StringBuilder("http://apis.data.go.kr/1471000/MdcinGrnIdntfcInfoService01/getMdcinGrnIdntfcInfoList01");
        urlBuilder.append("?" + URLEncoder.encode("serviceKey","UTF-8") + "=SWRF1mie7BFiwR2oy4fm0OtZaMMJP5rOk1JgjLEjWFjPRXItOa9%2FRbAnSqz1tUVRFGViVceSUmtBBF%2FJRo6MaA%3D%3D");
        urlBuilder.append("&" + URLEncoder.encode("item_name","UTF-8") + "=" + URLEncoder.encode(itemName, "UTF-8"));
        urlBuilder.append("&" + URLEncoder.encode("type","UTF-8") + "=" + URLEncoder.encode("json", "UTF-8"));

        String requestUrl = urlBuilder.toString();
        System.out.println("Request URL: " + requestUrl); // ✅ API 요청 URL 확인

        URL url = new URL(requestUrl);
        HttpURLConnection conn = (HttpURLConnection) url.openConnection();
        conn.setRequestMethod("GET");
        conn.setRequestProperty("Content-type", "application/json");
        System.out.println("Response code: " + conn.getResponseCode());

        BufferedReader rd;
        if(conn.getResponseCode() >= 200 && conn.getResponseCode() <= 300) {
            rd = new BufferedReader(new InputStreamReader(conn.getInputStream()));
        } else {
            rd = new BufferedReader(new InputStreamReader(conn.getErrorStream()));
        }

        StringBuilder sb = new StringBuilder();
        String line;
        while ((line = rd.readLine()) != null) {
            sb.append(line);
        }
        rd.close();
        conn.disconnect();

        System.out.println("Response Data: " + sb.toString()); // ✅ 응답 데이터 확인
        return sb.toString();
    }
}
