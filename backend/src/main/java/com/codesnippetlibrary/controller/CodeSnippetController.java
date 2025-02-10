package com.codesnippetlibrary.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import com.codesnippetlibrary.service.CodeSnippetService;
import com.codesnippetlibrary.model.CodeSnippet;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/snippets")
@CrossOrigin(origins = "http://localhost:3000")  // Allow requests from React frontend
public class CodeSnippetController {

    @Autowired
    private CodeSnippetService snippetService;

    // Add a new code snippet
    @PostMapping("/add")
    public ResponseEntity<?> addSnippet(@RequestBody CodeSnippet snippet) {
        if (snippet.getTitle() == null || snippet.getLanguage() == null || snippet.getCode() == null) {
            return ResponseEntity.badRequest().body("Title, language, and code are required fields.");
        }
        CodeSnippet savedSnippet = snippetService.saveSnippet(snippet);
        return ResponseEntity.ok(savedSnippet);
    }

    // Get a snippet by ID
    @GetMapping("/{id}")
    public ResponseEntity<?> getSnippetById(@PathVariable Long id) {
        Optional<CodeSnippet> snippet = snippetService.getSnippetById(id);
        if (snippet.isPresent()) {
            return ResponseEntity.ok(snippet.get());
        } else {
            return ResponseEntity.badRequest().body("Snippet not found with ID: " + id);
        }
    }

    // Search snippets by language
    @GetMapping("/search")
    public ResponseEntity<List<CodeSnippet>> searchSnippetsByLanguage(@RequestParam String language) {
        List<CodeSnippet> snippets;
        if (language.equalsIgnoreCase("all")) {
            snippets = snippetService.getAllSnippets();  // Fetch all if language = "all"
        } else {
            snippets = snippetService.getSnippetsByLanguage(language);
        }
        return ResponseEntity.ok(snippets);
    }

    // Delete a snippet by ID
    @DeleteMapping("/delete/{id}")
    public ResponseEntity<String> deleteSnippet(@PathVariable Long id) {
        boolean deleted = snippetService.deleteSnippet(id);
        if (deleted) {
            return ResponseEntity.ok("Snippet deleted successfully.");
        } else {
            return ResponseEntity.badRequest().body("Snippet with ID " + id + " not found.");
        }
    }
}
