package com.example.next_demo.controller;

import com.example.next_demo.dto.ApiResponse;
import com.example.next_demo.service.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api")
@CrossOrigin(origins = "http://localhost:3000")
@RequiredArgsConstructor
public class TodoController {
    private final UserService userService;

    @GetMapping("/users")
    public ApiResponse getUsers() {
        return userService.getFilteredUserData();
    }
}
