import React, { useState } from 'react';

const CodeSnippet = ({ title, language, code, description, onDelete }) => {
  const [copySuccess, setCopySuccess] = useState(false);

  // Function to copy code to clipboard
  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(code);
      setCopySuccess(true);
      setTimeout(() => setCopySuccess(false), 2000);  // Reset after 2 seconds
    } catch (err) {
      console.error('Failed to copy!', err);
    }
  };

  return (
    <div className="snippet-card">
      <h3>{title} ✨</h3>
      <p><strong>Language:</strong> {language} 💻</p>
      <pre><code>{code}</code></pre>
      {description && <p>{description}</p>}

      <div className="button-group">
        <button onClick={handleCopy}>
          {copySuccess ? 'Copied! 📋' : 'Copy Code 📄'}
        </button>
        <button onClick={onDelete}>Delete 🗑️</button>
      </div>
    </div>
  );
};

export default CodeSnippet;
