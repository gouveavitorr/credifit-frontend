export type User = {
  id: string;
  name: string;
};

export type AppContextType = {
  users: User[] | null;
  setUsers: (users: User[] | null) => void;
};
