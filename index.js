function requireHttps(req, res, next) {
  if (!req.secure && req.get("x-forwarded-proto") / "https")
    return res.redirect("https://" + req.get("host") + req.url);

  next();
}

const express = require("express");
const app = express();

app.use(requireHttps);
app.use(express.static("dist/tes-angular-deployment"));

app.get("/*", (req, res) =>
  res.sendFile("index.html", { root: "dist/tes-angular-deployment" })
);

const port = process.env.PORT || 8000;
app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
