package com.fitnesstracker.controller;

import com.fitnesstracker.dto.DailySummaryDto;
import com.fitnesstracker.service.SummaryService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDate;

@RestController
@RequestMapping("/api/summary")
@CrossOrigin(origins = "*")
public class SummaryController {

    private final SummaryService summaryService;

    @Autowired
    public SummaryController(SummaryService summaryService) {
        this.summaryService = summaryService;
    }

    @GetMapping("/user/{userId}")
    public ResponseEntity<DailySummaryDto> getDailySummary(
            @PathVariable Long userId,
            @RequestParam(required = false) @DateTimeFormat(iso = DateTimeFormat.ISO.DATE) LocalDate date) {
        LocalDate targetDate = (date != null) ? date : LocalDate.now();
        DailySummaryDto summary = summaryService.getDailySummary(userId, targetDate);
        return ResponseEntity.ok(summary);
    }
}
