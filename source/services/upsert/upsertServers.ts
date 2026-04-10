import type { Gameserver } from "../servers/types";
import type { Context } from "../global.types";
import { db } from "../../config/firebase";

export const upsertServers = async (
  { service_id, status, game_specific, query }: Gameserver,
  { guild }: Omit<Context, "token">,
) => {
  const schema = {
    server_info: {
      server_id: service_id,
      status,
      game_specific: {
        path: game_specific.path,
      },
      query: {
        server_name: query?.server_name ?? null,
        connect_ip: query?.connect_ip ?? null,
        player_current: query?.player_current ?? null,
        player_max: query?.player_max ?? null,
        map: query?.map ?? null,
      },
    },
  };

  await db
    .collection("accounts")
    .doc(guild)
    .collection("servers")
    .doc(String(service_id))
    .set(schema, { merge: true });
};
