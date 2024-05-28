import ApiBaseUrl from "./ApiBaseUrl";
const api1 = process.env.REACT_APP_API_BASE_URL as string;

export async function platformApi(url: string, object: object) {
  const response = await ApiBaseUrl(api1).post("platform" + url, object);
  const result = response.data;

  return result;
}

export async function playerApi(url: string, object: object) {
  const response = await ApiBaseUrl(api1).post("player" + url, object);
  const result = response.data;

  return result;
}

export async function gameApi(url: string, object: object) {
  const response = await ApiBaseUrl(api1).post("game" + url, object);
  const result = response.data;

  return result;
}
