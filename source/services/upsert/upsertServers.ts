import type { Gameserver } from "../servers/types";
import type { Context } from "../global.types";
import { db } from "../../config/firebase";

export const upsertServers = async (
  { status, game_specific, query }: Gameserver,
  { guild, server_id }: Omit<Context, "token">,
) => {
  if (status !== "started") return;

  const schema = {
    server_info: { server_id, status, path: game_specific.path, ...query },
  };

  await db
    .collection("accounts")
    .doc(guild)
    .collection("servers")
    .doc(String(server_id))
    .set(schema, { merge: true });

  console.log("Server batch committed");
};
