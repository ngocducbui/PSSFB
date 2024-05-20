import axios from "axios"

export const getNotificationByUserId = async (id: number) => {
    const result = await axios.get(`https://notificationservice.azurewebsites.net/api/Notification/GetNotifications?userId=${id}`)
    return result.data.value
}