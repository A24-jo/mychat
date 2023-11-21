import { Axios } from "@/axios";

export async function PerfilUser(dataUser) {
    try {
        const {data} = await Axios.get(`/user/perfil/${dataUser}`);
        return data;
    } catch (error) {
        console.log(error);
        return {};
    }

}