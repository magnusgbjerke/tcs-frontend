"use client";

import React, { useEffect, useRef, useState } from "react";

interface SearchbarProps {
  placeholder: string;
  data: any[];
  onSearch: (query: string) => void;
  onChange: (query: string) => void;
  onClick: (query: any) => void;
  size?: "xs" | "sm" | "md" | "lg" | "full";
}

export const Searchbar: React.FC<SearchbarProps> = ({
  placeholder,
  data,
  onSearch,
  onChange,
  onClick,
  size = "md",
}) => {
  const [query, setQuery] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const searchBarRef = useRef<HTMLDivElement | null>(null);

  const sizeStyles = {
    xs: "max-w-xs",
    sm: "max-w-sm",
    md: "max-w-md",
    lg: "max-w-lg",
    full: "",
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setQuery(e.target.value);
    const searchQuery = e.target.value.toLowerCase();

    if (searchQuery.length > 0) {
      onChange(searchQuery.toLowerCase());
      setIsOpen(true);
    } else {
      setIsOpen(false);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      setQuery("");
      setIsOpen(false);
      onSearch(query.toLowerCase());
    }
  };

  const handleClickOutside = (e: MouseEvent) => {
    if (
      searchBarRef.current &&
      !searchBarRef.current.contains(e.target as Node)
    ) {
      setIsOpen(false);
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div ref={searchBarRef} className={`w-full ${sizeStyles[size]}`}>
      {/* Search bar */}
      <div className="flex items-center bg-white border border-primary-300 rounded-lg shadow-sm focus-within:ring-2 focus-within:ring-primary-500">
        <input
          type="text"
          value={query}
          spellCheck={false}
          onKeyDown={handleKeyDown}
          onChange={handleInputChange}
          placeholder={placeholder}
          onFocus={() => setIsOpen(true)}
          className="flex-grow px-4 py-2 text-primary-900 bg-transparent focus:outline-none"
        />
        <button
          onClick={() => {
            setQuery("");
            setIsOpen(false);
            onSearch(query.toLowerCase());
          }}
          className="px-4 py-2 rounded-lg hover:bg-gray-200"
        >
          🔍
        </button>
      </div>

      {/* Display filtered results */}
      {isOpen && query !== "" && (
        <ul
          className={`mt-2 bg-white border border-gray-300 rounded-lg shadow-sm absolute w-full ${sizeStyles[size]}`}
        >
          {data.length > 0 ? (
            data.map((item: any, index: number) => (
              <li
                key={index}
                onClick={() => {
                  setQuery("");
                  setIsOpen(false);
                  onClick(item);
                }}
                className="px-4 py-2 cursor-pointer rounded-lg hover:bg-primary-100 text-primary-900"
              >
                {item.name}
              </li>
            ))
          ) : (
            <li className="px-4 py-2 text-primary-900">No results found</li>
          )}
        </ul>
      )}
    </div>
  );
};
