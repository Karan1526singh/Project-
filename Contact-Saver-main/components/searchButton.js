"use client";
import { Plus, Search } from "lucide-react";
import React, { useState } from "react";

const SearchButton = ({ onSearch, users, formVisible, setFormVisible }) => {
  const [search, setSearch] = useState(false);
  const [query, setQuery] = useState("");

  const handleSearchToggle = () => {
    setSearch(!search);
    setQuery("");
    onSearch(""); // Clear the search on toggle
  };

  const handleInputChange = (e) => {
    const value = e.target.value;
    setQuery(value);
    onSearch(value);
  };

  return (
    <div className="backdrop-blur-3xl shadow pb-5 sticky top-0 pt-5">
      <div className="flex justify-between">
        <h1 className="text-xl mb-4  text-green-600 font-semibold ">
          All Contacts ( {users.length} )
        </h1>
        <div className="flex items-center gap-5 sm:gap-10">
          <Plus
            onClick={() => setFormVisible(!formVisible)}
            size={40}
            className="cursor-pointer bg-white rounded-full p-1"
          />
          <Search
            onClick={handleSearchToggle}
            size={40}
            className="cursor-pointer bg-white rounded-full p-1"
          />
        </div>
      </div>
      <div className="px-2">
        {search && (
          <input
            type="text"
            placeholder="Search"
            value={query}
            onChange={handleInputChange}
            className="text-lg border border-gray-300 w-full py-2 px-3 rounded-md outline-none"
          />
        )}
      </div>
    </div>
  );
};

export default SearchButton;
