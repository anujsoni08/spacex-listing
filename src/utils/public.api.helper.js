import { publicAxiosInstance } from "./api";

export async function handleHistoryListing() {
  try {
    const res = await publicAxiosInstance.get("history");
    return res.data;
  } catch (error) {
    return error.response.data;
  }
}

export async function handlePayloadsListing() {
  try {
    const res = await publicAxiosInstance.get("payloads");
    return res.data;
  } catch (error) {
    return error.response.data;
  }
}
