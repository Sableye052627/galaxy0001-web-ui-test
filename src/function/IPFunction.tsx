export async function getMyIp() {
  let ip = "";
  await fetch("https://api.ipify.org?format=json")
    .then((response) => {
      return response.json();
    })
    .then((res: any) => {
      ip = res.ip;
    })
    .catch((err: any) => console.error("Problem fetching my IP", err));

  return ip;
}
