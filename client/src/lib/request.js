const buildOptions = (data) => {
    const options = {};

    if (data) {
        options.body = JSON.stringify(data);
        options.headers = {
            'content-type': 'application/json'
        };
    }
    // const token = localStorage.getItem('accessToken');

    // // console.log(token);
    // if (token) {
    //     options.headers = {
    //         ...options.headers,
    //         'X-Authorization': token
    //     };
    // }
    return options;
};

const request = async (method, url, data) => {
    
    const response = await fetch(url, {
        ...buildOptions(data),
        method,
    });

    //will return "no content" if we proceed Logout
    if (response.status === 204) {
        return {};
    }
    const result = await response.json();

    //we can catch result later on to return messages
    if (!response.ok) {
        throw result.message;
    }

    return result;
};

export const get = request.bind(null, 'GET');
export const post = request.bind(null, 'POST');
export const put = request.bind(null, 'PUT');
export const remove = request.bind(null, 'DELETE');
export const patch = request.bind(null, 'PATCH');


