import axios from "axios"

export const createPayment = async(data:any)=>{
    try {
        const result = await axios.post('https://paymentapiservice.azurewebsites.net/api/Payments/CreatePayment', data)
        return result.data.value
    } catch (error) {
        console.log(error);
        return error
    }
}

export const getPaymentByByUserId = async(userId:string) => {
    const result = await axios.get(`https://paymentapiservice.azurewebsites.net/api/Payments/GetHistoryPaymentsOfUserBuy?userId=${userId}`)
    return result.data.value
}