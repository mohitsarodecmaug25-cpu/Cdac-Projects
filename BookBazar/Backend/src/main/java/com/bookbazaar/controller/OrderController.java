package com.bookbazaar.controller;

import com.bookbazaar.dto.OrderRequest;
import com.bookbazaar.entity.Order;
import com.bookbazaar.service.OrderService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/orders")
public class OrderController {

    @Autowired
    private OrderService service;

    @PostMapping
    public Order placeOrder(@RequestBody OrderRequest request) {
        return service.placeOrder(request);
    }

    @GetMapping("/user/{userId}")
    public List<Order> getUserOrders(@PathVariable Long userId) {
        return service.getOrdersByUser(userId);
    }

    @GetMapping
    public List<Order> getAllOrders() {
        return service.getAllOrders();
    }
}
