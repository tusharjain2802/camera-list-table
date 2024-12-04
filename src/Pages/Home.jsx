import React from "react";
import CameraTable from "../Components/CameraTable";

function HomePage() {
  return (
    <div className="min-h-screen font-inter bg-gray-100 flex flex-col">
      <main className="flex-grow p-6">
        <CameraTable />
      </main>
      
    </div>
  );
}

export default HomePage;
