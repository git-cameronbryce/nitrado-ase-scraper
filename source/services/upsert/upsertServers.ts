import type { Gameserver } from "../servers/types";
import type { Context } from "../global.types";
import { db } from "../../config/firebase";

export const upsertServers = async (
  server: Gameserver,
  context: Omit<Context, "token">,
) => {
  console.log(server.status);
};
