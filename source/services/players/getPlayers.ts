import type { Context } from "../global.types";
import type { Player } from "./types";
import { base } from "../../config/constants";

import axios from "axios";

export const getPlayers = async (
  ctx: Omit<Context, "guild">,
): Promise<Player[]> => {
  try {
    const {
      data: { data },
    } = await axios.get(
      `${base}/services/${ctx.server_id}/gameservers/games/players`,
      {
        headers: {
          Authorization: `Bearer ${ctx.token}`,
        },
      },
    );

    return data.players;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      if (error.code === "429") console.log("Rate limited");
    }
    throw error;
  }
};
