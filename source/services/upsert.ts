import type { Gameserver } from "./servers/types";
import type { Players } from "./players/types";

type GameserverPartial = Gameserver["data"]["gameserver"];
type PlayersPartial = Players["data"]["players"];

export const upsert = async (
  gameserver: GameserverPartial,
  players: PlayersPartial,
  guild: string,
): Promise<void> => {};
