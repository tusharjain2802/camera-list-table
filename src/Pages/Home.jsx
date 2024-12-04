import React from "react";
import CameraTable from "../Components/CameraTable";

function HomePage() {
  return (
    <div className="min-h-screen flex flex-col">
      <main className="flex-grow p-6">
        <CameraTable />
      </main>
      
    </div>
  );
}

export default HomePage;
