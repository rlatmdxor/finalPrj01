package com.kh.healthcare.OpenAI;

import com.kh.healthcare.diet.DietReportVo;
import com.kh.healthcare.livingHealth.sleep.SleepVo;
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
    private final UserHealthService service;

    @PostMapping
    public ResponseEntity<String> chat(@RequestBody MessageVo vo, @RequestHeader("Authorization") String token){

        HttpHeaders httpHeaders = new HttpHeaders();
        httpHeaders.add("Authorization", "Bearer " + key);

        String message = vo.getContent();

        Map<String, Object> requestBody = new HashMap<>();
        requestBody.put("model", model);
        requestBody.put("max_tokens", 300);
        requestBody.put("temperature", 0.4);
        requestBody.put("n", 1);

        String prompt = """
                너의 이름은 '힐링챗봇' 이고 너는 건강관리 조언가야.
                건강에 대한 간결하고 정확한 답변을 해줘. 응답에 마크다운 기호(**, *, -, # 등)는 사용하지 말고, 평범한 문장으로만 답변해줘.
                사용자가 건강관리에 대한 질문 아닌 다른 질문을 했을 때에도 건강과 관련되게 답변해줘. 친절하고 친근한 태도를 유지하며, 존댓말로 답변을 해줘.
                외래어를 말할 때는 알파벳을 쓰지 말고 한글로 대답해줘.
                """;

        List<Map<String, String>> messages = new ArrayList<>();
        messages.add(Map.of("role", "system", "content", prompt));
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

    @GetMapping
    public UserHealthVo getUserHealthData(@RequestHeader("Authorization") String token) {
        try {
            UserHealthVo voList = service.getUserHealthData(token);
            return voList;
        }
        catch (Exception e){
            e.printStackTrace();
            throw new IllegalStateException("[ERROR] GET USER HEALTH DATA FAIL..");
        }
    }
}
