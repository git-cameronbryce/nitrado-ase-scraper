import type { Context } from "../global.types";
import type { Player } from "../players/types";
import { db } from "../../config/firebase";

export const upsertPlayers = async (
  players: Player[],
  { guild, server_id }: Omit<Context, "token">,
) => {
  const batch = db.batch();

  players.forEach((player) => {
    if (!player.online) return;

    const schema = {
      server_info: {
        server_id,
      },
      player_info: {
        last_online: player.last_online,
        name: player.name,
        id: player.id,
      },
    };

    const ref = db
      .collection("accounts")
      .doc(guild)
      .collection("players")
      .doc(player.id);

    batch.set(ref, schema, { merge: true });
  });

  await batch.commit();
  console.log("Batch committed");
};
