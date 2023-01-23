import bcrypt from "bcryptjs";
const Users = [
  {
    name: "Admin User",
    email: "admin@example.com",
    password: bcrypt.hashSync("123456", 10),
    isAdmin: true,
  },
  {
    name: "ALi Ahmad",
    email: "ali@example.com",
    password: bcrypt.hashSync("123456", 10),
  },
  {
    name: "tester",
    email: "test@example.com",
    password: bcrypt.hashSync("123456", 10),
  },
];

export default Users;