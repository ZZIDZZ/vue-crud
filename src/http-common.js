import axios from "axios";

export default axios.create({
  baseURL: "https://laravel-api.zzidzz.tech/api",
  headers: {
    "Content-type": "application/json"
  }
});
