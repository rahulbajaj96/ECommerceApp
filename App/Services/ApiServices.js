import { get_From_AsyncStorage } from "./StorageService";

export async function ApiCallPost(path, formdata) {
    var ApiCallResposne = await ApiCall(path, formdata, "POST");
    // console.log('awaitApiCallResposne', ApiCallResposne)
    return ApiCallResposne;
}
export async function ApiCallGet(path, formdata) {
    var ApiCallResposne = await ApiCall(path, formdata, "GET");
    // console.log('awaitApiCallResposne', ApiCallResposne)
    return ApiCallResposne;
}
async function ApiCall(path, formdata, method) {
    let ApiModules = await getApiRequirement(method, formdata);
    try {
        console.log('api url', path)
        console.log('formdata', formdata)
        let Apiresponse = await fetch(path, ApiModules);
        let JSONResponse = await Apiresponse.json();
        // console.log('JSONResponse', JSONResponse)
        return JSONResponse;
    }
    catch (e) {
        console.log('error', e);
        return false;
    }
}
async function getApiRequirement(method, formdata) {
    const Headers = await getHeaders();
    var ApiModules = {}
    if (method == 'POST') {
        ApiModules = { method: method, headers: Headers, body: formdata }
    }
    else {
        ApiModules = { method: method, headers: Headers, body: formdata }
    }
    console.log('Api Modules', ApiModules)
    return ApiModules;
}
async function getHeaders() {
    let headers = {}
    await get_From_AsyncStorage('@Auth_Token').then(token => {
        if (token == null) {
            headers = {
                Accept: "application/json",
                "Content-Type": "multipart/form-data"
            }
        }
        else {
            headers = {
                Accept: "application/json",
                "Content-Type": "multipart/form-data",
                Authorization: `Bearer ${token}`
            }
        }
    })
    console.log('get geaders', headers)

    return headers;
}
