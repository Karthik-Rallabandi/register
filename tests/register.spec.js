const { test, expect } = require('@playwright/test');

test("Verify That User is able to Register in Provider MantraCare Dashboard Successfully", async ({ page }) => {

  await page.goto("https://provider.mantracare.com/login");
  await expect(page).toHaveURL('https://provider.mantracare.com/login');
 

  await page.locator('//a[@href="/register"]').click();
  await expect(page).toHaveURL('https://provider.mantracare.com/register');

  await page.locator('//input[@placeholder="Enter your name"]').type('Karthik', { delay: 100 });
  await page.locator('//input[@placeholder="Enter your email"]').type('munna@gmail.com', { delay: 100 });
  await page.locator('//input[@placeholder="Phone Number"]').type('7894561323', { delay: 100 });
  await page.locator('//input[@placeholder="Enter your password"]').type('zxcvbnm$$$', { delay: 100 });
  await page.locator('//button[@type="submit"]').click();


  await expect(page).toHaveURL('https://provider.mantracare.com/onboarding');
  await page.waitForTimeout(1500);
  await page.locator('//input[@name="practiceAddress"]').type('Pashim Vihar Delhi',{delay:200})
  const location = page.locator('//input[@placeholder="Practice location / Nearby Landmark ..."]')
  await location.click();
  await page.waitForTimeout(1500)
  await location.type('Paschim',{delay:200})
  await page.waitForTimeout(1500)
  await page.locator('//*[@id="__next"]/div[1]/div[2]/div[4]/div/div[3]/div[1]/div/div/div[1]').click()
  await page.waitForTimeout(1500)
  const datepicker = page.locator('//input[@name="dateOfBirth"]')
  await datepicker.type('01-02-2003',{delay:100})
  await expect(datepicker).toBeTruthy
  await page.waitForTimeout(1500)
  await page.locator('//input[@placeholder="Phone number"]').type(String(7986543212))
  await page.waitForTimeout(1500)

  const selectlanguage = page.locator('//*[@id="__next"]/div[1]/div[2]/div[4]/div/div[5]/div[1]/div/div[2]/div[1]')
  await selectlanguage.click()
  await page.locator('//*[@id="__next"]/div[1]/div[2]/div[4]/div/div[5]/div[1]/div/div[3]/div[1]/form/input').click()
  await page.locator('//*[@id="__next"]/div[1]/div[2]/div[4]/div/div[5]/div[1]/div/div[3]/div[1]/form/input').type("English",{delay:200})
  await page.locator('//*[@id="__next"]/div[1]/div[2]/div[4]/div/div[5]/div[1]/div/div[3]/div[3]/label/input').click()

  await page.locator('//*[@id="__next"]/div[1]/div[2]/div[4]/div/div[5]/div[2]/div/div[2]/div[1]').click({delay:200})
  await page.locator('//*[@id="__next"]/div[1]/div[2]/div[4]/div/div[5]/div[2]/div/div[3]/div[2]/div[2]').click({value:"Male"})
  await page.locator('//*[@id="__next"]/div[1]/div[2]/div[5]/button').click()
  await page.waitForTimeout(6000)
});