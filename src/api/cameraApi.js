import axios from "axios";

const API_BASE_URL = "https://api-app-staging.wobot.ai/app/v1";

export const fetchCameras = async () => {
  const response = await axios.get(`${API_BASE_URL}/fetch/cameras`, {
    headers: {
      Authorization: `Bearer 4ApVMIn5sTxeW7GQ5VWeWiy`,
    },
  });
  console.log(response.data.data)
  return response.data.data;
};

export const updateCameraStatus = async (id, status) => {
  await axios.post(
    `${API_BASE_URL}/update/camera/status`,
    { id, status },
    {
      headers: {
        Authorization: `Bearer 4ApVMIn5sTxeW7GQ5VWeWiy`,
      },
    }
  );
};
