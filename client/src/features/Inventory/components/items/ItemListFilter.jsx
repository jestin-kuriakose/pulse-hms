import { useEffect, useState } from "react";
import useDebounce from "../../../../hooks/useDebounce";
import { TextInput } from "../../../../components/ui";

const ItemListFilter = ({ onChange }) => {
  const [search, setSearch] = useState("");
  const debouncedSearch = useDebounce(search);

  useEffect(() => {
    onChange({ search: debouncedSearch });
  }, [debouncedSearch, onChange]);

  return (
    <div className="flex gap-5">
      <div className="flex items-center gap">
        <TextInput
          placeholder="Search by name or code"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>
    </div>
  );
};

export default ItemListFilter;
