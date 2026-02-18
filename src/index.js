import "./styles.css";
import { mainContent } from "./script/mainContent";
import { weatherData } from "./script/weatherData";
import "./script/sidebar.js";

await weatherData.setData("Berlin");
mainContent.displayContent();