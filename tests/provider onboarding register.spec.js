const { test, expect } = require('@playwright/test');

test("Verify That User is able to Register in Provider MantraCare Dashboard Successfully", async ({ browser }) => {
   const context = await browser.newContext({
    permissions: ['geolocation'],
    geolocation: {
      latitude: 17.3850,
      longitude: 78.4867
    }
  });
  const page = await context.newPage();


                                                                                //Basic Information
  await page.goto("https://provider.mantracare.com/login");
  await expect(page).toHaveURL('https://provider.mantracare.com/login');
 

  await page.locator('//a[@href="/register"]').click();
  await expect(page).toHaveURL('https://provider.mantracare.com/register');

  await page.locator('//input[@placeholder="Enter your name"]').type('Karthik', { delay: 50 });
  await page.locator('//input[@placeholder="Enter your email"]').type('sos@gmail.com', { delay: 50 });
  await page.locator('//input[@placeholder="Phone Number"]').type('7894561323', { delay: 50 });
  await page.locator('//input[@placeholder="Enter your password"]').type('zxcvbnm$$$', { delay: 50 });
  await page.locator('//button[@type="submit"]').click();


  await expect(page).toHaveURL('https://provider.mantracare.com/onboarding');
  await page.waitForTimeout(1000);
  await page.locator('//input[@name="practiceAddress"]').type('Pashim Vihar Delhi',{delay:100})
  const location = page.locator('//input[@placeholder="Practice location / Nearby Landmark ..."]')
  await location.click();
  await page.waitForTimeout(1000)
  await location.type('Paschim',{delay:50})
  await page.waitForTimeout(1000)
  await page.locator('//*[@id="__next"]/div[1]/div[2]/div[4]/div/div[3]/div[1]/div/div/div[1]').click()
  await page.waitForTimeout(500)
  const datepicker = page.locator('//input[@name="dateOfBirth"]')
  await datepicker.type('01-02-2003',{delay:50})
  await expect(datepicker).toBeTruthy
  await page.locator('//input[@placeholder="Phone number"]').type(String(7986543212))
  await page.waitForTimeout(500)

  const selectlanguage = page.locator('//*[@id="__next"]/div[1]/div[2]/div[4]/div/div[5]/div[1]/div/div[2]/div[1]')
  await selectlanguage.click()
  await page.locator('//*[@id="__next"]/div[1]/div[2]/div[4]/div/div[5]/div[1]/div/div[3]/div[1]/form/input').click()
  await page.locator('//*[@id="__next"]/div[1]/div[2]/div[4]/div/div[5]/div[1]/div/div[3]/div[1]/form/input').type("English",{delay:50})
  await page.locator('//*[@id="__next"]/div[1]/div[2]/div[4]/div/div[5]/div[1]/div/div[3]/div[3]/label/input').click()

  await page.locator('//*[@id="__next"]/div[1]/div[2]/div[4]/div/div[5]/div[2]/div/div[2]/div[1]').click({delay:50})
  await page.locator('//*[@id="__next"]/div[1]/div[2]/div[4]/div/div[5]/div[2]/div/div[3]/div[2]/div[2]').click({value:"Male"})
  await page.locator('//*[@id="__next"]/div[1]/div[2]/div[5]/button').click()

                                                                              //Description 

  await page.locator('//*[@id="__next"]/div[1]/div[2]/div[4]/div/div[1]/div/button/span[1]').click()
  await page.locator('//*[@id="__next"]/div[1]/div[2]/div[4]/div/div[1]/div/div[1]/div[1]/div/button/span').click()
  await page.locator('//*[@id="__next"]/div[1]/div[2]/div[4]/div/div[1]/div/div[1]/div[1]/div[2]/label[8]/span').check()
  await page.keyboard.press('Escape');

  await page.locator('//*[@id="__next"]/div[1]/div[2]/div[4]/div/div[2]/div[1]/textarea').fill('A doctor (physician) is a trained medical professional responsible for promoting, maintaining, or restoring human health through the diagnosis and treatment of injury, disease, and mental conditions. They work in hospitals, clinics, and private practices to examine patients, prescribe medication, order tests, and provide preventative care, requiring extensive education and licensure.');
  await page.locator('//*[@id="__next"]/div[1]/div[2]/div[4]/div/div[2]/div[1]/div/div[1]/div/div[2]/div[1]').click()
  await page.keyboard.press('Escape')

  const specilizations = [
    '//*[@id="__next"]/div[1]/div[2]/div[4]/div/div[2]/div[1]/div/div[1]/div/div[3]/div[3]/label[1]/input',
    '//*[@id="__next"]/div[1]/div[2]/div[4]/div/div[2]/div[1]/div/div[1]/div/div[3]/div[3]/label[2]/input',
    '//*[@id="__next"]/div[1]/div[2]/div[4]/div/div[2]/div[1]/div/div[1]/div/div[3]/div[3]/label[3]/input',
    '//*[@id="__next"]/div[1]/div[2]/div[4]/div/div[2]/div[1]/div/div[1]/div/div[3]/div[3]/label[4]/input'
  ];

  for(const locator of specilizations){
      await page.locator(locator).check({delay:50})
  }
  for(const locator of specilizations){
    await expect(page.locator(locator).isChecked).toBeTruthy
    await page.waitForTimeout(500)
  }
  await page.keyboard.press('Escape');

  await page.locator('//*[@id="__next"]/div[1]/div[2]/div[4]/div/div[2]/div[1]/div/div[2]/div/div[2]/div[1]').click()
  await page.locator('//*[@id="__next"]/div[1]/div[2]/div[4]/div/div[2]/div[1]/div/div[2]/div/div[3]/div[2]/div[6]').click()
  await page.keyboard.press('Escape');

  await page.locator('//*[@id="__next"]/div[1]/div[2]/div[4]/div/div[2]/div[1]/div/div[3]/div/div[2]/div[1]').click()
  await page.locator('//*[@id="__next"]/div[1]/div[2]/div[4]/div/div[2]/div[1]/div/div[3]/div/div[3]/div[2]/label/input').check()
  await page.keyboard.press('Escape');

  await page.locator('//*[@id="__next"]/div[1]/div[2]/div[4]/div/div[2]/div[1]/div/div[4]/div/div[2]/div[1]').click()
  await page.locator('//*[@id="__next"]/div[1]/div[2]/div[4]/div/div[2]/div[1]/div/div[4]/div/div[3]/div[2]/label/input').check()
  await page.waitForTimeout(1000)

  page.mouse.wheel(0,100)
  await page.locator('//*[@id="__next"]/div[1]/div[2]/div[4]/div/div[2]/div[3]/div/div/div/div/div[2]/div[1]').click()
  await page.locator('//*[@id="__next"]/div[1]/div[2]/div[4]/div/div[2]/div[3]/div/div/div/div/div[3]/div[2]/div').click()
  await page.locator('//*[@id="__next"]/div[1]/div[2]/div[4]/div/div[2]/div[3]/div/div/button').click()
  await page.locator('//*[@id="__next"]/div[1]/div[2]/div[5]/button[2]').click()
  await page.pause()

});
