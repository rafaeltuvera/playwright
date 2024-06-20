import { Locator, Page , expect} from "@playwright/test";
import { HomePage } from "./homePage";

export class LoginPage {
 readonly page : Page;
 readonly user_name: Locator;
 readonly password: Locator;
 readonly btn_login: Locator;

 constructor(page: Page){
    this.page = page;
    this.user_name = page.locator('input[name="uid"]');
    this.password = page.locator('input[name="password"]');
    this.btn_login = page.locator('input[name="btnLogin"]');
 }


 async goto() {
    await this.page.goto('/V4');
  }

  async signIn(username: string, password: string){
    await this.goto()
    await this.user_name.fill(username);
    await this.password.fill(password)
    await this.btn_login.click();
    await expect(this.page.getByText(username)).toBeVisible();

    return new HomePage(this.page);
  }

}