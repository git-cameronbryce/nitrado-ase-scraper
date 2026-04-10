import type { Context } from "../global.types";
import type { Player } from "./types";
import { base } from "../../config/constants";

import axios from "axios";

export const getPlayers = async (
  ctx: Omit<Context, "guild">,
): Promise<Player[]> => {
  const { token, server_id: id } = ctx;

  const {
    data: { data },
  } = await axios.get(`${base}/services/${id}/gameservers/games/players`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return data.players;
};
