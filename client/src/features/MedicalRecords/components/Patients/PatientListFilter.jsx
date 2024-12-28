import React, { useEffect, useState } from "react";
import TextInput from "../../../../components/ui/Inputs/TextInput";
import useDebounce from "../../../../hooks/useDebounce";

const PatientListFilter = ({ onChange }) => {
  const [search, setSearch] = useState("");
  const debouncedSearch = useDebounce(search, 300);

  useEffect(() => {
    onChange({ search: debouncedSearch });
  }, [debouncedSearch, onChange]);

  return (
    <div className="flex gap-5">
      <TextInput
        placeholder="Search by name, email, phone, or MR number"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />
    </div>
  );
};

export default PatientListFilter;
