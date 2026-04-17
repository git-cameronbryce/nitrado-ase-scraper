import type { Gameserver } from "./servers/types";
import type { Players } from "./players/types";
import { db } from "../database/client";
import { playersTable, serversTable } from "../database/schema";

type GameserverPartial = Gameserver["data"]["gameserver"];
type PlayersPartial = Players["data"]["players"];

export const upsert = async (
  gameserver: GameserverPartial,
  players: PlayersPartial,
  guild: string,
): Promise<void> => {
  // prettier-ignore
  const { service_id, status, game_specific: { path } } = gameserver;

  await db
    .insert(serversTable)
    .values({
      id: service_id,
      guild: guild,

      path: path,
      status: status,
      serverName: gameserver.query?.server_name,
      maximumPlayers: gameserver.query?.player_max,
      currentPlayers: gameserver.query?.player_current,
    })
    .onConflictDoUpdate({
      target: serversTable.id,
      set: {
        status: status,
        serverName: gameserver.query?.server_name,
        maximumPlayers: gameserver.query?.player_max,
        currentPlayers: gameserver.query?.player_current,
      },
    });

  await Promise.all(
    players.map(async (player) => {
      await db
        .insert(playersTable)
        .values({
          serverId: service_id,
          uuid: player.id,

          name: player.name,
          isOnline: player.online,
          lastOnline: player.last_online,
        })
        .onConflictDoUpdate({
          target: playersTable.uuid,
          set: {
            name: player.name,
            isOnline: player.online,
            lastOnline: player.last_online,
          },
        });
    }),
  );

  console.log("Drizzle upsert completed");
};
