import CallApi from "../../configs/api";

const ROOT_API = process.env.NEXT_PUBLIC_API;
const API = "api/v1";

export async function get(id, page, limit) {
  const url = `${ROOT_API}/${API}/products/${id}/get?page=${page}&limit=${limit}`;
  return CallApi({ url, method: "GET", token: true });
}

export async function create(id, data) {
  const url = `${ROOT_API}/${API}/products/${id}/create`;
  return CallApi({ url, method: "POST", token: true, data });
}

export async function destroy(companyId, productId) {
  const url = `${ROOT_API}/${API}/products/${companyId}/${productId}/destroy`;
  return CallApi({ url, method: "DELETE", token: true });
}
