import React, { useEffect, useState, useMemo } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getAllUsers } from "../../store/user/userSlice";
import { getAllAuctions, deleteAuctionByAdminById } from "../../store/auction/auctionSlice";
import { Link } from "react-router-dom";
import {
  MdSkipPrevious,
  MdSkipNext,
  MdDeleteForever
} from "react-icons/md";
import {
  FaCaretUp,
  FaCaretDown,
  FaEye,
  FaRegEdit
} from "react-icons/fa";
import {
  useReactTable,
  getCoreRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  getFilteredRowModel,
  flexRender,
} from "@tanstack/react-table";

const AllAuctions = () => {
  const dispatch = useDispatch();
  const [filterInput, setFilterInput] = useState("");
  const [filterField, setFilterField] = useState("name");

  // Redux State
  const { auction } = useSelector((state) => state.auction);

  useEffect(() => {
    dispatch(getAllUsers());
    dispatch(getAllAuctions());
  }, [dispatch]);

  // Memoized Columns
  const columns = useMemo(() => [
    {
      header: "Picture",
      accessorKey: "picture",
      cell: ({ getValue }) => (
        <img src={getValue()} alt="Profile" className="w-[50px] h-[50px]" />
      ),
    },
    {
      header: "Name",
      accessorKey: "name",
    },
    {
      header: "Category",
      accessorKey: "category",
    },
    {
      header: "Seller",
      accessorKey: "seller",
    },
    {
      header: "Location",
      accessorKey: "location",
    },
    {
      header: "Status",
      accessorKey: "status",
      cell: ({ getValue }) => (
        <span className={`py-1 px-2 border capitalize rounded-lg ${
          getValue() === "upcoming" ? "text-orange-500 border-orange-500"
          : getValue() === "active" ? "text-green-500 border-green-500" 
          : ""}`}>
          {getValue()}
        </span>
      ),
    },
    {
      header: "Bid",
      accessorKey: "startingPrice",
    },
    {
      header: "Start Time",
      accessorKey: "startTime",
    },
    {
      header: "End Time",
      accessorKey: "endTime",
    },
    {
      header: "Payment Status",
      accessorKey: "paymentStatus",
      cell: ({ row }) => (
        <span className={row.original.statusClass}>{row.original.paymentStatus}</span>
      ),
    },
    {
      header: "Actions",
      accessorKey: "actions",
      cell: ({ row }) => (
        <div className="flex gap-2">
          <Link to={`/admin/auctions/view/${row.original.actions}`}>
            <FaEye size={38} className="text-theme-color hover:text-white hover:bg-theme-color border-2 border-theme-color rounded-lg px-2 py-1 transition-all" />
          </Link>
          <button onClick={() => handleDeleteAuction(row.original.actions)}>
            <MdDeleteForever size={38} className="text-color-danger hover:text-white hover:bg-color-danger border-2 border-color-danger rounded-lg px-2 py-1 transition-all" />
          </button>
          {row.original.status === "upcoming" && (
            <Link to={`/admin/auctions/edit/${row.original.actions}`}>
              <FaRegEdit size={38} className="text-theme-color hover:text-white hover:bg-theme-color border-2 border-theme-color rounded-lg px-2 py-1 transition-all" />
            </Link>
          )}
        </div>
      ),
    },
  ], []);

  // Transform auction data
  const data = useMemo(() => {
    return auction?.map((auc) => ({
      picture: auc.image,
      name: auc.name,
      category: auc.category?.name || "---",
      seller: auc.seller?.fullName || "---",
      location: auc.location?.name,
      status: auc.status,
      startingPrice: auc.startingPrice,
      startTime: new Date(auc.startTime).toLocaleString(),
      endTime: new Date(auc.endTime).toLocaleString(),
      paymentStatus: auc.paid ? "Paid" : "UnPaid",
      statusClass: auc.paid 
        ? "text-color-success px-2 py-1 border border-color-success rounded-full"
        : "text-color-danger px-2 py-1 border border-color-danger rounded-full",
      actions: auc._id,
    })) || [];
  }, [auction]);

  // Use React Table
  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
  });

  useEffect(() => {
    table.getColumn(filterField)?.setFilterValue(filterInput);
  }, [filterInput, filterField, table]);

  // Handle delete auction
  const handleDeleteAuction = (id) => {
    dispatch(deleteAuctionByAdminById(id)).then(() => {
      dispatch(getAllAuctions());
    });
  };

  return (
    <div className="px-7 py-4 w-full bg-theme-bg text-slate-300 rounded-2xl">
      <h2 className="text-white font-bold text-xl border-b border-border-info-color pb-3 mb-5">
        All Auctions
      </h2>

      {/* Filter Input */}
      <div className="flex flex-col md:flex-row gap-4">
        <select
          className="outline-none bg-theme-bg2 rounded-xl px-3 py-3 cursor-pointer border border-border-info-color focus:border-theme-color transition-all"
          value={filterField}
          onChange={(e) => setFilterField(e.target.value)}
        >
          <option value="name">Select a Field</option>
          <option value="name">Name</option>
          <option value="category">Category</option>
          <option value="seller">Seller</option>
          <option value="location">Location</option>
          <option value="status">Status</option>
          <option value="startingPrice">Bid</option>
          <option value="startTime">Start Time</option>
          <option value="endTime">End Time</option>
          <option value="paymentStatus">Payment Status</option>
        </select>
        <input
          className="outline-none w-full md:w-[200px] bg-theme-bg2 rounded-xl px-3 py-3 border border-border-info-color focus:border-theme-color transition-all"
          value={filterInput}
          onChange={(e) => setFilterInput(e.target.value)}
          placeholder="Search Auctions"
        />
      </div>

      {/* Table */}
      <div className="overflow-auto px-4 rounded-2xl border border-border-info-color mt-4 max-h-[500px]">
        <table className="w-full border-separate border-spacing-2">
          <thead>
            {table.getHeaderGroups().map((headerGroup) => (
              <tr key={headerGroup.id}>
                {headerGroup.headers.map((column) => (
                  <th key={column.id} onClick={column.getToggleSortingHandler()}>
                    {flexRender(column.columnDef.header, column.getContext())}
                    {column.getIsSorted() === "asc" ? <FaCaretUp /> : column.getIsSorted() === "desc" ? <FaCaretDown /> : null}
                  </th>
                ))}
              </tr>
            ))}
          </thead>
        </table>
      </div>
    </div>
  );
};

export default AllAuctions;
