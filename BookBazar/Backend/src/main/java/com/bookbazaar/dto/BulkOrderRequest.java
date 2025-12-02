package com.bookbazaar.dto;

import lombok.Data;

@Data
public class BulkOrderRequest {
    private String fullName;
    private String email;
    private String phoneNumber;
    private int quantity;
    private String details;
}