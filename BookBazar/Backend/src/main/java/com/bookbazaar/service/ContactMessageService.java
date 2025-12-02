package com.bookbazaar.service;



import org.springframework.stereotype.Service;

import com.bookbazaar.dto.ContactMessageRequest;
import com.bookbazaar.entity.ContactMessage;
import com.bookbazaar.repository.ContactMessageRepository;

@Service
public class ContactMessageService {

    private final ContactMessageRepository repository;

    public ContactMessageService(ContactMessageRepository repository) {
        this.repository = repository;
    }

    public ContactMessage sendMessage(ContactMessageRequest request) {
        ContactMessage msg = ContactMessage.builder()
                .fullName(request.getFullName())
                .email(request.getEmail())
                .phoneNumber(request.getPhoneNumber())
                .message(request.getMessage())
                .build();

        return repository.save(msg);
    }
}
