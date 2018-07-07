window.WebFontConfig = {
  google: {
    families: ["Hind Guntur", "Share Tech Mono"],
    text: "mochiya98WebEngrI lvJSpt.Tw:@Ld,01234567us#YkFf"
  },
  active: () => {
    wfcb();
    active = true;
  }
};

let wfcb = () => {},
  active = false;
export const waitFontLoading = cb => (...args) => {
  wfcb = () => cb(...args);
  active ? wfcb() : 0;
};

const wf = document.createElement("script");
wf.src = "https://ajax.googleapis.com/ajax/libs/webfont/1.6.26/webfont.js";
wf.async = true;
document.body.appendChild(wf);
