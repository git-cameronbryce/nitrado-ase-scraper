interface Players {
  data: {
    players: {
      name: string;
      id: string;
      online: boolean;
      last_online: string;
    }[];
  };
}

export type { Players };
