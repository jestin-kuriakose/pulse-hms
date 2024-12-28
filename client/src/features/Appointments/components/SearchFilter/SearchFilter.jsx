import React, { useState, useEffect } from "react";
import useDebounce from "../../../../hooks/useDebounce";
import { TextInput } from "../../../../components/ui";

const SearchFilter = ({
  onSearch,
  placeholder,
  renderResults,
  onSelect,
  required,
  errors,
}) => {
  const [search, setSearch] = useState("");
  const [isOpen, setIsOpen] = useState(false);

  const debouncedSearch = useDebounce(search);

  useEffect(() => {
    onSearch(debouncedSearch);
  }, [debouncedSearch]);

  const handleBlur = () => {
    setTimeout(() => {
      setIsOpen(false);
    }, 300);
  };

  return (
    <div className="relative">
      <TextInput
        placeholder={placeholder}
        value={search}
        onFocus={() => setIsOpen(true)}
        onBlur={handleBlur}
        onChange={(e) => setSearch(e.target.value)}
        required={required}
        errors={errors}
      />
      {isOpen && (
        <div className="absolute left-0 bg-white w-full border border-gray-300 rounded-lg shadow-lg mt-1 z-10 max-h-60 overflow-y-auto">
          {renderResults(onSelect)}
        </div>
      )}
    </div>
  );
};

export default SearchFilter;
