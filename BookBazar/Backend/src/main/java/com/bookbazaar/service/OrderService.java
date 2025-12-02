package com.bookbazaar.service;

import com.bookbazaar.dto.OrderRequest;
import com.bookbazaar.entity.Book;
import com.bookbazaar.entity.Order;
import com.bookbazaar.entity.OrderItem;
import com.bookbazaar.repository.BookRepository;
import com.bookbazaar.repository.OrderItemRepository;
import com.bookbazaar.repository.OrderRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

@Service
public class OrderService {

    @Autowired
    private OrderRepository orderRepo;

    @Autowired
    private OrderItemRepository itemRepo;

    @Autowired
    private BookRepository bookRepo;

    public Order placeOrder(OrderRequest request) {

        Order order = new Order();
        order.setUserId(request.getUserId());
        order.setOrderDate(LocalDateTime.now());
        order.setStatus("PLACED");

        List<OrderItem> items = new ArrayList<>();
        double total = 0;

        for (OrderRequest.OrderItemRequest i : request.getItems()) {
            Book book = bookRepo.findById(i.getBookId())
                    .orElseThrow(() -> new RuntimeException("Book not found"));

            if (book.getQuantity() < i.getQuantity()) {
                throw new RuntimeException("Book stock insufficient");
            }

            // Reduce stock
            book.setQuantity(book.getQuantity() - i.getQuantity());
            bookRepo.save(book);

            OrderItem item = new OrderItem();
            item.setBookId(book.getId());
            item.setQuantity(i.getQuantity());
            item.setPrice(book.getPrice());
            item.setOrder(order);

            items.add(item);

            total += book.getPrice() * i.getQuantity();
        }

        order.setTotalAmount(total);

        order = orderRepo.save(order);
        itemRepo.saveAll(items);

        order.setItems(items);

        return order;
    }

    public List<Order> getOrdersByUser(Long userId) {
        return orderRepo.findByUserId(userId);
    }

    public List<Order> getAllOrders() {
        return orderRepo.findAll();
    }
}
