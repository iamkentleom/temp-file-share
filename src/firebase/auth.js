import { getAuth, signInAnonymously } from "firebase/auth";
import app from "./index";

const auth = getAuth(app);

export { auth, signInAnonymously };
