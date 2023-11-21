import { URL_API } from "@/utils/const";
import axios from "axios";


export const Axios = axios.create({
    baseURL: URL_API
})

