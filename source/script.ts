import { getGameservers } from "./services/servers/getGameservers";
import { getServices } from "./services/servers/getServers";
import { getPlayers } from "./services/players/getPlayers";
import { upsert } from "./services/upsert";
import { db } from "./database/client";
import axios from "axios";

import { accountsTable } from "./database/schema";

const main = async (): Promise<void> => {
  const accounts = await db.select().from(accountsTable);

  await Promise.all(
    accounts.map(async (account) => {
      const { token, guild } = account;

      const client = axios.create({
        baseURL: "https://api.nitrado.net",
        headers: { Authorization: `Bearer ${token}` },
      });

      const ids = await getServices(client);

      const results = await Promise.all(
        ids.map(async (id) => {
          const [gameserver, players] = await Promise.all([
            getGameservers(client, id),
            getPlayers(client, id),
          ]);

          return { guild, gameserver, players };
        }),
      );

      const valid = results.filter(
        ({ gameserver, players }) => gameserver !== null && players !== null,
      );

      await Promise.all(
        valid.map(({ gameserver, players }) =>
          upsert(gameserver, players, guild),
        ),
      );
    }),
  );

  console.log("Script completed");
};

main();
setInterval(main, 30000);
