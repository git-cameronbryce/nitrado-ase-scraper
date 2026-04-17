import axios, { type AxiosInstance } from "axios";
import type { Gameserver } from "./types";

type GameserverPartial = Gameserver["data"]["gameserver"];

export const getGameservers = async (
  client: AxiosInstance,
  id: number,
): Promise<GameserverPartial> => {
  try {
    const { data } = await client.get<Gameserver>(
      `/services/${id}/gameservers`,
    );
    return data.data.gameserver;
  } catch (error) {
    if (axios.isAxiosError(error) && error.response?.status === 429) null;
    throw error;
  }
};
