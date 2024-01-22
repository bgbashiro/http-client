import RJSON from 'relaxed-json';

async function handleGETRequest(url, header) {

    let response = await fetch(url, {
        method: 'GET',
        headers: header
    });
    let status = response.status;
    let content = await response.text();

    try {
        content = RJSON.parse(content.trim());
    } catch (error) {
        if (!(error instanceof SyntaxError)) {
            console.log(error)
        }
        content = content.trim()
    }

    return {
        status,
        content
    }
}

function prepareBody(contentType, body) {
    if (contentType=="application/json") {
        return JSON.stringify(body)
    } else if (contentType=="application/x-www-form-urlencoded") {
        return new URLSearchParams(body).toString()
    } else {
        return body
    }
}

async function handlePOSTRequest(url, header, body) {
    let response = await fetch(url, {
        method: 'POST',
        headers: header,
        body: prepareBody(header['Content-type'], body)
    })
    let status = response.status;
    let content = await response.text();

    try {
        content = RJSON.parse(content.trim());
    } catch (error) {
        if (!(error instanceof SyntaxError)) {
            console.log(error)
        }
        content = content.trim()
    }

    return {
        status,
        content
    }
}

function handleRequest(request) {
    if (request.method == "GET") {
        return handleGETRequest(request.url, request.header);
    } else if (request.method == "POST") {
        return handlePOSTRequest(request.url, request.header, request.body)
    } else {
        throw Error(`${request.method} not implemented`);
    }

}

export { handleRequest };