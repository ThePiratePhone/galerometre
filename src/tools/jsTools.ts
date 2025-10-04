const uid = function () {
  const timePart = Date.now().toString(36);
  const randomPart = Math.random()
    .toString(36)
    .slice(2, 16 - timePart.length);
  return (timePart + randomPart + timePart).slice(0, 16);
};

export { uid };
