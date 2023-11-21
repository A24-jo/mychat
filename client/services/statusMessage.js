import { Axios } from "@/axios"


export async function receiver(userId, valor) {
    try {
        const { data } = await Axios.get(`user/received/${userId}/${valor}`);
        
        return data;
    } catch (error) {
        console.error(error);
        return "";
    }
}

export async function numberTheNotifications(userId) {
    try {
        const { data } = await Axios.get(`user/notifications/${userId}`);
        return data;
    } catch (error) {
        console.error(error);
        return [];
    }
}

export async function visto(userId, contactId) {
    try {
        const { data } = await Axios.get(`user/visible/${userId}/${contactId}`);
        
        return data;
    } catch (error) {
        console.error(error);
        return [];
    }
}