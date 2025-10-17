import { mapPayload, type RawPayload } from "../../helpers/mapper";
import http from "../../services/http";
import type { User, UserLogin } from "../../types";
const mainSubUrl = "/auth";

 export const fetchLogin = async (item: UserLogin): Promise<User> => {
  try {
    const token = await http.post(`${mainSubUrl}/login`, {
      user: item.username,
      passwd: item.password,
      type: "none",
    });

    sessionStorage.setItem("token", token);

    return await fetchUserProfile()
  } catch (error: any) {
    console.log(error)
    throw new Error(error.response.data.message);
  }
};

 export const fetchUserProfile = async (): Promise<User> => {
  try {
    const userData: RawPayload = await http.get(`${mainSubUrl}/getuserprofile`);
    const userItem: User = mapPayload(userData);

    const profileImage = await http.get(`${mainSubUrl}/getuserimage`);
    userItem.imageProfile = profileImage;

    return userItem;
  } catch (error: any) {
     throw new Error(error.response.data.message);
  }
};
