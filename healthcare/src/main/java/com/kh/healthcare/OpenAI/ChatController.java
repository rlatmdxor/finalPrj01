package com.kh.healthcare.OpenAI;

import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.*;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.client.RestTemplate;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RestController
@RequiredArgsConstructor
@RequestMapping("api/chat")
public class ChatController {

    @Value("${openai.model}")
    private String model;

    @Value("${openai.api.key}")
    private String key;

    @Value("${openai.api.url}")
    private String url;

    private final RestTemplate restTemplate;

    @PostMapping
    public ResponseEntity<String> chat(@RequestBody MessageVo vo, @RequestHeader("Authorization") String token){

        System.out.println("vo = " + vo);
        HttpHeaders httpHeaders = new HttpHeaders();
        httpHeaders.add("Authorization", "Bearer " + key);

        String message = vo.getContent();
        System.out.println("message = " + message);

        Map<String, Object> requestBody = new HashMap<>();
        requestBody.put("model", model);

        List<Map<String, String>> messages = new ArrayList<>();
        messages.add(Map.of("role", "user", "content", message));
        requestBody.put("messages", messages);

        HttpEntity<Map<String, Object>> requestEntity = new HttpEntity<>(requestBody, httpHeaders);

        ResponseEntity<Map> response = restTemplate.exchange(
                url,
                HttpMethod.POST,
                requestEntity,
                Map.class
        );

        if (response.getStatusCode() == HttpStatus.OK && response.getBody() != null) {
            List<Map<String, Object>> choices = (List<Map<String, Object>>) response.getBody().get("choices");
            if (choices != null && !choices.isEmpty()) {
                Map<String, Object> messageObj = (Map<String, Object>) choices.get(0).get("message");
                String chatResponse = (String) messageObj.get("content");
                return ResponseEntity.ok(chatResponse);

            }
        }

        return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("AI 응답 실패");

    }
}
