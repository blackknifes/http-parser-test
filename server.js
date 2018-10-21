const http = require("http");
const fs = require("fs-extra-promise");
const path = require("path");

const test = "D:/test.txt";

function onError(err)
{
    if(err)
        console.error(err);
}

async function onRequestAsync(request, response) {
    let fileData = await fs.readFileAsync(test);
    let len = fileData.length;
    let chunkedSize = parseInt(len / 10);
    
    response.setHeader("Transfer-Encoding", "chunked");
    response.setHeader("Content-Type", "application/download");
    response.setHeader("Content-Disposition", "attachment;filename=test.txt");
    response.setHeader("Content-Length", len);
    response.flushHeaders();
    for(let i = 0; i < 9; ++i)
    {
        let chunk = fileData.subarray(i * chunkedSize, (i + 1) * chunkedSize);
        response.write(chunk.length.toString(16), onError);
        response.write(chunk, onError);
    }

    let lastChunk = fileData.subarray(9 * chunkedSize);
    response.write(lastChunk.length.toString(16), onError);
    response.write("\r\n", onError);
    response.write(lastChunk, onError);
    response.write("\r\n", onError);   
    response.write("0", onError);
    response.end("\r\n\r\n", onError);
}

function onRequest(request, response)
{
    onRequestAsync(request, response).then(()=>{
        console.log("request finish.");
    }).catch((err)=>{
        console.error(err);
    });
}

http.createServer(onRequest).listen(8080).once("listening", ()=>{
    console.log("listening...");
});
