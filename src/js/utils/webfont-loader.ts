declare global {
  interface Window {
    WebFontConfig: {
      custom?: {
        families: string[];
        testStrings?: { [key: string]: string };
        urls: string[];
      };
      google?: { families: string[]; text?: string };
      fontdeck?: {
        id: string;
      };
      monotype?: { projectId: string; version: number; loadAllFonts: boolean };
      loading?: () => void;
      active?: () => void;
      inactive?: () => void;
      fontloading?: (familyName: string, fvd: string) => void;
      fontactive?: (familyName: string, fvd: string) => void;
      fontinactive?: (familyName: string, fvd: string) => void;
    };
  }
}
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
export const waitFontLoading = <T extends Array<any>>(
  cb: (..._: T) => void
) => (...args: T) => {
  wfcb = () => cb.apply(null, args);
  active ? wfcb() : 0;
};

const wf = document.createElement("script");
wf.src = "https://ajax.googleapis.com/ajax/libs/webfont/1.6.26/webfont.js";
wf.async = true;
document.body.appendChild(wf);
