import { AxiosInstance } from "axios";
import { Gameserver } from "./types";

type GameserverPartial = Gameserver["data"]["gameserver"];

export const getGameservers = async (
  client: AxiosInstance,
  ids: number[],
): Promise<GameserverPartial> => {
  const { data } = await client.get<Gameserver>(`/services/${ids}/gameservers`);

  console.log(data.data.gameserver.memory_mb);

  return data.data.gameserver;
};
