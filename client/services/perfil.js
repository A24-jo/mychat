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

export async function updatePerfil(name,phone,email,userId){
    try {
        const {data} = await Axios.post(`/user/update`,{name,phone,email,userId});
        console.log(data)
        return data
    } catch (error) {
        console.error(error);
        return "";
    }
}