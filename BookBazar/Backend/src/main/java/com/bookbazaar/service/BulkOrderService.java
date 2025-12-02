package com.bookbazaar.service;


import org.springframework.stereotype.Service;

import com.bookbazaar.dto.BulkOrderRequest;
import com.bookbazaar.entity.BulkOrder;
import com.bookbazaar.repository.BulkOrderRepository;

@Service
public class BulkOrderService {

    private final BulkOrderRepository repository;

    public BulkOrderService(BulkOrderRepository repository) {
        this.repository = repository;
    }

    public BulkOrder placeOrder(BulkOrderRequest request) {
        BulkOrder order = BulkOrder.builder()
                .fullName(request.getFullName())
                .email(request.getEmail())
                .phoneNumber(request.getPhoneNumber())
                .quantity(request.getQuantity())
                .details(request.getDetails())
                .build();

        return repository.save(order);
    }
}
