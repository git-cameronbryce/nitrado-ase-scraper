interface Gameserver {
  status: string;
  service_id: number;

  game_specific: {
    path: string;
  };

  query?: {
    server_name?: string;
    connect_ip?: string;
    map?: string;

    player_current?: number;
    player_max?: number;
  };
}

interface Services {
  id: number;
  suspend_date: string;

  details: {
    address: string;
    folder_short: string;
  };
}

export type { Gameserver, Services };
