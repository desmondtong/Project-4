import { To } from "react-router-dom";

export interface UserContextType {
  accessToken: String;
  setAccessToken: React.Dispatch<React.SetStateAction<String>>;
  role: String;
  setRole: React.Dispatch<React.SetStateAction<String>>;
  userId: String;
  setUserId: React.Dispatch<React.SetStateAction<String>>;
}

export interface data {
  status?: String;
  errors?: String;
  message?: String;
  msg?: String;
  ok?: Boolean;
  data?: any;
}

export interface returnValue {
  ok: Boolean;
  data: data | any;
}

export interface useFetchType {
  (
    endpoint: String,
    method: string,
    body?: Object,
    token?: String,
    isExtAPI?: boolean
  ): Promise<{}>;
}

export interface Props {
  //btn component
  onClick?: any;
  width?: String;
  startIcon?: any;
  id?: any;
  children?: any;
  fullWidth?: boolean;
  variant?: "text" | "outlined" | "contained";
}

export interface navBarType {
  item: String;
  link: To;
  icon: JSX.Element;
}

export interface registerBody {
  role: string;
  email: String;
  password: String;
  contact: String;
  first_name: String;
  last_name: String;
  category?: String;
  store_name?: String;
  address?: String;
  postal_code?: String;
}
