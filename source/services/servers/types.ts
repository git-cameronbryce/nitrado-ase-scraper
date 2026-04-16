interface Gameserver {
  data: {
    gameserver: {
      status: string;
      memory_mb: number;
      service_id: number;

      game_specific: {
        path: string;
        log_files: string[];
      };

      query?: {
        server_name: string;
        connect_ip: string;

        player_current: number;
        player_max: number;
      };
    };
  };
}

interface Services {
  data: {
    services: {
      id: number;
      comment: string | null;

      details: {
        folder_short: string;
        address: string;
        game: string;
      };

      suspending_in: number;
      deleting_in: number;
    }[];
  };
}
export type { Gameserver, Services };
