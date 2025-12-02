package com.bookbazaar.repository;


import org.springframework.data.jpa.repository.JpaRepository;

import com.bookbazaar.entity.BulkOrder;


public interface BulkOrderRepository extends JpaRepository<BulkOrder, Long> {}