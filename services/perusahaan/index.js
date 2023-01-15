import CallApi from "../../configs/api";

const ROOT_API = process.env.NEXT_PUBLIC_API;
const API = "api/v1";

export async function get(page, limit, search) {
  const url = `${ROOT_API}/${API}/companies/get?search=${search}&page=${page}&limit=${limit}`;
  return CallApi({ url, method: "GET", token: true });
}

export async function detail(id, token) {
  const url = `${ROOT_API}/${API}/companies/detail/${id}`;
  return CallApi({ url, method: "GET", serverToken: token });
}

export async function create(data) {
  const url = `${ROOT_API}/${API}/companies/create`;
  return CallApi({ url, method: "POST", token: true, data });
}

export async function edit(id, data) {
  const url = `${ROOT_API}/${API}/companies/edit/${id}`;
  return CallApi({ url, method: "PATCH", token: true, data });
}

export async function destroy(id) {
  const url = `${ROOT_API}/${API}/companies/destroy/${id}`;
  return CallApi({ url, method: "DELETE", token: true });
}
