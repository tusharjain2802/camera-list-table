import React, { useState, useEffect } from "react";
import { fetchCameras, updateCameraStatus } from "../api/cameraApi";
import Pagination from "./Pagination";
import Filters from "./Filters";

function CameraTable() {
  const [cameras, setCameras] = useState([]);
  const [filteredCameras, setFilteredCameras] = useState([]);
  const [selectedCameras, setSelectedCameras] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

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
    // deleteCameras(selectedCameras).then(() => {
    //   const updatedCameras = cameras.filter((camera) => !selectedCameras.includes(camera.id));
    //   setCameras(updatedCameras);
    //   setFilteredCameras(updatedCameras);
    //   setSelectedCameras([]);
    // });
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
    <div>
      <Filters onFilter={handleFilter} />
      <table className="w-full border-collapse border border-gray-200">
        <thead>
          <tr className="bg-gray-100">
            <th className="border border-gray-300 p-2">
              <input
                type="checkbox"
                onChange={(e) =>
                  setSelectedCameras(
                    e.target.checked ? filteredCameras.map((camera) => camera.id) : []
                  )
                }
                checked={selectedCameras.length === filteredCameras.length}
              />
            </th>
            <th className="border border-gray-300 p-2">Health</th>
            <th className="border border-gray-300 p-2">Location</th>
            <th className="border border-gray-300 p-2">Recorder</th>
            <th className="border border-gray-300 p-2">Tasks</th>
            <th className="border border-gray-300 p-2">Status</th>
            <th className="border border-gray-300 p-2">Actions</th>
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
                />
              </td>
              <td className="border border-gray-300 p-2">{camera.health.cloud}</td>
              <td className="border border-gray-300 p-2">{camera.location}</td>
              <td className="border border-gray-300 p-2">{camera.recorder}</td>
              <td className="border border-gray-300 p-2">{camera.tasks}</td>
              <td className="border border-gray-300 p-2">{camera.status}</td>
              <td className="border border-gray-300 p-2">
                <button
                  className="text-blue-600"
                  onClick={() => handleStatusToggle(camera.id, camera.status)}
                >
                  Toggle Status
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <div className="flex justify-between mt-4">
        <button className="bg-red-500 text-white py-1 px-4 rounded" onClick={handleDelete}>
          Delete Selected
        </button>
        <Pagination
          totalItems={filteredCameras.length}
          itemsPerPage={itemsPerPage}
          currentPage={currentPage}
          onPageChange={setCurrentPage}
        />
      </div>
    </div>
  );
}

export default CameraTable;
