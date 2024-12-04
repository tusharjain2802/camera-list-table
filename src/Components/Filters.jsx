import React, { useState } from "react";

function Filters({ onFilter }) {
  const [location, setLocation] = useState("");
  const [status, setStatus] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    onFilter({ location, status });
  };

  const handleReset = () => {
    setLocation("");
    setStatus("");
    onFilter({ location: "", status: "" });
  };

  return (
    <div>
    <form
      className="flex flex-wrap gap-4 mb-4 p-4 "
      onSubmit={handleSubmit}
    >
      <div>
        <label className="block text-sm text-gray-700">Location</label>
        <input
          type="text"
          value={location}
          onChange={(e) => setLocation(e.target.value)}
          className="mt-1 block w-full border border-gray-300 rounded py-2 px-3 shadow-sm"
        />
      </div>
      <div>
        <label className="block text-sm text-gray-700">Status</label>
        <select
          value={status}
          onChange={(e) => setStatus(e.target.value)}
          className="mt-1 block w-full border border-gray-300 rounded py-2 px-3 shadow-sm"
        >
          <option value="">All</option>
          <option value="Active">Active</option>
          <option value="Inactive">Inactive</option>
        </select>
      </div>
      <div className="flex items-end gap-2">
        <button
          type="submit"
          className="bg-blue-600 text-white px-4 py-2 rounded shadow"
        >
          Apply
        </button>
        <button
          type="button"
          onClick={handleReset}
          className="bg-gray-400 text-white px-4 py-2 rounded shadow"
        >
          Reset
        </button>
      </div>
    </form>
    </div>
  );
}

export default Filters;
