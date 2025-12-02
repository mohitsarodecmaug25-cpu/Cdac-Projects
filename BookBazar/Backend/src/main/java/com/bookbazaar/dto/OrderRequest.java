package com.bookbazaar.dto;

import lombok.Data;
import java.util.List;

@Data
public class OrderRequest {

    private Long userId;

    private List<OrderItemRequest> items;

    @Data
    public static class OrderItemRequest {
        private Long bookId;
        private Integer quantity;
    }
}
