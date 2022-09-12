import { database } from "../logic/database.mjs";
import ServerError from "../logic/error.mjs";
import { hash, compare } from "bcrypt";
import jsonwebtoken from "jsonwebtoken";
const { sign } = jsonwebtoken;

const SECRET = "test";

export const getUsers = async () => {
  const users = await database("users");
  return users;
};

export const getUsersHandler = async (req, res) => {
  const users = await getUsers();
  return res.json(
    users.map((user) => ({
      id: user.id,
      username: user.username,
    }))
  );
};

export const getUserById = async (id) => {
  const user = await database("users").where("id", "=", id).first();
  if (!user) {
    throw new ServerError(
      "No user could be found with this username or password."
    );
  }
  return user;
};

export const getUserByIdHandler = async (req, res) => {
  const { id } = req.params;
  const user = await getUserById(id);
  return res.json({
    id: user.id,
    username: user.username,
    stravaRefresh: user.stravaRefresh,
  });
};

export const loginUser = async (id, password) => {
  const user = await getUserById(id);
  const pwIsValid = await compare(password, user.password_digest);
  if (!pwIsValid) {
    throw new ServerError(
      "No user could be found with this username or password."
    );
  }

  const token = sign(user, SECRET);
  return token;
};
