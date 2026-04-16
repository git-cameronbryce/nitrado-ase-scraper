import axios, { type AxiosInstance } from "axios";
import type { Services } from "./types";

const platforms: string[] = ["arkxb", "arkps"];
export const getServices = async (client: AxiosInstance): Promise<number[]> => {
  try {
    const { data } = await client.get<Services>("/services");

    const services = data.data.services.filter((service) => {
      return platforms.includes(service.details.folder_short);
    });

    return services.map((service) => service.id);
  } catch (error) {
    if (axios.isAxiosError(error) && error.response?.status === 429) null;
    throw error;
  }
};
