package com.bookbazaar.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.bookbazaar.entity.ContactMessage;


public interface ContactMessageRepository extends JpaRepository<ContactMessage, Long> {}