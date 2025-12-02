package com.bookbazaar.controller;

import com.bookbazaar.dto.BookRequest;
import com.bookbazaar.entity.Book;
import com.bookbazaar.service.BookService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/books")
public class BookController {

    @Autowired
    private BookService service;

    @PostMapping
    public Book add(@RequestBody BookRequest req) {
        return service.addBook(req);
    }

    @PutMapping("/{id}")
    public Book update(@PathVariable Long id, @RequestBody BookRequest req) {
        return service.updateBook(id, req);
    }

    @DeleteMapping("/{id}")
    public String delete(@PathVariable Long id) {
        service.deleteBook(id);
        return "Book deleted successfully";
    }

    @GetMapping("/{id}")
    public Book get(@PathVariable Long id) {
        return service.getBook(id);
    }

    @GetMapping
    public List<Book> getAll() {
        return service.getAllBooks();
    }
}
