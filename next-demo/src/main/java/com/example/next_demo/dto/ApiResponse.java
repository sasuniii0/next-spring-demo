package com.example.next_demo.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;
import java.util.Map;

@AllArgsConstructor
@NoArgsConstructor
@Data
public class ApiResponse {
    private String code;
    private String title;
    private String message;
    private Map<String, List<UserDetail>> data;
}
