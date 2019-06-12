import { waitFontLoading } from "./utils/webfont-loader";
import "../css/app.css";
import { YearContributionsData } from "./models/contributions";

const apiEndPointURL = "https://m98-contributions.now.sh/";
//  "https://script.google.com/macros/s/AKfycbyUFOFqwSk-G2-LblqV0sUhT07z0Lwmr88yuup4B41DCwCT2hwV/exec";

Promise.all([
  fetch(apiEndPointURL).then(c => c.json() as Promise<YearContributionsData>),
  import(/* webpackChunkName: "contributionGraph" */ "./contributionGraph")
]).then(
  waitFontLoading(([data, { draw }]) => {
    draw(data);
  })
);