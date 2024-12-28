import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchBillings } from "../../features/Billing/billingSlice";
import getBillingColumns from "../../features/Billing/data/BillingColumns";
import BillingListFilter from "../../features/Billing/components/AllBillings/BillingListFilter";
import { Table } from "../../components/ui";

const Billing = () => {
  const dispatch = useDispatch();

  const [search, setSearch] = useState("");
  const [dateRange, setDateRange] = useState({
    startDate: new Date(),
    endDate: new Date(),
  });

  const { billingList, status: billingStatus } = useSelector(
    (state) => state.billing
  );

  useEffect(() => {
    dispatch(fetchBillings({ search, dateRange }));
  }, [search, dateRange, dispatch]);

  const billingColumns = getBillingColumns();

  return (
    <div className="bg-white px-2 lg:px-12 py-6 flex flex-col gap-2 rounded-lg mx-2 lg:mx-5 my-2 lg:mt-5 h-full">
      <div className="flex justify-between items-center gap-3 flex-wrap lg:flex-nowrap flex-col lg:flex-row">
        <h6 className="font-main mt-4 text-pry text-xl font-bold">Billings</h6>

        <BillingListFilter
          onChange={(filters) => {
            setSearch(filters?.search);
            setDateRange(filters?.dateRange);
          }}
        />
      </div>

      <div className="h-full">
        <Table
          rows={billingList}
          columns={billingColumns}
          isLoading={billingStatus === "loading"}
        />
      </div>
    </div>
  );
};

export default Billing;
