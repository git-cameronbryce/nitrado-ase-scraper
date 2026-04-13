import type { Context } from "../global.types";
import type { Gameserver, Services } from "./types";
import { base, platforms } from "../../config/constants";

import axios from "axios";

const getGameserver = async (
  ctx: Omit<Context, "guild">,
): Promise<Gameserver> => {
  try {
    const {
      data: { data },
    } = await axios.get(`${base}/services/${ctx.server_id}/gameservers`, {
      headers: { Authorization: `Bearer ${ctx.token}` },
    });

    return data.gameserver;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      if (error.code === "429") console.log("Rate limited");
    }
    throw error;
  }
};

export const getServers = async (
  ctx: Pick<Context, "token">,
): Promise<Gameserver[]> => {
  try {
    const {
      data: { data },
    } = await axios.get(`${base}/services`, {
      headers: { Authorization: `Bearer ${ctx.token}` },
    });

    const filtered = data.services.filter((service: Services) =>
      platforms.includes(service.details.folder_short),
    );

    return Promise.all(
      filtered.map((service: Services) =>
        getGameserver({ ...ctx, server_id: service.id }),
      ),
    );
  } catch (error) {
    if (axios.isAxiosError(error)) {
      if (error.code === "429") console.log("Rate limited");
    }
    throw error;
  }
};
