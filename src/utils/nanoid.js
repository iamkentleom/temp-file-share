import { customAlphabet } from "nanoid";

const nanoid = () => {
  const idGenerator = customAlphabet(
    "0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz",
    4
  );
  return `${idGenerator()}-${idGenerator()}`;
};

export { nanoid };
