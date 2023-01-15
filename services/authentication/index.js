import CallApi from "../../configs/api";

const ROOT_API = process.env.NEXT_PUBLIC_API;
const API = "api/v1";

export async function signIn(data) {
  const url = `${ROOT_API}/${API}/auth/sign-in`;
  return CallApi({ url, method: "POST", data, token: true });
}
