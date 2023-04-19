const generatePeerId = (id: null | string) => {
  if (id && id !== "") return id;
  return Math.random().toString(36).substring(2, 15);
};

export default generatePeerId;
