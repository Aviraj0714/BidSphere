import React, { useEffect, useState, useMemo } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getAllAuctions, deleteAuctionByAdminById } from "../../store/auction/auctionSlice";
import { Link } from "react-router-dom";
import {
  FaEye, FaRegEdit, FaCaretUp, FaCaretDown,
} from "react-icons/fa";
import { MdDeleteForever } from "react-icons/md";
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

  const { auction } = useSelector((state) => state.auction);

  useEffect(() => {
    dispatch(getAllAuctions());
  }, [dispatch]);

  const columns = useMemo(() => [
    {
      accessorKey: "picture",
      header: "Picture",
      cell: ({ getValue }) => <img src={getValue()} alt="Profile" className="w-[50px] h-[50px]" />,
    },
    { accessorKey: "name", header: "Name" },
    { accessorKey: "category", header: "Category" },
    { accessorKey: "seller", header: "Seller" },
    { accessorKey: "location", header: "Location" },
    { accessorKey: "status", header: "Status" },
    { accessorKey: "startingPrice", header: "Bid" },
    { accessorKey: "startTime", header: "Start Time" },
    { accessorKey: "endTime", header: "End Time" },
    {
      accessorKey: "actions",
      header: "Actions",
      cell: ({ row }) => (
        <div className="flex gap-2">
          <Link to={`/admin/auctions/view/${row.original.actions}`}>
            <FaEye size={24} className="text-blue-500" />
          </Link>
          <button onClick={() => handleDeleteAuction(row.original.actions)}>
            <MdDeleteForever size={24} className="text-red-500" />
          </button>
          {row.original.status === "upcoming" && (
            <Link to={`/admin/auctions/edit/${row.original.actions}`}>
              <FaRegEdit size={24} className="text-green-500" />
            </Link>
          )}
        </div>
      ),
    },
  ], []);

  const data = useMemo(() => auction?.map((auc) => ({
    picture: auc.image,
    name: auc.name,
    category: auc.category?.name || "---",
    seller: auc.seller?.fullName || "---",
    location: auc.location?.name,
    status: auc.status,
    startingPrice: auc.startingPrice,
    startTime: new Date(auc.startTime).toLocaleString(),
    endTime: new Date(auc.endTime).toLocaleString(),
    actions: auc._id,
  })) || [], [auction]);

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    initialState: { pagination: { pageSize: 8 } },
  });

  const handleDeleteAuction = (id) => {
    dispatch(deleteAuctionByAdminById(id)).then(() => {
      dispatch(getAllAuctions());
    });
  };

  return (
    <div className="p-5 bg-gray-800 text-white rounded-xl">
      <h2 className="text-lg font-bold border-b pb-2 mb-4">All Auctions</h2>

      {/* Table */}
      <div className="overflow-auto">
        <table className="w-full border-collapse">
          <thead>
            {table.getHeaderGroups().map(headerGroup => (
              <tr key={headerGroup.id}>
                {headerGroup.headers.map(header => (
                  <th key={header.id} className="border p-2 text-left">
                    <div onClick={header.column.getToggleSortingHandler()}>
                      {flexRender(header.column.columnDef.header, header.getContext())}
                      {header.column.getIsSorted() === "asc" ? <FaCaretUp /> : header.column.getIsSorted() === "desc" ? <FaCaretDown /> : ""}
                    </div>
                  </th>
                ))}
              </tr>
            ))}
          </thead>
          <tbody>
            {table.getRowModel().rows.map(row => (
              <tr key={row.id}>
                {row.getVisibleCells().map(cell => (
                  <td key={cell.id} className="border p-2">
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      <div className="flex justify-between mt-4">
        <button onClick={() => table.previousPage()} disabled={!table.getCanPreviousPage()} className="btn">
          Previous
        </button>
        <span>
          Page {table.getState().pagination.pageIndex + 1} of {table.getPageCount()}
        </span>
        <button onClick={() => table.nextPage()} disabled={!table.getCanNextPage()} className="btn">
          Next
        </button>
      </div>
    </div>
  );
};

export default AllAuctions;
