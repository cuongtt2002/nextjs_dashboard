import { IUser } from "@/interface/user";

const USER_KEY = "users_local";

const DEFAULT_USERS: IUser[] = [
  { id: "1", name: "Nguyễn Văn A", email: "a@example.com", age: 25 },
  { id: "2", name: "Trần Thị B", email: "b@example.com", age: 30 },
  { id: "3", name: "Lê Văn C", email: "c@example.com", age: 28 },
];

export const userService = {
  getAll: (): IUser[] => {
    if (typeof window === "undefined") return [];

    const raw = localStorage.getItem(USER_KEY);

    if (!raw) {
      localStorage.setItem(USER_KEY, JSON.stringify(DEFAULT_USERS));
      return DEFAULT_USERS;
    }

    const parsed: IUser[] = JSON.parse(raw);

    if (!parsed || parsed.length === 0) {
      localStorage.setItem(USER_KEY, JSON.stringify(DEFAULT_USERS));
      return DEFAULT_USERS;
    }

    return parsed;
  },

  getById: (id: string): IUser | null => {
    const users = userService.getAll();
    const user = users.find((u) => u.id === id);
    return user || null;
  },

  saveAll: (users: IUser[]) => {
    localStorage.setItem(USER_KEY, JSON.stringify(users));
  },

  add: (user: IUser) => {
    const users = userService.getAll();
    users.unshift(user);
    userService.saveAll(users);
  },

  update: (user: IUser) => {
    let users = userService.getAll();
    users = users.map((u) => (u.id === user.id ? user : u));
    userService.saveAll(users);
  },

  remove: (id: string) => {
    let users = userService.getAll();
    users = users.filter((u) => u.id !== id);
    userService.saveAll(users);
  },
};
