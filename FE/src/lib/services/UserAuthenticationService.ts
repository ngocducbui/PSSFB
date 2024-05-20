import axios from "axios";
import { BAManager, StudentManager } from "../../Enum/Paginators";
import type { GetAllStudentType } from "../../types/param/GetAllStudent";

export const GetAllStudent = async (param: GetAllStudentType) => {
    const result = await axios.get(
        `https://authenticateservice.azurewebsites.net/api/Authenticate/GetAllStudent${(param.searchStr !== '' ? "?Search=" + param.searchStr + "&" : "?")}Page=${(param.pageNumber ? param.pageNumber : "1")}&PageSize=${(param.pageSize ? param.pageSize : StudentManager.PageSize)}${param.status !== '' ? "&Status=" + param.status : ""}`
    );
    return result.data;
};

export const GetAllBusinessAdmin = async (param: any) => {
    const result = await axios.get(
        `https://authenticateservice.azurewebsites.net/api/Authenticate/GetAllAdminBussiness${(param.searchStr !== '' ? "?Search=" + param.searchStr + "&" : "?")}Page=${(param.pageNumber ? param.pageNumber : "1")}&PageSize=${(param.pageSize ? param.pageSize : BAManager.PageSize)}${param.status !== '' ? "&Status=" + param.status : ""}`
    );
    return result.data;
};

