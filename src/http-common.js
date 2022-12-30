import axios from "axios";
import authHeader from "./services/AuthHeader";

export default axios.create({
  baseURL: "https://laravel-api.zzidzz.tech/api",
  headers: authHeader()
});
