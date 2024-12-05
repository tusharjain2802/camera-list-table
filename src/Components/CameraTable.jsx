import React, { useState, useEffect } from "react";
import { fetchCameras, updateCameraStatus } from "../api/cameraApi";
import Pagination from "./Pagination";
import Filters from "./Filters";
import { MdBlockFlipped } from "react-icons/md";
import { FaRegCircleCheck } from "react-icons/fa6";
import { PiWarningCircle } from "react-icons/pi";
import { RiCloudLine } from "react-icons/ri";
import { RiDeleteBin6Line } from "react-icons/ri";
import Device from "../assets/images/device.svg";
import { CircularProgressbar, buildStyles } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';

function CameraTable() {
  const [cameras, setCameras] = useState([]);
  const [filteredCameras, setFilteredCameras] = useState([]);
  const [selectedCameras, setSelectedCameras] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);

  useEffect(() => {
    fetchCameras().then((data) => {
      setCameras(data);
      setFilteredCameras(data);
    });
  }, []);

  const handleStatusToggle = (id, status) => {
    const newStatus = status === "Active" ? "Inactive" : "Active";
    updateCameraStatus(id, newStatus).then(() => {
      const updatedCameras = cameras.map((camera) =>
        camera.id === id ? { ...camera, status: newStatus } : camera
      );
      setCameras(updatedCameras);
      setFilteredCameras(updatedCameras);
    });
  };

  const handleDelete = () => {

  };

  const handleFilter = (filters) => {
    const { location, status } = filters;
    const filtered = cameras.filter(
      (camera) =>
        (!location || camera.location === location) &&
        (!status || camera.status === status)
    );
    setFilteredCameras(filtered);
  };

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredCameras.slice(indexOfFirstItem, indexOfLastItem);

  return (
    <div className="">
      <Filters onFilter={handleFilter} />
      <table className="w-full border-collapse text-[#545454] text-left border bg-white rounded-b-xl border-gray-200">
        <thead>
          <tr className="bg-gray-100">
            <th className="border bg-white border-gray-300">
              <input
                type="checkbox"
                className="scale-150 ml-4"
                onChange={(e) =>
                  setSelectedCameras(
                    e.target.checked ? filteredCameras.map((camera) => camera.id) : []
                  )
                }
                checked={selectedCameras.length === filteredCameras.length}
              />
            </th>
            <th className="border text-[#7E7E7E] uppercase font-[500] text-[14px] bg-white border-gray-300 p-2">Name</th>
            <th className="border text-[#7E7E7E] uppercase font-[500] text-[14px] bg-white border-gray-300 p-2">Health</th>
            <th className="border text-[#7E7E7E] uppercase font-[500] text-[14px] bg-white border-gray-300 p-2">Location</th>
            <th className="border text-[#7E7E7E] uppercase font-[500] text-[14px] bg-white border-gray-300 p-2">Recorder</th>
            <th className="border text-[#7E7E7E] uppercase font-[500] text-[14px] bg-white border-gray-300 p-2">Tasks</th>
            <th className="border text-[#7E7E7E] uppercase font-[500] text-[14px] bg-white border-gray-300 p-2">Status</th>
            <th className="border text-[#7E7E7E] uppercase font-[500] text-[14px] bg-white border-gray-300 p-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          {currentItems.map((camera) => (
            <tr key={camera.id}>
              <td className="border border-gray-300 p-2">
                <input
                  type="checkbox"
                  checked={selectedCameras.includes(camera.id)}
                  onChange={(e) =>
                    setSelectedCameras((prev) =>
                      e.target.checked
                        ? [...prev, camera.id]
                        : prev.filter((id) => id !== camera.id)
                    )
                  }
                  className="scale-150 ml-2"
                />
              </td>
              <td className="border flex gap-3 items-center border-gray-300 p-2">
                <div className={`h-[10px] w-[10px] rounded-full ${camera.current_status === "Online" ? "bg-[#029262]" : "bg-[#DC3545]"} `}>
                </div> {camera.name} {camera.hasWarning && <PiWarningCircle className="text-[#FF7E17]" />}
              </td>
              <td className="border border-gray-300 p-2">
                <div className="flex items-center w-[126px] h-[50px] gap-2">
                  {camera.health.cloud &&
                    <>
                      <RiCloudLine size={90} className="text-[#A0A0A0]" />
                      <CircularProgressbar
                        styles={buildStyles({
                          textColor: '#000000',
                          textSize: '41px',
                          trailColor: '#d6d6d6',
                          pathColor: '#FF7E17'
                        })}
                        value={camera.current_status === "Online" ? 75 : 0}
                        text={camera.health.cloud} />
                    </>
                  }
                  {camera.health.device &&
                    <>
                      <img className="h-[26px] w-[26px]" draggable="false" src={Device} />
                      <CircularProgressbar
                        styles={buildStyles({
                          textColor: '#000000',
                          textSize: '41px',
                          trailColor: '#d6d6d6',
                          pathColor: '#029262'
                        })}
                        value={camera.current_status === "Online" ? 75 : 0}
                        text={camera.health.device} />
                    </>
                  }
                </div>
              </td>
              <td className="border border-gray-300 p-2">{camera.location}</td>
              <td className="border border-gray-300 p-2">{camera.recorder || "-"}</td>
              <td className="border border-gray-300 p-2">
                {camera.tasks === 0 ? "N/A" : camera.tasks.toString() + " Tasks"}
              </td>
              <td>
                <p className={` ${camera.status === "Active" ? "bg-[#0292621A] bg-opacity-10 text-[#029262]" : "text-[#545454] bg-[#F0F0F0]"} text-[10px] py-1 px-2 w-[73px] rounded-md text-center md:text-[12px] border border-gray-300`}>
                  {camera.status}</p>
              </td>
              <td className="border text-center border-gray-300 p-2">
                <button
                  className=""
                  onClick={() => handleStatusToggle(camera.id, camera.status)}
                >
                  {camera.status === "Active" ?
                    <MdBlockFlipped className="hover:text-red-500" /> :
                    <FaRegCircleCheck className="hover:text-green-500" />}
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <div className="flex justify-between mt-4">
        <button className="bg-red-500 text-white py-1 px-4 rounded" onClick={handleDelete}>
        <RiDeleteBin6Line />
        </button>
        <Pagination
          totalItems={filteredCameras.length}
          itemsPerPage={itemsPerPage}
          currentPage={currentPage}
          onPageChange={setCurrentPage}
          setItemsPerPage={setItemsPerPage}
        />
      </div>
    </div>
  );
}

export default CameraTable;
