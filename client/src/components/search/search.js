import React from "react";

const SearchBar = (props) => {
    return (
        <div className="search-container">
        <form action="/guest/search" method="post">
            <input type="text" className="searchTerm" name="searchTerm" id="searchTerm" placeholder="search" />
            <button type="submit"><i className="fa fa-search"></i></button>
        </form>
        </div>
    );
};

export default SearchBar;
