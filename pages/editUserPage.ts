import { Locator, Page, expect } from "@playwright/test";
import { faker } from '@faker-js/faker';

type userDetails ={
    address: string;
    city: string;
    state: string;
    pin: string;
    mobile: string;
    email: string;
}

export class EditUserPage {

    readonly page:Page;
    readonly txtbox_customer_id: Locator;
    readonly btn_submit: Locator;
    readonly btn_submit_changes: Locator;
    readonly customer_name: Locator;
    readonly gender: Locator;
    readonly dob: Locator;
    readonly address: Locator;
    readonly city: Locator;
    readonly state: Locator;
    readonly pin: Locator;
    readonly mobile: Locator;
    readonly emailId: Locator;
    readonly errMsgCity: Locator;
    readonly errMsgState: Locator;
    readonly errMsgPin: Locator;
    readonly errMsgMobile: Locator;
    readonly errMessages: Locator;
    
    constructor(page: Page){
        this.page = page;
        this.txtbox_customer_id = page.locator("input[name='cusid']");
        this.btn_submit = page.locator("input[name='AccSubmit']");
        this.btn_submit_changes = page.locator("input[name='sub']");
        this.customer_name = page.locator("input[name='name']")
        this.gender = page.locator('input[name="gender"]');
        this.dob = page.locator('input[name="dob"]');
        this.address = page.locator('textarea[name="addr"]');
        this.city = page.locator('input[name="city"]');
        this.state = page.locator('input[name="state"]');
        this.pin = page.locator('input[name="pinno"]');
        this.mobile = page.locator('input[name="telephoneno"]');
        this.emailId = page.locator('input[name="emailid"]');
        this.errMsgCity = page.locator('label[id="message4"]');
        this.errMsgState = page.locator('label[id="message5"]');
        this.errMsgPin = page.locator('label[id="message6"]');
        this.errMsgMobile = page.locator('label[id="message7"]');
        this.errMessages = page.locator('table tbody tr td label:visible');
    }

    async searchUserById(userId: string){
        await this.txtbox_customer_id.fill(userId);
        await this.btn_submit.click();
        await expect(this.page.getByText('Edit Customer').last()).toBeVisible();
    }

    async isNameDisabled(){
        await expect(this.customer_name).toBeDisabled();
    }

    async isGenderDisabled(){
        await expect(this.gender).toBeDisabled();
    }

    async isDobDisabled(){
        await expect(this.dob).toBeDisabled();
    }

    async clearAllFields() {
        await this.address.fill('') ;
        await this.city.fill('') ;
        await this.state.fill('') ;
        await this.pin.fill('') ;
        await this.mobile.fill('');
        await this.emailId.fill('');
    }

    async updateAddress(address:{city: string, state: string}){
        await this.city.fill('') ;
        await this.state.fill('') ;
        await this.city.fill(address.city);
        await this.state.fill(address.state);
        await this.btn_submit_changes.click()
    }

    async fillDetails(details: userDetails){
        await this.address.fill(details.address) ;
        await this.city.fill(details.city) ;
        await this.state.fill(details.state) ;
        await this.pin.fill(details.pin) ;
        await this.mobile.fill(details.mobile);
        await this.emailId.fill(details.email);
    }
}


export const newAddress = {
    city: `${faker.location.city()}`,
    state:`${faker.location.state()}`,
}


export const errorMessages: Array<string> = [
    "Address Field must not be blank",
    "City Field must not be blank",
    "State must not be blank",
    "PIN Code must not be blank",
    "Mobile no must not be blank",
    "Email-ID must not be blank"
]

export const invalidInputErrorMessages: Array<string> = [
    "Special characters are not allowed",
    "Numbers are not allowed",
    "Special characters are not allowed",
    "Characters are not allowed",
    "Characters are not allowed",
    "Email-ID must not be blank"
]

export const invalidInput = {
    address: "%",
    city: "2314432",
    state: "$",
    pin: "x",
    mobile: "x",
    email: "xxx",
}