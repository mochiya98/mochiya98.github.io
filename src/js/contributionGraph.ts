import 'oes-vertex-attrib-array-polyfill';
import 'object-assign-polyfill';
import { easeOutBack, easeOutQuad } from "./utils/easing";
import Forest from "./utils/forest";
import { calcContributions } from "./utils/math";
import { YearContributionsData } from "./models/contributions";

const animateContributionsCounter = function(data: YearContributionsData) {
  const elCount = document.getElementById("forest-view__contributions__count");
  const contributions = calcContributions(data).totalContributions;
  const duration = data.length + 13;
  const numberFormat = new Intl.NumberFormat();
  let initialDate = Date.now();
  let frame = 0;
  function animate() {
    const realFrame = (Date.now() - initialDate) / 16.6666;
    if (realFrame < duration) {
      requestAnimationFrame(animate);
      if (++frame % 2) return;
    }
    elCount!.textContent = numberFormat.format(
      (contributions * easeOutQuad(realFrame / duration)) | 0
    );
  }
  animate();
};

export const draw = function(data: YearContributionsData) {
  const container = document.getElementById("forest-view") as HTMLElement;
  container.className = "loaded";
  new Forest({ data, container }).animate();
  animateContributionsCounter(data);
};
