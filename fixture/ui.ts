import {test as base } from "@playwright/test";
import { LoginPage } from "../pages/loginPage";
import { HomePage } from "../pages/homePage";
import { EditUserPage } from "../pages/editUserPage";

type SearchUser = {
    loginPage: LoginPage;
    homePage: HomePage;
    editUserPage: EditUserPage;
}

const user_name: string = process.env.USER_ADMIN_USERNAME!;
const password: string = process.env.USER_ADMIN_PASSWORD!;

export const test = base.extend <SearchUser> ({
    
    loginPage: [async ({page}, use) => {
        const loginPage = new LoginPage(page);
        const homePage = await loginPage.signIn(user_name, password);
        await homePage.editUser();

     // Use the fixture value in the test.
    await use(loginPage);

    }, {auto: true}], // will run before before, before each annotation

    homePage: async ({page, browser}, use) =>{
        await use (new HomePage(page));
    },

    editUserPage: async ({page, browser}, use) =>{
       await use (new EditUserPage(page));
    },
})

export { expect } from '@playwright/test';