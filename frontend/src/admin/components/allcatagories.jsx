import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { getAllCategories, deleteCategory, getCategoriesMoreDetail } from "../../store/category/categorySlice.js";
import {
  useReactTable,
  getCoreRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  getFilteredRowModel,
  flexRender,
} from "@tanstack/react-table";
import { FaCaretUp, FaCaretDown, FaRegEdit, FaFilePdf } from "react-icons/fa";
import { MdDeleteForever } from "react-icons/md";
import { TbCategoryPlus } from "react-icons/tb";
import jsPDF from "jspdf";
import html2canvas from "html2canvas";
import "bootstrap/dist/css/bootstrap.min.css";

const AllCategories = () => {
  const dispatch = useDispatch();
  const [filterInput, setFilterInput] = useState("");
  const [filterField, setFilterField] = useState("name");

  const { categories, categoriesDetail } = useSelector((state) => state.category);

  useEffect(() => {
    dispatch(getAllCategories());
    dispatch(getCategoriesMoreDetail());
  }, []);

  const handleDeleteCategory = (id) => {
    dispatch(deleteCategory(id)).then(() => {
      dispatch(getAllCategories());
      dispatch(getCategoriesMoreDetail());
    });
  };

  const columns = [
    {
      header: "Picture",
      accessorKey: "imageUrl",
      cell: ({ getValue }) => (
        <img src={getValue()} alt="Profile" className="img-thumbnail" style={{ width: "50px", height: "50px" }} />
      ),
    },
    {
      header: "Name",
      accessorKey: "name",
    },
    {
      header: "Description",
      accessorKey: "description",
    },
    {
      header: "Actions",
      accessorKey: "actions",
      cell: ({ row }) => (
        <div className="d-flex gap-2">
          <button className="btn btn-danger" onClick={() => handleDeleteCategory(row.original.actions)}>
            <MdDeleteForever size={20} />
          </button>
          <Link to={`/admin/categories/edit/${row.original.actions}`} className="btn btn-primary">
            <FaRegEdit size={20} />
          </Link>
        </div>
      ),
    },
  ];

  const data = Array.isArray(categories?.data)
    ? categories.data.map((category) => ({
        name: category.name,
        description: category.description,
        imageUrl: category.imageUrl,
        actions: category._id,
      }))
    : [];

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
  });

  // Apply filtering dynamically
  useEffect(() => {
    table.getColumn(filterField)?.setFilterValue(filterInput);
  }, [filterInput, filterField, table]);

  // PDF Export Function
  const exportToPDF = () => {
    const input = document.getElementById("table-container");
    html2canvas(input).then((canvas) => {
      const imgData = canvas.toDataURL("image/png");
      const pdf = new jsPDF();
      pdf.addImage(imgData, "PNG", 10, 10, 190, 0);
      pdf.save("categories.pdf");
    });
  };

  return (
    <div className="container bg-dark text-white p-4 rounded">
      <div className="d-flex justify-content-between align-items-center border-bottom pb-3 mb-4">
        <h2>Categories</h2>
        <div className="d-flex gap-2">
          <button className="btn btn-danger d-flex align-items-center" onClick={exportToPDF}>
            <FaFilePdf size={20} className="me-1" />
            Export PDF
          </button>
          <Link to={`/admin/categories/create-category`} className="btn btn-success d-flex align-items-center">
            <TbCategoryPlus size={22} className="me-1" />
            Create Category
          </Link>
        </div>
      </div>

      {/* Category Stats */}
      <div className="row g-3">
        <div className="col-md-4">
          <div className="card bg-secondary text-white p-3">
            <h5>Total Categories</h5>
            <h2>{categoriesDetail?.totalCategories}</h2>
          </div>
        </div>
        <div className="col-md-4">
          <div className="card bg-info text-white p-3">
            <h5>Most Populated Category</h5>
            <h2>{categoriesDetail?.mostPopulatedCategory[0]?.name}</h2>
            <p>Products: {categoriesDetail?.mostPopulatedCategory[0]?.products}</p>
          </div>
        </div>
        <div className="col-md-4">
          <div className="card bg-warning text-dark p-3">
            <h5>Recently Added Category</h5>
            <h2>{categoriesDetail?.recentlyAddedCategory?.name}</h2>
          </div>
        </div>
      </div>

      {/* Filter and Table */}
      <div className="d-flex flex-column flex-md-row justify-content-between align-items-center my-4">
        <div className="d-flex gap-2">
          <select className="form-select" value={filterField} onChange={(e) => setFilterField(e.target.value)}>
            <option value="name">Select a field</option>
            <option value="name">Name</option>
            <option value="description">Description</option>
          </select>
          <input className="form-control" value={filterInput} onChange={(e) => setFilterInput(e.target.value)} placeholder="Search..." />
        </div>
      </div>

      {/* Table */}
      <div className="table-responsive" id="table-container">
        <table className="table table-bordered table-dark">
          <thead>
            {table.getHeaderGroups().map((headerGroup) => (
              <tr key={headerGroup.id}>
                {headerGroup.headers.map((column) => (
                  <th key={column.id} onClick={column.getToggleSortingHandler()} style={{ cursor: "pointer" }}>
                    {flexRender(column.columnDef.header, column.getContext())}
                    {column.getIsSorted() === "asc" ? <FaCaretUp /> : column.getIsSorted() === "desc" ? <FaCaretDown /> : null}
                  </th>
                ))}
              </tr>
            ))}
          </thead>
          <tbody>
            {table.getRowModel().rows.map((row) => (
              <tr key={row.id}>
                {row.getVisibleCells().map((cell) => (
                  <td key={cell.id}>{flexRender(cell.column.columnDef.cell, cell.getContext())}</td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      <div className="d-flex justify-content-center gap-3">
        <button className="btn btn-outline-primary" onClick={() => table.previousPage()} disabled={!table.getCanPreviousPage()}>
          Previous
        </button>
        <span>Page {table.getState().pagination.pageIndex + 1}</span>
        <button className="btn btn-outline-primary" onClick={() => table.nextPage()} disabled={!table.getCanNextPage()}>
          Next
        </button>
      </div>
    </div>
  );
};

export default AllCategories;
