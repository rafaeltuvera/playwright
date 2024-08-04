import { APIRequestContext, expect } from "@playwright/test";

export type newCustomerParams = {
    email?: string;
    firstName?: string;
    lastName?: string;
}

export type getCustomerResponse = {
    Id: number;
    Email: string;
    FirstName: string;
    LastName: string;
    IsMaster: boolean;
    CreatedAt: Date;
}


export type getAllcustomerResponse = {
    Success: boolean;
    Error: null | string;
    Data: Array<getCustomerResponse>
}

export type getTokenResponse ={
    Success: boolean;
    Error: null | string;
    Data: {
        Token: string;
        Created: Date;
        Expires: Date;
    }
}

export type getCustomerByIdResponse ={
    Success: boolean;
    Error: null | any;
    Data: getCustomerResponse
}

export class ApiRequests {
    private request: APIRequestContext;
    private url: string;
    private auth : string;

    constructor(request: APIRequestContext, url = 'https://www.quickpickdeal.com/api'){
        this.url = url;
        this.request = request;
        this.auth = `${process.env.TEST_TOKEN}`
    }

    async getToken() : Promise<getTokenResponse>{
        let body: getTokenResponse | undefined;

        await expect
            .poll(
                async () => {
                    const response =  await this.request.get(`${this.url}/Auth/GetBearerToken`);
                    body =  await response.json();
                    return response.status();
                },
                {
                    message: "Could'nt get Token",
                    intervals: [1000]
                }

            ).toEqual(200);

            return body!;
    }

    async getCustomerById (id: number, token?: string){
        let body: getCustomerByIdResponse | undefined;

        await expect
            .poll(
                async () =>{
                    const response = await this.request.get(`${this.url}/Customer/GetCustomerById?id=${id}`,
                        {
                            headers: {
                                "Authorization": `bearer ${token}`,
                            }
                        }
                    );
                    body =  await response.json();
                    return response.status();
                },
                {
                    message: "Could'nt get user",
                    intervals: [1000]
                }
            ).toEqual(200);

            return body!;
    }



    async createNewCustomer(params:{token: string, data: newCustomerParams}) {
        let body: getCustomerByIdResponse | undefined;
     

        await expect.poll(
            async () =>{
                const response = await this.request.post(`${this.url}/Customer/CreateCustomer`, 
               {
                   data: params.data,
                   headers: {
                       "Authorization": `bearer ${params.token}`,
                   }
               },
           );
               body =  await response.json();
               return response.status()
           },
          
        ).toEqual(200)
        
        return body!;
    }

    async createNewCustomerAndReturnStatus(params:{token: string, statusCode: number, data?: newCustomerParams}) {     
        await expect.poll(
            async () =>{
                const response = await this.request.post(`${this.url}/Customer/CreateCustomer`, 
               {
                   data: params.data,
                   headers: {
                       "Authorization": `bearer ${params.token}`,
                   }
               },
           );
               return response.status()
           },
           {
            message: `returned response code ${params.statusCode}`
           }
        ).toEqual(params.statusCode)
        
    }
}