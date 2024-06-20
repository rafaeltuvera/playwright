import { Locator, Page } from "@playwright/test";
import { EditUserPage } from "./editUserPage";

export class HomePage {
    readonly page: Page;
    readonly homepage_username: Locator;
    readonly edit_customer: Locator;

    constructor(page: Page) {
        this.page = page;
        this.homepage_username = page.locator('tr.heading3 td');
        this.edit_customer = page.getByText('Edit Customer', {exact: true});
    }

    async gotoEditUserPage(){
        await this.page.goto('/V4/manager/EditCustomer.php');
    }

    async editUser() {
        await this.gotoEditUserPage();
        return new EditUserPage(this.page);
    }
}