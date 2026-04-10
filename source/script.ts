import { getFirestore } from "firebase-admin/firestore";
import { getServers } from "./services/servers/getServers";
import { db } from "./config/firebase";

import { Gameserver, Services } from "./services/servers/types";

const main = async (): Promise<void> => {
  const tokenRef = db.collection("accounts");
  const snapshot = await tokenRef.get();

  snapshot.forEach(async (doc) => {
    const token = doc.data().token;

    const gameserver: Gameserver[] = await getServers(token);
    console.log(gameserver);
  });
};

main();
