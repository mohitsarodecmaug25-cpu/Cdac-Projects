package com.bookbazaar.entity;

import jakarta.persistence.*;
import lombok.*;

@Entity
@Data
@NoArgsConstructor
@AllArgsConstructor
@Table(name = "books")
public class Book {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String title;

    private String author;

    private String category;

    private double price;

    private int quantity;

    @Column(length = 1000)
    private String description;

    private String imageUrl;

    private String isbn;
}
