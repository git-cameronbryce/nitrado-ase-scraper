import axios, { type AxiosInstance } from "axios";
import type { Players } from "./types";

type PlayersPartial = Players["data"]["players"];

export const getPlayers = async (
  client: AxiosInstance,
  id: number,
): Promise<PlayersPartial> => {
  try {
    const { data } = await client.get<Players>(
      `/services/${id}/gameservers/games/players`,
    );

    const players = data.data.players.filter((player) => player.online);

    return players;
  } catch (error) {
    if (axios.isAxiosError(error) && error.response?.status === 429) null;
    throw error;
  }
};
