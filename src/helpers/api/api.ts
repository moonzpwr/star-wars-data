import axios from "axios";

const httpCliet = axios.create({
  baseURL: "https://sw-api.starnavi.io/",
});

export default httpCliet;
