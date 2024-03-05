
const checkModuleBundling = () => {
  const fontCheck = document.createElement("p");
  fontCheck.setAttribute("id","js-bundling");
  fontCheck.textContent = "If this text shows, webpack is successfully bundling js files";
  return fontCheck;
}

export {
  checkModuleBundling
};