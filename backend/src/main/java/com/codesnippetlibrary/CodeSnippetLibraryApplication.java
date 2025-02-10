package com.codesnippetlibrary;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

@SpringBootApplication
public class CodeSnippetLibraryApplication {

    public static void main(String[] args) {
        SpringApplication.run(CodeSnippetLibraryApplication.class, args);
        System.out.println("🚀 Code Snippet Library Backend is running on http://localhost:8080 🚀");
    }
}
