import { base_url } from './url';

/* ============================================================================= 
 Helper
============================================================================= */
const call = async (baseUrl, method, body, headers, credentials, content_type) => {

    const user_details = await localStorage.getItem('user_detail')
    const user_details_parse = JSON.parse(user_details)
    const token = user_details_parse?.token
    console.log('user_details_parse', user_details_parse)

    const checkStatus = async api_response => {
        const response = await api_response.json()

        if (response.status == true) {
            return response;
        }

        const error = new Error(response.message);
        error.response = response;

        throw error;
    };

    const checkError = response => {
        if (response.status == false) {
            throw new Error(response.message);
        }
        if (response.status === true || response.Status === true)
            return response;
    };


    const config = {
        method: method || 'POST',
        headers: {
            Accept: headers || 'application/json',
            // 'Content-Type': headers || 'application/json',
        },
    };

    console.log('config token', config)
    // if (headers) {
    //   config.headers = headers
    // }


    if (body) {
        config.body = body;
    }
    if (credentials) {
        config.credentials = credentials;
    }
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    if (content_type) {
        config.headers['Content-Type'] = 'application/json';
    }



    let response;
    try {
        console.log('url =>', {
            url: `${base_url + baseUrl}`,
            config
        })
        response = await fetch(`${base_url + baseUrl}`, config);

        response = await checkStatus(response)
        response = await checkError(response)
        return response;
    } catch (error) {
        console.log('url =>', {
            url: `${base_url + baseUrl}`,
            config
        })
        throw new Error(error.message);
    }
};

/* ============================================================================= 
   concat array
============================================================================= */
const _concatArray = (param, ...arrs) =>
    []
        .concat(...arrs)
        .reduce(
            (a, b) => (!a.filter(c => b[param] === c[param]).length ? [...a, b] : a),
            [],
        );

/* ============================================================================= 
   update object
============================================================================= */
const _updateObject = (param, obj, arr) =>
    arr.map(v => {
        if (v[param] === obj[param]) {
            return obj;
        }
        return v;
    });

/* ============================================================================= 
   delete object
============================================================================= */
const _deleteObject = (param, val, arr) => arr.filter(v => v[param] !== val);
/* ============================================================================= 
   get object
============================================================================= */
const _getObject = (param, val, arr) => arr.filter(v => v[param] === val)?.[0]?.[param];

/* Exports
============================================================================= */
export { call, _concatArray, _updateObject, _deleteObject, _getObject };