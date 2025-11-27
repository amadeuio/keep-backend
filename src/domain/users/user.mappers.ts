import { UserAPI, UserDB } from "./user.types";

export const userMappers = {
  dbToAPI: (db: UserDB): UserAPI => ({
    id: db.id,
    email: db.email,
    createdAt: db.created_at.toISOString(),
  }),
};

