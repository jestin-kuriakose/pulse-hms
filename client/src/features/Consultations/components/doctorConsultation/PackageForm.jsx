import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { CircularProgress } from "@mui/material";
import ListFilter from "./ListFilter";
import PackageTable from "../Tables/PackageTable";
import { fetchPackages } from "../../../Inventory/slice/packageSlice";

const PackageForm = ({ packages, setPackages }) => {
  const [search, setSearch] = useState("");
  const [isOpen, setIsOpen] = useState(false);

  const dispatch = useDispatch();

  const { packageList, status } = useSelector((state) => state.packages);

  useEffect(() => {
    dispatch(fetchPackages(search));
  }, [search]);

  const handlePackageAdd = (id) => {
    console.log(id);
    if (!id) return;
    const medId = Number(id);
    const foundPackage = packageList?.find((med) => med?.id === medId);
    console.log(foundPackage);
    setPackages((prev) => [
      ...prev,
      {
        id: packages?.length + 1,
        package: foundPackage,
        quantity: 1,
        notes: "No Notes",
        newEntry: true,
      },
    ]);
  };

  return (
    <div className="mt-2 px-4 w-full">
      <div className="mb-2 relative">
        <ListFilter
          onChange={(filters) => {
            setSearch(filters?.search);
          }}
          isOpen={isOpen}
          setIsOpen={setIsOpen}
          key={"package"}
        />

        {isOpen && (
          <div className="absolute left-0 bg-white w-full border border-gray-300 rounded-lg shadow-lg mt-1 z-10 max-h-60 overflow-y-auto">
            {status === "loading" ? (
              <div className="flex items-center justify-center my-10">
                <CircularProgress />
              </div>
            ) : packageList.length > 0 ? (
              packageList.map((pack, index) => (
                <div
                  key={index}
                  onClick={() => handlePackageAdd(pack?.id)}
                  className="flex flex-col border-b hover:bg-blue-100 p-3 cursor-pointer"
                >
                  <p className="font-semibold">{pack.code}</p>
                  <p className="text-gray-700">{pack.name}</p>
                  <p className="text-gray-500 text-sm">{pack.description}</p>
                  <p className="text-gray-500 text-sm">
                    Quantity: {pack.quantity}
                  </p>
                </div>
              ))
            ) : (
              <div className="p-3 text-gray-500">No results found</div>
            )}
          </div>
        )}
      </div>

      <PackageTable
        packageList={packageList}
        packages={packages}
        setPackages={setPackages}
      />
    </div>
  );
};

export default PackageForm;
