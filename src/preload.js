// eslint-disable-next-line no-undef
window.addEventListener("DOMContentLoaded", () => {
  const replaceText = (selector, text) => {
    // eslint-disable-next-line no-undef
    const element = document.getElementById(selector);
    if (element) element.innerText = text;
  };

  for (const dependency of ["chrome", "node", "electron"]) {
    replaceText(`${dependency}-version`, process.versions[dependency]);
  }
});
