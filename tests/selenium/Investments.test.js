import { Builder, By, until } from 'selenium-webdriver'
import assert from 'assert';


(async function loginTest() {
    let driver;
    const url = 'http://localhost:5173';

    try {
        driver = await new Builder().forBrowser('firefox').build();
        

        //Log in
        await driver.get(`${url}/login`);
        await driver.findElement(By.name('username')).sendKeys('testuser');
        await driver.findElement(By.name('password')).sendKeys('testpassword');
        await driver.findElement(By.css('button[type="submit"]')).click();
        await driver.wait(until.urlIs(`${url}/investments`));

        //Add a new Investment
        await driver.findElement(By.name('name')).sendKeys('Selenium');
        await driver.findElement(By.name('amount')).sendKeys('1000');
        await driver.findElement(By.css('button[type="submit"]')).click();

        const newInvestment = await driver.wait(until.elementLocated(By.xpath("//div[text()='Selenium']")), 10000);
        assert.ok(newInvestment);
        console.log(`Investment Added: ${newInvestment}`)

    } catch (error) {
        console.log(error)
    }/* finally {
        await driver.quit();
    } */
}())