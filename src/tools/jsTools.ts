function uid() {
  const initialDate = Date.now();
  const randomPart = Math.random()
    .toString(36)
    .slice(2, 16 - Date.now().toString(36).length);
  return (
    Date.now().toString(36) +
    randomPart +
    (Math.random() * (Date.now() * 2 - initialDate + 1) + initialDate).toString(
      36
    )
  ).slice(0, 16);
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

function scoreToPrecariscore(score: number) {
  if (score < 1) return "A";
  if (score < 2) return "B";
  if (score < 3) return "C";
  if (score < 4) return "D";
  if (score < 5) return "E";
  return "-";
}

export { uid, saveResponse, getLocalResponse, scoreToPrecariscore };
