package com.codesnippetlibrary.repository;

import com.codesnippetlibrary.model.CodeSnippet;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import java.util.List;

@Repository
public interface CodeSnippetRepository extends JpaRepository<CodeSnippet, Long> {
    List<CodeSnippet> findByLanguageIgnoreCase(String language);
}
