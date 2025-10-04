function uid() {
  const timePart = Date.now().toString(36);
  const randomPart = Math.random()
    .toString(36)
    .slice(2, 16 - timePart.length);
  return (timePart + randomPart + timePart).slice(0, 16);
}

function saveResponse(response: { [key: string]: string }) {
  const lastRes = JSON.parse(window.localStorage.getItem("response") ?? "{}");
  Object.keys(response).forEach((key) => {
    lastRes[key] = response[key];
  });

  window.localStorage.setItem("response", JSON.stringify(lastRes));
}
export { uid, saveResponse };
