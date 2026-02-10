import "./styles.css";
import { weatherData } from "./script/weatherData";

await weatherData.setData("Berlin");
weatherData.getDay(0);