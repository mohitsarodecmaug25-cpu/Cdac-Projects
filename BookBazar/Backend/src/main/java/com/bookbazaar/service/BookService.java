package com.bookbazaar.service;

import com.bookbazaar.dto.BookRequest;
import com.bookbazaar.entity.Book;

import java.util.List;

public interface BookService {
    Book addBook(BookRequest req);
    Book updateBook(Long id, BookRequest req);
    void deleteBook(Long id);
    Book getBook(Long id);
    List<Book> getAllBooks();
}
