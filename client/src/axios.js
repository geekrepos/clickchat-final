import axios from "axios";

const Axios = axios.create({
    baseURL: "http://localhost:5700/",
});
export default Axios;
