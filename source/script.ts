import axios, { get } from "axios";
import { db } from "./database/client";
import { accountsTable } from "./database/schema";
import { getServices } from "./services/servers/getServers";
import { getGameservers } from "./services/servers/getGameservers";
import { getPlayers } from "./services/players/getPlayers";

const main = async (): Promise<void> => {
  const accounts = await db.select().from(accountsTable);

  accounts.forEach(async (account) => {
    const { token, guild } = account;

    const client = axios.create({
      baseURL: "https://api.nitrado.net",
      headers: { Authorization: `Bearer ${token}` },
    });

    const ids = await getServices(client);

    ids.forEach(async (id) => {
      const gameservers = await getGameservers(client, [id]);
      // const players = await getPlayers(client, [id]);
    });
  });
};

main();
