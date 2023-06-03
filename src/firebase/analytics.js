import { getAnalytics } from "firebase/analytics";
import app from "./index";

const analytics = () => getAnalytics(app);

export { analytics };
