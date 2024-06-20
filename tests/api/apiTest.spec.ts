import test, { APIRequestContext, expect } from "@playwright/test";
import { ApiRequests } from "../../api/apiRequests";
import { validUserData, invalidData } from "../../data/apidata";



test.describe('Api tests', async ()=> {
    
    let api: ApiRequests;
    let token: string;

    // Run tests in order, in the same worker process.
    test.describe.configure({ mode: "default" });

    test.beforeEach('set up', async ({request}) => {
        api = new ApiRequests(request)
        const response =  await api.getToken();
        token = response.Data.Token;
    })

    // get invalid customer
    test('should not find invalid customer', async() =>{
        const response = await api.getCustomerById(32323,token)
        expect(response.Error).toEqual('customer Id not found in the database, please try again!')
      })

    // create customer
      test('should create customer', async() =>{
        const response = await api.createNewCustomer({token, data: validUserData});
        const customer = await api.getCustomerById(response.Data.Id, token)
        expect(customer.Data.Email).toEqual(validUserData.email)
        expect(customer.Data.FirstName).toEqual(response.Data.FirstName)
        expect(customer.Data.LastName).toEqual(response.Data.LastName)
        expect(customer.Data.Id).toEqual(response.Data.Id)
      })

      // 400 
      test('should return response code 400 when invalid data is passed', async() =>{
        await api.createNewCustomerAndReturnStatus({token, statusCode: 400, data: invalidData});
      })

      // 401 
      test('should return 401 when token is invalid', async() =>{
        await api.createNewCustomerAndReturnStatus({token: 'invalidxx', statusCode: 401, data: invalidData});
      })

     // 415
     test('should return 415 data is not passed', async() =>{
       await api.createNewCustomerAndReturnStatus({token: token, statusCode: 415});
    })
})