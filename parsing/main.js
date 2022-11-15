const axios = require("axios");
const app = require("express")();

app.listen(8080, () => console.log("$>SERVER STARTED!"));

app.set("views", `${__dirname}/views`);
app.set("view engine", "ejs");

app.get("/", (_, response) => response.render("index", { partial: "./parts/navigation" }));

app.get("/:count/news/for/:category/:subcategory?", (request, response) => {


    const options = {
        method: "get",
        url: `https://api.rss2json.com/v1/api.json?rss_url=https://www.vedomosti.ru/rss/rubric/${request.params.category}/${request.params.subcategory || ""}`
    }

    axios(options)
        .then((res) => {
            let title = res.data.feed.title.split(". ")[1] + " :";
            let data = res.data.items.slice(0, request.params.count);
            response.render("index", { partial: "./parts/article", title, data })
        })
        .catch((error) => {
            console.log(error);
            response.send("<p>ERROR</p>");
        })
});