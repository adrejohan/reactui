import React from "react";
import { Search as SearchIcon } from "@mui/icons-material";

const SearchBar = ({ searchTerm, setSearchTerm }) => {
  return (
    <div className="input-container">
      <span className="icon">
        <SearchIcon />
      </span>
      <input
        className="search-text"
        type="text"
        placeholder="Search...."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />
    </div>
  );
};

export default SearchBar;
