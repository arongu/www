// =============================================================
// JSON
// =============================================================

export { httpHandler, jsonHandler };

const httpHandler = (response) => {
    if ( !response.ok ) {
        throw new Error('Could not fetch model!');
    }

    return response;
}

const jsonHandler = (response, onSuccess, onError) => {
    response.json().then(onSuccess).catch(onError);
}
