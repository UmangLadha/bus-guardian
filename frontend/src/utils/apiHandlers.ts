import { AxiosError } from "axios";
import apiClient from "./apiClient";

export async function getData(route: string) {
  try {
    const response = await apiClient.get(route);
    //  console.log("API Success:", response);
    return { data: response.data };
  } catch (error) {
    const err = error as AxiosError<{ message: string }>;
    // console.error("API Error:", err.response?.data || err.message);
    return { error: err.response?.data.message || "Something went wrong" };
  }
}

export async function postData(route: string, payload: object) {
  try {
    const response = await apiClient.post(route, payload);
    //  console.log("API Success:", response);
    return { message: response.data.message, data: response.data };
  } catch (error) {
    const err = error as AxiosError<{ message: string }>;
    // console.error("API Error:", err.response?.data || err.message);
    return { error: err.response?.data.message || "Something went wrong" };
  }
}

export async function updateData(route: string, payload: object) {
  try {
    const response = await apiClient.put(route, payload);
    // console.log("API Success:", response);
    return { message: response.data.message, data: response.data };
  } catch (error) {
    const err = error as AxiosError<{ message: string }>;
    // console.log("API Failed:", err);
    return { error: err.response?.data.message || "Something went wrong" };
  }
}

export async function deleteData(route: string) {
  try {
    const response = await apiClient.delete(route);
    //  console.log("API Success:", response);
    return { response: response.data };
  } catch (error) {
    const err = error as AxiosError<{ message: string }>;
    // console.error("API Error:", err.response?.data || err.message);
    return { error: err.response?.data.message || "Something went wrong" };
  }
}
