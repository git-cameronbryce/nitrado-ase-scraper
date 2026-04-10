import { upsertPlayers } from "./services/upsert/upsertPlayers";
import { upsertServers } from "./services/upsert/upsertServers";
import { getPlayers } from "./services/players/getPlayers";
import { getServers } from "./services/servers/getServers";
import { db } from "./config/firebase";

const main = async (): Promise<void> => {
  const tokenRef = db.collection("accounts");
  const snapshot = await tokenRef.get();

  await Promise.all(
    snapshot.docs.map(async (doc) => {
      const { token } = doc.data();
      if (!token) return Promise.resolve();
      const context = { token, guild: doc.id };

      const servers = await getServers(context);

      await Promise.all(
        servers.map(async (server) => {
          const players = await getPlayers({
            ...context,
            server_id: server.service_id,
          });

          await upsertPlayers(players, {
            ...context,
            server_id: server.service_id,
          });

          await upsertServers(server, {
            ...context,
            server_id: server.service_id,
          });
        }),
      );
    }),
  );
};

main();
