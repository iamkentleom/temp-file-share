import { getAnalytics, logEvent } from "firebase/analytics";
import app from "./index";

const analytics = () => getAnalytics(app);

export { analytics, logEvent };
