import * as request from "../lib/request";


const baseUrl = 'http://localhost:3030/jsonstore/customers';



export const getAll = async () => {
    const result = await request.get(baseUrl);

    return Object.values(result);
};
export const getOne = async (customer_id) => {

    const result = await request.get(`${baseUrl}/${customer_id}`, );

    return result;
}

