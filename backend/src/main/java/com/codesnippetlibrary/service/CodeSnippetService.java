package com.codesnippetlibrary.service;

import com.codesnippetlibrary.model.CodeSnippet;
import com.codesnippetlibrary.repository.CodeSnippetRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.util.List;
import java.util.Optional;

@Service
public class CodeSnippetService {

    @Autowired
    private CodeSnippetRepository snippetRepository;

    // Save a new snippet
    public CodeSnippet saveSnippet(CodeSnippet snippet) {
        return snippetRepository.save(snippet);
    }

    // Get a snippet by ID
    public Optional<CodeSnippet> getSnippetById(Long id) {
        return snippetRepository.findById(id);
    }

    // Get snippets by programming language
    public List<CodeSnippet> getSnippetsByLanguage(String language) {
        return snippetRepository.findByLanguageIgnoreCase(language);
    }

    // Get all snippets (for 'all' search)
    public List<CodeSnippet> getAllSnippets() {
        return snippetRepository.findAll();
    }

    // Delete a snippet by ID
    public boolean deleteSnippet(Long id) {
        if (snippetRepository.existsById(id)) {
            snippetRepository.deleteById(id);
            return true;
        }
        return false;
    }
}
