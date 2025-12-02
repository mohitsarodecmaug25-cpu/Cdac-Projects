package com.bookbazaar.dto;


import lombok.Data;

@Data
public class ContactMessageRequest {
    private String fullName;
    private String email;
    private String phoneNumber;
    private String message;
}
