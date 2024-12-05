import React, { useState } from "react";
import { HiOutlineMagnifyingGlass } from "react-icons/hi2";
import Status from "../assets/images/status.svg";
import { GoLocation } from "react-icons/go";

function Filters({ onFilter }) {
  const [location, setLocation] = useState("");
  const [status, setStatus] = useState("");

  return (
    <div>

      <div className="flex font-inter mb-5 justify-between">
        <div>
          <p className="text-[22px]">Cameras</p>
          <p className="text-[14px] text-[#545454]">Manage your cameras here.</p>
        </div>

        <div className="relative">
          <div className="absolute inset-y-0 right-3 top-0 pl-3 flex items-center pointer-events-none">
            <HiOutlineMagnifyingGlass className="text-gray-700 " size={20} />
          </div>
          <input type="text"
            placeholder="search"
            className="bg-[#F0F0F0] py-3 px-2 rounded-xl focus:outline-none" />
        </div>

      </div>
      <div className="bg-white py-2 rounded-t-xl flex justify-start">

      <div className="relative ml-3">
      <select
        value={status}
        onChange={(e) => setStatus(e.target.value)}
        className="mt-1 block w-[188px] mr-6 border rounded py-2 pl-8 shadow-sm border-[#CED4DA] truncate text-[#7E7E7E] focus:outline-none"
      >
        <option value="" disabled>
          Location
        </option>
        <option value="All">All</option>
        <option value="Active">Active</option>
        <option value="Inactive">Inactive</option>
      </select>

      <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
      <GoLocation className="text-[#7E7E7E]" />
      </div>
    </div>

      <div className="relative">
      <select
        value={status}
        onChange={(e) => setStatus(e.target.value)}
        className="mt-1 block w-[148px] border truncate rounded py-2 pl-8 shadow-sm border-[#CED4DA] text-[#7E7E7E] focus:outline-none"
      >
        <option value="" disabled>
          Status
        </option>
        <option value="All">All</option>
        <option value="Active">Active</option>
        <option value="Inactive">Inactive</option>
      </select>

      <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
        <img
          src={Status}
          alt="Satellite"
          className="w-5 h-5"
        />
      </div>
    </div>
    </div>
    </div>
  );
}

export default Filters;
