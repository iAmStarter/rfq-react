import axios from "axios";

const API_URL = import.meta.env.VITE_API_URL;

const instance = axios.create({
  baseURL: API_URL,
});

instance.interceptors.request.use(
  (config) => {
    const token = getToken();
    config.headers.authorization = `Bearer ${token}`;
    return config;
  },
  (err) => Promise.reject(err)
);

const get = async (url: string) => {
  try {
    const config: any = {}; 
    const res = await instance.get(url, config);
    if (res.data.status == true) {
      try {
        return JSON.parse(res.data.data);
      } catch (e) {
        return res.data.data;
      }
    } else {
      throw res;
    }
  } catch (err) {
    throw err;
  }
};

const post = async (url: string, params: any, files: any = null) => {
  const config: any = {}; 
  let data = { ...params };
  if (files) {
    config.headers = { "content-type": "multipart/form-data" };
    data = arrToFormData(data);
    for (var i = 0; i < files.length; i++) {
      data.append("allFiles", files[i]);
    }
  }

  try {
    const res = await instance.post(url, data, config);
    if (res.data.status == true) {
      try {
        return JSON.parse(res.data.data);
      } catch (e) {
        return res.data.data;
      }
    } else {
      throw res;
    }
  } catch (err) {
    throw err;
  }
};

const downloadFile = async (url: string, params: any, filename: string) => {
  let data = { ...params };

  const config: any = {
    responseType: "blob",
    headers: { "Content-Type": "application/json" },
  };

  try {
    const res = await instance.post(url, data, config);
    if (res.data.size != 0) {
      const url = window.URL.createObjectURL(new Blob([res.data]));
      const link = document.createElement("a");
      link.href = url;
      link.setAttribute("download", filename);
      document.body.appendChild(link);
      link.click();
      return true;
    } else {
      throw "FILE_NOT_FOUND";
    }
  } catch (err) {
    throw err;
  }
};

const getToken = () => {
  const token = sessionStorage.getItem("token") || "";
  return token;
};

const arrToFormData = (arr: any) => {
  let form = new FormData();
  for (let i in arr) {
    form.append(i, arr[i]);
  }
  return form;
};

export default { get, post, downloadFile };
