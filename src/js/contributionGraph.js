import { easeOutBack, easeOutQuad } from "./utils/easing";
import Forest from "./utils/forest";

const animateContributionsCounter = function(data) {
  const elCount = document.getElementById("forest-view__contributions__count");
  const contributions = data.flat(1).reduce((a, { count }) => a + count, 0);
  const duration = data.length + 13;
  const numberFormat = new Intl.NumberFormat();
  let frame = 0;
  function animate() {
    if (++frame < duration) requestAnimationFrame(animate);
    if (frame % 2) return;
    elCount.textContent = numberFormat.format(
      (contributions * easeOutQuad(frame / duration)) | 0
    );
  }
  animate();
};

export const draw = function(data) {
  const container = document.getElementById("forest-view");
  container.className = "loaded";
  new Forest({ data, container }).animate();
  animateContributionsCounter(data);
};