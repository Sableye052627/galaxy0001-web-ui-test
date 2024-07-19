import ApiBaseUrl from "./ApiBaseUrl";

const hostname = window.location.hostname;
//const api1 = hostname === "localhost" ? "http://localhost:19013/api" : hostname === "webh5.danger.asia" ? "https://webh5-ui-api.danger.asia/api" : `https://ui-api.${hostname}/api`;

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

export async function gameProviderApi(url: string, object: object) {
  const response = await ApiBaseUrl(api1).post("game-provider" + url, object);
  const result = response.data;

  return result;
}

export async function theOneApi(url: string, object: object) {
  const response = await ApiBaseUrl(api1).post("theone" + url, object);
  const result = response.data;

  return result;
}

export async function paymentGatewayApi(url: string, object: object) {
  const response = await ApiBaseUrl(api1).post("paymentgateway" + url, object);
  const result = response.data;

  return result;
}
