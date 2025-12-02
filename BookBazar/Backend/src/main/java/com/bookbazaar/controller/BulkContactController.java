package com.bookbazaar.controller;

import com.bookbazaar.dto.BulkOrderRequest;
import com.bookbazaar.dto.ContactMessageRequest;
import com.bookbazaar.entity.BulkOrder;
import com.bookbazaar.entity.ContactMessage;
import com.bookbazaar.repository.BulkOrderRepository;
import com.bookbazaar.repository.ContactMessageRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController

@RequestMapping("/api/contact")
public class BulkContactController {

    @Autowired
    private BulkOrderRepository bulkOrderRepository;

    @Autowired
    private ContactMessageRepository contactMessageRepository;

    // POST: Save Bulk Order
    @PostMapping("/bulk-order")
    public BulkOrder saveBulkOrder(@RequestBody BulkOrderRequest request) {
        BulkOrder order = new BulkOrder();
        order.setFullName(request.getFullName());
        order.setEmail(request.getEmail());
        order.setPhoneNumber(request.getPhoneNumber());
        order.setQuantity(request.getQuantity());
        order.setDetails(request.getDetails());
        return bulkOrderRepository.save(order);
    }

    // GET: Get All Bulk Orders
    @GetMapping("/bulk-order")
    public List<BulkOrder> getAllBulkOrders() {
        return bulkOrderRepository.findAll();
    }

    // POST: Save Contact Message
    @PostMapping("/send-message")
    public ContactMessage saveMessage(@RequestBody ContactMessageRequest request) {
        ContactMessage msg = new ContactMessage();
        msg.setFullName(request.getFullName());
        msg.setEmail(request.getEmail());
        msg.setPhoneNumber(request.getPhoneNumber());
        msg.setMessage(request.getMessage());
        return contactMessageRepository.save(msg);
    }

    // GET: Get All Messages
    @GetMapping("/send-message")
    public List<ContactMessage> getAllMessages() {
        return contactMessageRepository.findAll();
    }
}
