const exp = require("express");
const path = require("path");
const app = exp();

let data = require("./data.json");

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "/views"));

app.use(exp.static(path.join(__dirname, "/public")));

app.listen(3000, () => {
    console.log("starts Listening at port 3000");
})

app.get("/", (req, res) => {
    res.render("home.ejs");
})

app.get("/r/:subredditSearch", (req, res) => {
    const { subredditSearch } = req.params;
    if (subredditSearch in data) {
        const subreddit = data[subredditSearch];
        subreddit.search = subredditSearch;
        res.render("subreddit", { subreddit });

    } else {
        const subreddit = { search: subredditSearch };
        res.render("subreddit", { subreddit });
    }

})

app.get("/about", (req, res) => {
    res.render("about");
})