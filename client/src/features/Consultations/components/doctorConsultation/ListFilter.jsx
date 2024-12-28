import { useEffect, useState } from "react";
import Datepicker from "react-tailwindcss-datepicker";
import useDebounce from "../../../../hooks/useDebounce";
import { TextInput } from "../../../../components/ui";

const ListFilter = ({ onChange, isOpen, setIsOpen }) => {
  const [search, setSearch] = useState("");

  const debouncedSearch = useDebounce(search);

  useEffect(() => {
    onChange({ search: debouncedSearch });
  }, [debouncedSearch]);

  const handleBlur = () => {
    // Use a timeout to allow click events to register
    setTimeout(() => {
      setIsOpen(false);
    }, 300);
  };

  return (
    <div className="flex gap-5">
      <div className="flex items-center gap">
        <TextInput
          // className="bg-white lg:bg-gray-100 border  placeholder:text-pry border-pry text-pry rounded-full px-4 text-sm w-full py-3 font-main"
          placeholder="Search by name or code"
          value={search}
          onFocus={() => setIsOpen(true)}
          onBlur={handleBlur}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>
    </div>
  );
};

export default ListFilter;
