import type { Gameserver, Services } from "./types";
import { base } from "../../config/constants";

import axios from "axios";

const platforms: string[] = ["arkxb", "arkps"];

// prettier-ignore
const getGameserver = async (token: string, id: number): Promise<Gameserver> => {
  const {
    data: { data },
  } = await axios.get(`${base}/services/${id}/gameservers`, {
    headers: { Authorization: `Bearer ${token}` },
  });

  return data.gameserver;
};

// prettier-ignore
export const getServers = async (token: string): Promise<Gameserver[]> => {
  const {
    data: { data },
  } = await axios.get(`${base}/services`, {
    headers: { Authorization: `Bearer ${token}` },
  });

  const filtered = data.services.filter((service: Services) =>
    platforms.includes(service.details.folder_short),
  );

  return await Promise.all(
    filtered.map((service: Services) => getGameserver(token, service.id)),
  );
};
