import { Builder,By,until } from 'selenium-webdriver'
import assert from 'assert';

(async function loginTest() {
    let driver;
    const url = 'http://localhost:5173';

    try {
        driver = await new Builder().forBrowser('firefox').build();
        await driver.get(url);

        //Should show error for invalid credentials
        await driver.findElement(By.name('username')).sendKeys('invalidUser');
        await driver.findElement(By.name('password')).sendKeys('invalidPass');
        await driver.findElement(By.css('button[type="submit"]')).click();
        
        const alert = await driver.wait(until.elementLocated(By.css('.mantine-Alert-title')), 10000);
        const alertText = await alert.getText();
        assert.strictEqual(alertText, 'Error');
        console.log(`Error shown: ${alertText}`)


    }catch(error) {
        console.log(error)
    }finally {
        await driver.quit();
    }
}())