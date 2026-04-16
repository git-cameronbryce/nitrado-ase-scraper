import type { Services } from "./types";
import { AxiosInstance } from "axios";

const platforms: string[] = ["arkxb", "arkps"];

export const getServices = async (client: AxiosInstance): Promise<number[]> => {
  const { data } = await client.get<Services>("/services");

  const services = data.data.services.filter((service) => {
    return platforms.includes(service.details.folder_short);
  });

  return services.map((service) => service.id);
};
