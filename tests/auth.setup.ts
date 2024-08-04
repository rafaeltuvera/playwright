import {test as setup} from '@playwright/test'

setup ('api token', async({request}) =>{
    const response =  await request.get(`https://www.quickpickdeal.com/api/Auth/GetBearerToken`);
    const body =  await response.json();
    process.env.TEST_TOKEN = body.Data.Token;
})