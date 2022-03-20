import UserType from "../models/userType";

export const url = "http://localhost:5000";

export const MainFetchApi = {
  async uploadFile(user: UserType): Promise<string | undefined> {
    try {
      let formData = new FormData();
      formData.append("file", user.file);
      const options: RequestInit = {
        method: "POST",
        mode: "cors",
        body: formData,
      };
      const response = await fetch(`${url}/users/upload`, options);
      const serverImagePath = await response.text();
      console.log("response text /users/upload:", serverImagePath);
      return serverImagePath;
    } catch (err) {
      console.log("drive upload", err);
    }
  },

  async createUser(user: UserType): Promise<UserType> {
    const options: RequestInit = {
      method: "POST",
      mode: "cors",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify(user),
    };
    const response = await fetch(`${url}/users/create`, options);
    const answer = await response.json();
    return answer;
  },

  async getUser(email: string, password: string): Promise<UserType> {
    const options: RequestInit = {
      method: "POST",
      mode: "cors",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify({
        email: email,
        password: password,
      }),
    };
    const response = await fetch(`${url}/users/user`, options);
    const answer = await response.json();
    return answer;
  },

  // async findUserImage(fileName) {
  //   const options = {
  //     method: "GET",
  //     mode: "cors",
  //   };
  //   const response = await fetch(
  //     `${url}/users/user/image/${fileName}`,
  //     options
  //   );
  // },

  async getAllUsers(): Promise<UserType[]> {
    const options: RequestInit = {
      method: "GET",
      mode: "cors",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
    };
    const response = await fetch(`${url}/users/users`, options);
    const answer = await response.json();
    console.warn("answer users:", answer);
    return answer;
  },
};
