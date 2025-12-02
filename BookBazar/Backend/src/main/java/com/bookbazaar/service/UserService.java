package com.bookbazaar.service;

import com.bookbazaar.dto.LoginRequest;
import com.bookbazaar.dto.SignupRequest;
import com.bookbazaar.entity.User;
import com.bookbazaar.repository.UserRepository;
import com.bookbazaar.security.JwtUtil;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.HashMap;
import java.util.Map;

@Service
public class UserService {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private JwtUtil jwtUtil;

    private BCryptPasswordEncoder passwordEncoder = new BCryptPasswordEncoder();

    // REGISTER (SIGNUP)
    public User register(SignupRequest request) {

        if (userRepository.findByEmail(request.getEmail()).isPresent()) {
            throw new RuntimeException("Email already exists!");
        }

        User user = new User();
        user.setName(request.getName());
        user.setEmail(request.getEmail());
        user.setPassword(passwordEncoder.encode(request.getPassword()));
        user.setPhone(request.getPhone());
        user.setAddress(request.getAddress());
        user.setRole(request.getRole());

        return userRepository.save(user);
    }

    // LOGIN (returns JWT + user info)
    public Map<String, Object> login(LoginRequest request) {

        User user = userRepository.findByEmail(request.getEmail()).orElse(null);
        if (user == null) {
            throw new RuntimeException("Invalid email!");
        }

        if (!passwordEncoder.matches(request.getPassword(), user.getPassword())) {
            throw new RuntimeException("Incorrect password!");
        }

        // Generate JWT token
        String token = jwtUtil.generateToken(user.getEmail(), user.getRole());

        // Response map
        Map<String, Object> response = new HashMap<>();
        response.put("token", token);
        response.put("role", user.getRole());
        response.put("userId", user.getId()); 

        return response;
    }
}
