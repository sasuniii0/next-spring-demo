package com.example.next_demo.service;

import com.example.next_demo.dto.ApiResponse;
import com.example.next_demo.dto.UserDetail;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Service
@RequiredArgsConstructor
public class UserService {
    private final RestTemplate restTemplate;

    public ApiResponse getFilteredUserData() {
        String url = "https://jsonplaceholder.typicode.com/todos/";
        Object[] todos = restTemplate.getForObject(url, Object[].class);

        List<UserDetail> details = new ArrayList<>();
        if (todos != null) {
            for (Object obj : todos) {
                Map<String, Object> todo = (Map<String, Object>) obj;

                // FIX: Use "id" (unique 1-200) instead of "userId" (repeats 1-10)
                int uniqueId = (int) todo.get("id");
                String title = (String) todo.get("title");
                boolean completed = (boolean) todo.get("completed");

                String status = completed ? "ACTIVE" : "INACTIVE";

                // Map to your custom structure
                details.add(new UserDetail(uniqueId, title, status));
            }
        }

        ApiResponse response = new ApiResponse();
        response.setCode("0000");
        response.setTitle("SUCCESS");
        response.setMessage("");

        Map<String, List<UserDetail>> dataMap = new HashMap<>();
        dataMap.put("user_details", details);
        response.setData(dataMap);

        return response;
    }
}
