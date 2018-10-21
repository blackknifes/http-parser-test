process.binding("http_parser").HTTPParser = require("http-parser-js").HTTPParser;
const request = require("request");
const fs = require("fs");

let testTag = document.querySelector("#test");

function onError(err)
{
    console.error(err);
    testTag.innerHTML = err.stack;
    testTag.style.color = "red";
}

function onFinish()
{
    console.log("request success.");
    testTag.innerHTML = "request success.";
    testTag.style.color = "cyan";
}

request("http://127.0.0.1:8080", onError).pipe(fs.createWriteStream("D:/test2.txt"))
.on("error", onError)
.once("close", onFinish);
