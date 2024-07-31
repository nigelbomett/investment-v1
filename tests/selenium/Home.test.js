import {Builder} from 'selenium-webdriver'
import assert from 'assert';

const url = 'http://localhost:5173';

(async function homeTest() {
    let driver;

    try {
        driver = await new Builder().forBrowser('firefox').build();
        await driver.get(url)

        let title = await driver.getTitle();
        assert.equal("Fearless Investment",title);

        await driver.manage().setTimeouts({implicit: 500});
        await driver.manage().window().maximize();

    } catch (error) {
       console.log(error) 
    }finally {
        await driver.quit();
    }
}())