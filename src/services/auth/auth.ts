/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
// Commented out for mock - Uncomment after dev
// import { mapPayload, type RawPayload } from "../../helpers/mapper";
// import http from "../../services/http";
import type { User, UserLogin } from "../../types";
// const mainSubUrl = "/auth";

// MOCK FUNCTIONS FOR DEVELOPMENT - Remove after dev
export const fetchLogin = async (_item: UserLogin): Promise<User> => {
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 500));

  // Mock token
  const mockToken = "mock-jwt-token-" + Date.now();
  sessionStorage.setItem("token", mockToken);

  return await fetchUserProfile();
};

export const fetchUserProfile = async (): Promise<User> => {
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 300));

  // Mock user data
  const mockUser: User = {
    id: 1,
    name: "John Doe",
    role: "Manager",
    firstName: "John",
    lastName: "Doe",
    imageProfile: "https://via.placeholder.com/150",
    buName: "Engineering",
    buCode: "ENG001",
    email: "john.doe@example.com",
    plant: "Plant A",
    listMenu: [
      {
        id: 1,
        name: "Dashboard",
        path: "/dashboard",
        sequence: "1",
        icon: "dashboard",
        subMenus: []
      },
      {
        id: 2,
        name: "Users",
        path: "/users",
        sequence: "2",
        icon: "people",
        subMenus: []
      }
    ]
  };

  return mockUser;
};

// ORIGINAL FUNCTIONS - Uncomment after dev
// export const fetchLogin = async (item: UserLogin): Promise<User> => {
//   try {
//     const token = await http.post(`${mainSubUrl}/login`, {
//       user: item.username,
//       passwd: item.password,
//       type: "none",
//     });

//     sessionStorage.setItem("token", token);

//     return await fetchUserProfile()
//   } catch (error: any) {
//     console.log(error)
//     throw new Error(error.response.data.message);
//   }
// };

//  export const fetchUserProfile = async (): Promise<User> => {
//   try {
//     const userData: RawPayload = await http.get(`${mainSubUrl}/getuserprofile`);
//     const userItem: User = mapPayload(userData) as User;

//     const profileImage = await http.get(`${mainSubUrl}/getuserimage`);
//     userItem.imageProfile = profileImage;

//     return userItem;
//   } catch (error: any) {
//      throw new Error(error.response.data.message);
//   }
// };
