import RJSON from 'relaxed-json';

async function handleGETRequest(url) {

    let response = await fetch(url);
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

function handlePOSTRequest(request) {
    return null
}

function handleRequest(request) {
    if (request.method == "GET") {
        return handleGETRequest(request.url);
    } else {
        throw Error(`${request.method} not implemented`);
    }

}

export { handleRequest };