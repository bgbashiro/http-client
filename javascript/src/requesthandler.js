import RJSON from 'relaxed-json';

function reformatResponse(status, content) {

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

async function handleGETRequest(url, header) {

    let response = await fetch(url, {
        method: 'GET',
        headers: header?header:{}
    });

    let status = response.status;
    let content = await response.text();

    return reformatResponse(status, content)
}

function getContentType(header) {
    // returns Content-Type set in header, defaults to application/json if not specified
    if (!header) {
        return 'application/json'
    } else {
        return header['Content-Type']?header['Content-Type']:'application/json'
    }
}

function prepareBody(contentType, body) {
    if (contentType == "application/json") {
        return JSON.stringify(body)
    } else if (contentType == "application/x-www-form-urlencoded") {
        return new URLSearchParams(body).toString()
    } else {
        return body
    }
}

async function handlePOSTRequest(url, header, body) {
    let response = await fetch(url, {
        method: 'POST',
        headers: header?header:{},
        body: prepareBody(getContentType(header), body)
    })

    let status = response.status;
    let content = await response.text();
    
    return reformatResponse(status, content)
}

async function handlePUTRequest(url, header, body) {
    let response = await fetch(url, {
        method: 'PUT',
        headers: header?header:{},
        body: prepareBody(getContentType(header), body)
    })

    let status = response.status;
    let content = await response.text();
    
    return reformatResponse(status, content)
}

async function handlePATCHRequest(url, header, body) {
    let response = await fetch(url, {
        method: 'PATCH',
        headers: header?header:{},
        body: prepareBody(getContentType(header), body)
    })

    let status = response.status;
    let content = await response.text();
    
    return reformatResponse(status, content)
}

async function handleDELETERequest(url, header, body) {
    let response = await fetch(url, {
        method: 'DELETE',
        headers: header?header:{},
        body: prepareBody(getContentType(header), body)
    })

    let status = response.status;
    let content = await response.text();
    
    return reformatResponse(status, content)
}

function handleRequest(request) {
    if (request.method == "GET") {
        return handleGETRequest(request.url, request.header);
    } else if (request.method == "POST") {
        return handlePOSTRequest(request.url, request.header, request.body)
    } else if (request.method == "PUT") {
        return handlePUTRequest(request.url, request.header, request.body)
    } else if (request.method == "PATCH") {
        return handlePATCHRequest(request.url, request.header, request.body)
    } else if (request.method == "DELETE") {
        return handleDELETERequest(request.url, request.header, request.body)
    } else {
        throw Error(`${request.method} not implemented`);
    }

}

export { handleRequest };