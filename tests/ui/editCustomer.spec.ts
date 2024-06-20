import { Page, expect, test } from '@playwright/test';
import { LoginPage } from '../../pages/loginPage';
import { HomePage } from '../../pages/homePage';
import { EditUserPage , newAddress, errorMessages, invalidInput, invalidInputErrorMessages} from '../../pages/editUserPage';

const user_name: string = process.env.USER_ADMIN_USERNAME!;
const password: string = process.env.USER_ADMIN_PASSWORD!;
const userId: string = process.env.CUSTOMER_ID!;

test.describe('Edit user details test', async ()=>{

    // Run tests in order, in the same worker process.
    test.describe.configure({ mode: "default" });

    let loginPage: LoginPage;
    let homePage : HomePage;
    let editUserPage: EditUserPage;
    let page: Page;

    test.beforeAll('Manager login', async ({browser}) =>{
        page = await browser.newPage();
        loginPage = new LoginPage(page);
        homePage = await loginPage.signIn(user_name, password);
        editUserPage = await homePage.editUser();
        await editUserPage.searchUserById(userId);
    })

    test.afterAll(async () => {
        await page.close();
      });

    test('Validate name, gender and date of birth is disabled', async() =>{
        await editUserPage.isNameDisabled();
        await editUserPage.isGenderDisabled();
        await editUserPage.isDobDisabled();
     })

    test('Validate details are updated', async() =>{
        await editUserPage.updateAddress(newAddress);
        await editUserPage.searchUserById(userId);
        expect(editUserPage.city).toHaveValue(newAddress.city)
        expect(editUserPage.state).toHaveValue(newAddress.state)
    })

    test('Validate error messages', async() =>{
        await editUserPage.clearAllFields();
        await expect(editUserPage.errMessages).toHaveText(errorMessages);
    })

    test('Validate invalid input error messages', async() =>{
        await editUserPage.clearAllFields();
        await editUserPage.fillDetails(invalidInput);
        await expect(editUserPage.errMessages).toHaveText(invalidInputErrorMessages);
    })

})

