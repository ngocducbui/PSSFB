
import { getCreatingCourseByUser } from "$lib/services/ModerationServices";
import { redirect } from "@sveltejs/kit";
import { checkExist } from "../../../../helpers/helpers";

export async function load({cookies}:any){
    // const userSTR = cookies.get('user');
    // if(!checkExist(userSTR)){
    //     redirect(301,"/")
    // }
    // const user = JSON.parse(userSTR)
    // const promise = getCreatingCourseByUser(user.UserID)
    // return {
    //     promise
    // }
}