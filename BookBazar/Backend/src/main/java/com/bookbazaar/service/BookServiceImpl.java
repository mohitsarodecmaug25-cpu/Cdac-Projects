package com.bookbazaar.service;

import com.bookbazaar.dto.BookRequest;
import com.bookbazaar.entity.Book;
import com.bookbazaar.repository.BookRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class BookServiceImpl implements BookService {

    @Autowired
    private BookRepository repo;

    @Override
    public Book addBook(BookRequest req) {
        Book b = new Book();
        b.setTitle(req.getTitle());
        b.setAuthor(req.getAuthor());
        b.setCategory(req.getCategory());
        b.setPrice(req.getPrice());
        b.setQuantity(req.getQuantity());   
        b.setDescription(req.getDescription());
        b.setImageUrl(req.getImageUrl());
        return repo.save(b);
    }

    @Override
    public Book updateBook(Long id, BookRequest req) {
        Book b = repo.findById(id)
                .orElseThrow(() -> new RuntimeException("Book not found"));

        b.setTitle(req.getTitle());
        b.setAuthor(req.getAuthor());
        b.setCategory(req.getCategory());
        b.setPrice(req.getPrice());
        b.setQuantity(req.getQuantity());   // ✔ correct
        b.setDescription(req.getDescription());
        b.setImageUrl(req.getImageUrl());

        return repo.save(b);
    }

    @Override
    public void deleteBook(Long id) {
        repo.deleteById(id);
    }

    @Override
    public Book getBook(Long id) {
        return repo.findById(id)
                .orElseThrow(() -> new RuntimeException("Book not found"));
    }

    @Override
    public List<Book> getAllBooks() {
        return repo.findAll();
    }
}
