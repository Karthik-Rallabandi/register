import { test, expect } from '@playwright/test';

test("Verify That User is able to navigate to assessments section and submit all assessments in Emotional Wellbeing Module ", async ({page}) => {
  

    await page.goto("https://web.mantracare.com/login");
    await page.locator('//*[@id="email-address"]').type("karthikr9630@gmail.com",{delay:50});
    await page.locator('//*[@id="password"]').type("KARTHIK9630",{delay:50});
    await page.locator('//button[@type="submit"]').click();
    await expect(page).toHaveURL('https://web.mantracare.com/');
    await page.locator('//*[@id="__next"]/div[1]/div[2]/div[1]/div[4]/div[1]/div/h1').click();

    const scroll = page.locator('//*[@id="__next"]/div[1]/div[2]/div[1]/div[4]/div[2]/div[2]/div/h1');
    await scroll.scrollIntoViewIfNeeded();
    await scroll.click();
    await page.locator('xpath=/html/body/div[1]/section[2]/div/div/div/section/div/div[1]/div/div[2]/div').click();
    await expect(page).toHaveURL('https://app.mantracare.org/anxiety-test/');
    await page.locator('//input[@id="gform_next_button_85_42"]').click();

    const options = [
         '//*[@id="label_85_1_0"]',
         '//*[@id="label_85_15_2"]',
         '//*[@id="label_85_14_3"]',
         '//*[@id="label_85_13_0"]',
         '//*[@id="label_85_12_1"]',
         '//*[@id="label_85_11_2"]',
         '//*[@id="label_85_10_3"]'
        ];
     
     for (const option of options) {
         await page.locator(option).click();
         await page.waitForTimeout(300);
     }

     for(const option of options){
        await expect(page.locator(option)).toBeVisible();
     }
     await page.locator('//*[@id="gform_submit_button_85"]').click();
     await page.waitForLoadState('networkidle');
     await expect(page.locator('//*[@id="post-319436"]/div/div[1]/div[2]/h2')).toContainText('Anxiety Assessment Result');
     await page.pause();

    })