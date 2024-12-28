
import { useEffect, useState } from "react";
import useDebounce from "../../../../hooks/useDebounce";
import { TextInput } from "../../../../components/ui";

const MedicineListFilter = ({ onChange }) => {
  const [search, setSearch] = useState("");
  const [dateRange, setDateRange] = useState({
    startDate: new Date(),
    endDate: new Date(),
  });

  const debouncedSearch = useDebounce(search);

  useEffect(() => {
    onChange({ search: debouncedSearch, dateRange });
  }, [debouncedSearch, dateRange]);

  return (
    <div className="flex gap-5">
      <div className="flex items-center gap">
        <TextInput
          placeholder="Search by name, email, or phone"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>
    </div>
  );
};

export default MedicineListFilter;
