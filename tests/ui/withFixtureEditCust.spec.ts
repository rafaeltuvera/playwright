
import { newAddress, errorMessages, invalidInput, invalidInputErrorMessages} from '../../pages/editUserPage';
import { test, expect } from '../../fixture/ui';

const userId: string = process.env.CUSTOMER_ID!;

test.describe('Edit user details test', async ()=>{

    test.beforeEach('login and search user', async ({editUserPage})=> {
        editUserPage.searchUserById(userId);
    })

    test('Validate name, gender and date of birth is disabled', async({editUserPage}) =>{
        await editUserPage.isNameDisabled();
        await editUserPage.isGenderDisabled();
        await editUserPage.isDobDisabled();
     })

    test('Validate details are updated', async({editUserPage}) =>{
        await editUserPage.updateAddress(newAddress);
        await editUserPage.searchUserById(userId);
        expect(editUserPage.city).toHaveValue(newAddress.city)
        expect(editUserPage.state).toHaveValue(newAddress.state)
    })

    test('Validate error messages', async({editUserPage}) =>{
        await editUserPage.clearAllFields();
        await expect(editUserPage.errMessages).toHaveText(errorMessages);
    })

    test('Validate invalid input error messages', async({editUserPage}) =>{
        await editUserPage.clearAllFields();
        await editUserPage.fillDetails(invalidInput);
        await expect(editUserPage.errMessages).toHaveText(invalidInputErrorMessages);
    })

})

