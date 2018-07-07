const https = require("https");
const UrlFetchApp = {
  fetch: function(url) {
    return new Promise(resolve => {
      https
        .request(url, res => {
          let r = [];
          res.on("data", c => r.push(c));
          res.on("end", () =>
            resolve({
              getContentText: () => Buffer.concat(r).toString()
            })
          );
        })
        .end();
    });
  }
};
module.exports = (req, res) => {
  (async () => {
    var regex = /data-(count|date)="?([^" \/]+)"?[\S 　\t]+data-(count|date)="?([^" \/]+)"?[ \/]/g;
    function text2contributions(text) {
      var m,
        o = [];
      for (regex.lastIndex = 0; (m = regex.exec(text)); o.push(m));
      return o.map(function([, k1, v1, k2, v2]) {
        const c = {};
        c[k1] = v1;
        c[k2] = v2;
        c.count -= 0;
        return c;
      });
    }
    const response = await UrlFetchApp.fetch(
      "https://github.com/users/mochiya98/contributions"
    );
    const content = response.getContentText("UTF-8");
    const data = content
      .split("</g")
      .map(function(c) {
        return text2contributions(c);
      })
      .filter(function(c) {
        return c.length !== 0;
      });
    payload = JSON.stringify(data);
    res.writeHead(200, {
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "GET",
      "Access-Control-Allow-Headers": "Origin, Accept, Content-Type",
      "Access-Control-Max-Age": "21600",
      "Content-Type": "application/json; charset=utf-8",
      "Cache-Control": "public, max-age=21600, s-maxage=21600"
    });
    res.end(payload);
  })();
};
