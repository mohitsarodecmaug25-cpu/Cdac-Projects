package com.bookbazaar.dto;

import lombok.Data;

@Data
public class BookRequest {
    private String title;
    private String author;
    private String category;
    private double price;
    private int quantity;
    private String description;
    private String imageUrl;
    private String isbn;
}
