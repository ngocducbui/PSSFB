export const Cover = async(func:Promise<any>) => {
    try {
        const result = await func;
        return result
    } catch (error:any) {
        console.error(error);
        return {
            message: error?.message??"something went wrong",
            type:"error"
        }
    }
}