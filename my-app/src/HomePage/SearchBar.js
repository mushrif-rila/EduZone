import React, { useState } from "react";
import { Input } from "@material-tailwind/react";

const SearchBarWithSuggestions = () => {
  const [query, setQuery] = useState("");
  const [filteredSuggestions, setFilteredSuggestions] = useState([]);

  // Example list of suggestions
  const suggestions = [
    "Apple",
    "Banana",
    "Orange",
    "Mango",
    "Grapes",
    "Strawberry",
    "Pineapple",
    "Watermelon",
  ];

  // Handles the input change and filters suggestions based on the query
  const handleInputChange = (e) => {
    const userInput = e.target.value;
    setQuery(userInput);

    // Filter suggestions based on the input query
    const filtered = suggestions.filter((item) =>
      item.toLowerCase().includes(userInput.toLowerCase())
    );
    setFilteredSuggestions(filtered);
  };

  // Handles when a suggestion is clicked
  const handleSuggestionClick = (suggestion) => {
    setQuery(suggestion);
    setFilteredSuggestions([]); // Clear suggestions after a selection
  };

  return (
    <div className="search-bar">

        <Input 
        label="Search Courses" 
        value={query}
        onChange={handleInputChange} 
        icon={<i className="fas fa-search" />} />
        
      {/* <input
        type="text"
        value={query}
        onChange={handleInputChange}
        placeholder="Search..."
      /> */}

      {filteredSuggestions.length > 0 && (
        <ul className="suggestions-list">
          {filteredSuggestions.map((suggestion, index) => (
            <li
              key={index}
              onClick={() => handleSuggestionClick(suggestion)}
            >
              {suggestion}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default SearchBarWithSuggestions;
