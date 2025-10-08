function uid() {
  const timePart = Date.now().toString(36);
  const randomPart = Math.random()
    .toString(36)
    .slice(2, 16 - timePart.length);
  return (timePart + randomPart + timePart).slice(0, 16);
}

function saveResponse(qu_id: number | string, answer: string) {
  const lastRes = JSON.parse(window.localStorage.getItem("response") ?? "[]");
  const index = lastRes.findIndex(
    (res: { id: number | string }) => res.id === qu_id
  );
  if (index !== -1) {
    lastRes[index].answer = answer; // Overwrite existing entry
  } else {
    lastRes.push({ id: qu_id, answer }); // Add new entry
  }
  window.localStorage.setItem("response", JSON.stringify(lastRes));
}

function getLocalResponse(id: number | string) {
  const lastRes = JSON.parse(window.localStorage.getItem("response") ?? "[]");
  const entry = lastRes.find((res: { id: number | string }) => res.id === id);
  return entry ? entry.answer : null;
}
export { uid, saveResponse, getLocalResponse };
