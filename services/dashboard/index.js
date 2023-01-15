import CallApi from "../../configs/api";

const ROOT_API = process.env.NEXT_PUBLIC_API;
const API = "api/v1";

export async function get() {
  const url = `${ROOT_API}/${API}/dashboards/get`;
  return CallApi({ url, method: "GET", token: true });
}
