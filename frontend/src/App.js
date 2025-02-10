import React, { useState, useEffect } from 'react';
import './styles/App.css';
import CodeSnippet from './components/CodeSnippet';

const API_URL = process.env.REACT_APP_API_URL;

const App = () => {
  const [snippets, setSnippets] = useState([]);
  const [filteredSnippets, setFilteredSnippets] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [newSnippet, setNewSnippet] = useState({
    title: '',
    language: '',
    code: '',
    description: '',
  });

  useEffect(() => {
    fetchSnippets();
  }, []);

  const fetchSnippets = async () => {
    try {
      const response = await fetch(`${API_URL}/search?language=all`);
      if (!response.ok) throw new Error('Failed to fetch snippets');
      const data = await response.json();
      setSnippets(data.reverse()); // Show the latest snippet at the top
      setFilteredSnippets(data.reverse());
    } catch (error) {
      console.error('Error fetching snippets:', error);
    }
  };

  const handleChange = (e) => {
    setNewSnippet({ ...newSnippet, [e.target.name]: e.target.value });
  };

  const handleAddSnippet = async () => {
    try {
      const response = await fetch(`${API_URL}/add`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newSnippet),
      });
      if (!response.ok) throw new Error('Failed to add snippet');

      const addedSnippet = await response.json();
      setSnippets([addedSnippet, ...snippets]); // Add new snippet at the top
      setFilteredSnippets([addedSnippet, ...filteredSnippets]);

      alert('Snippet added successfully! 🎉');
    } catch (error) {
      alert('Error adding snippet: ' + error.message);
    }
  };

  const handleDeleteSnippet = async (id) => {
    try {
      const response = await fetch(`${API_URL}/delete/${id}`, {
        method: 'DELETE',
      });
      if (!response.ok) throw new Error('Failed to delete snippet');

      const updatedSnippets = snippets.filter(snippet => snippet.id !== id);
      setSnippets(updatedSnippets);
      setFilteredSnippets(updatedSnippets);

      alert('Snippet deleted! 🗑️');
    } catch (error) {
      alert('Error deleting snippet: ' + error.message);
    }
  };

  const handleSearchChange = (e) => {
    const query = e.target.value.toLowerCase();
    setSearchQuery(query);

    const filtered = snippets.filter((snippet) =>
      snippet.title.toLowerCase().includes(query) ||
      snippet.language.toLowerCase().includes(query) ||
      (snippet.description && snippet.description.toLowerCase().includes(query)) ||
      snippet.code.toLowerCase().includes(query)
    );

    setFilteredSnippets(filtered);
  };

  return (
    <div>
      <header>Code Snippet Library 🚀</header>
      <div className="container">
        <h2>Add New Snippet ✍️</h2>
        <input
          name="title"
          placeholder="Title"
          value={newSnippet.title}
          onChange={handleChange}
        />
        <input
          name="language"
          placeholder="Programming Language"
          value={newSnippet.language}
          onChange={handleChange}
        />
        <textarea
          name="code"
          placeholder="Enter your code here..."
          rows="5"
          value={newSnippet.code}
          onChange={handleChange}
        />
        <textarea
          name="description"
          placeholder="Description (optional)"
          rows="2"
          value={newSnippet.description}
          onChange={handleChange}
        />
        <button onClick={handleAddSnippet}>Add Snippet 🚀</button>

        <div className="snippet-header">
          <h2>Available Snippets 📚</h2>
          <input
            type="text"
            placeholder="Search snippets 🔍"
            value={searchQuery}
            onChange={handleSearchChange}
            className="search-input"
          />
        </div>

        {/* Scrollable container for snippet cards */}
        <div className="snippet-container">
          {filteredSnippets.length > 0 ? (
            filteredSnippets.map((snippet) => (
              <CodeSnippet
                key={snippet.id}
                {...snippet}
                onDelete={() => handleDeleteSnippet(snippet.id)}
              />
            ))
          ) : (
            <p>No snippets found matching your search. 😢</p>
          )}
        </div>
      </div>
      <footer>Made with ❤️ by Your Name</footer>
    </div>
  );
};

export default App;
