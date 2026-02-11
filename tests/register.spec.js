const { test, expect } = require('@playwright/test');

// increase overall test timeout to avoid flakiness
test.setTimeout(300000);

test("Verify That User is able to Register in Provider MantraCare Dashboard Successfully", async ({browser}) => {
  const context = await browser.newContext({
    permissions: ['geolocation'],
    geolocation: {
      latitude: 17.3850,
      longitude: 78.4867
    }
  });
  const page = await context.newPage();
  await page.setDefaultTimeout(120000);
  await page.setDefaultNavigationTimeout(180000);

  
  async function waitAndClick(selector, opts) {
    const l = page.locator(selector);
    await l.waitFor({ state: 'visible', timeout: 120000 });
    await l.click(opts);
  }

  
  async function waitAndType(selector, text, typeOpts) {
    const l = page.locator(selector);
    await l.waitFor({ state: 'visible', timeout: 120000 });
    await l.fill('');
    if (typeOpts) {
      await l.type(text, typeOpts);
    } else {
      await l.fill(text);
    }
  }


                                                                                //Basic Information
  await page.goto("https://provider.mantracare.com/login");
  await page.waitForLoadState('networkidle');
  await expect(page).toHaveURL('https://provider.mantracare.com/login');
  await page.waitForTimeout(800);
 

  await waitAndClick('//a[@href="/register"]');
  await page.waitForLoadState('networkidle');
  await expect(page).toHaveURL('https://provider.mantracare.com/register');
  await page.waitForTimeout(800);

  await waitAndType('//input[@placeholder="Enter your name"]','Anas',{delay:50});
  await waitAndType('//input[@placeholder="Enter your email"]','z1@gmail.com',{delay:50});
  await waitAndType('//input[@placeholder="Phone Number"]','7894561323');
  await waitAndType('//input[@placeholder="Enter your password"]','zxcvbnm$$$',{delay:50});
  await waitAndClick('//button[@type="submit"]');
  await page.waitForLoadState('networkidle');
  await page.waitForTimeout(800);
  

  await expect(page).toHaveURL('https://provider.mantracare.com/onboarding');
  await page.waitForSelector('//input[@name="practiceAddress"]', { timeout: 120000 });
  await page.locator('//input[@name="practiceAddress"]').type('Paschim Vihar Delhi',{delay:100})
  const location = page.locator('//input[@placeholder="Practice location / Nearby Landmark ..."]')
  await location.click();
  await page.waitForTimeout(500);
  await location.type('Paschim',{delay:100})
  await page.waitForTimeout(500);
  await page.keyboard.press('ArrowDown');
  await page.keyboard.press('Enter');
 
  const datepicker = page.locator('//input[@name="dateOfBirth"]')
  await page.waitForSelector('//input[@name="dateOfBirth"]', { timeout: 120000 });
  await datepicker.type('01-02-2009',{delay:50})
  await expect(datepicker).toBeVisible();
  await page.locator('//input[@placeholder="Phone number"]').type(String(7986543212))
  await page.waitForTimeout(400);
 

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
  
  await page.locator('//*[@id="__next"]/div[1]/div[2]/div[4]/div/div[1]/div/div[1]/div[1]/div[2]/label[8]/span').click()
  await page.waitForTimeout(200);
  await page.keyboard.press('Escape');

  await page.locator('//*[@id="__next"]/div[1]/div[2]/div[4]/div/div[2]/div[1]/textarea').fill('A doctor (physician) is a trained medical professional responsible for promoting, maintaining, or restoring human health through the diagnosis and treatment of injury, disease, and mental conditions. They work in hospitals, clinics, and private practices to examine patients, prescribe medication, order tests, and provide preventative care, requiring extensive education and licensure.')
  await page.locator('//*[@id="__next"]/div[1]/div[2]/div[4]/div/div[2]/div[1]/div/div[1]/div/div[2]/div[1]').click()

  const specilizations = [
    '//*[@id="__next"]/div[1]/div[2]/div[4]/div/div[2]/div[1]/div/div[1]/div/div[3]/div[3]/label[1]/input',
    '//*[@id="__next"]/div[1]/div[2]/div[4]/div/div[2]/div[1]/div/div[1]/div/div[3]/div[3]/label[2]/input',
    '//*[@id="__next"]/div[1]/div[2]/div[4]/div/div[2]/div[1]/div/div[1]/div/div[3]/div[3]/label[3]/input',
    '//*[@id="__next"]/div[1]/div[2]/div[4]/div/div[2]/div[1]/div/div[1]/div/div[3]/div[3]/label[4]/input'
  ];
  

  for(const locator of specilizations){
      await page.locator(locator).check({delay:50})
      await page.waitForTimeout(200);
  }
  for(const locator of specilizations){
    await expect(page.locator(locator)).toBeChecked();
  }
  await page.keyboard.press('Escape');

  await page.locator('//*[@id="__next"]/div[1]/div[2]/div[4]/div/div[2]/div[1]/div/div[2]/div/div[2]/div[1]').click()
  await page.waitForTimeout(300);
  await page.locator('//*[@id="__next"]/div[1]/div[2]/div[4]/div/div[2]/div[1]/div/div[2]/div/div[3]/div[2]/div[6]').click()
  await page.keyboard.press('Escape');

  await page.locator('//*[@id="__next"]/div[1]/div[2]/div[4]/div/div[2]/div[1]/div/div[3]/div/div[2]/div[1]').click()
  await page.locator('//*[@id="__next"]/div[1]/div[2]/div[4]/div/div[2]/div[1]/div/div[3]/div/div[3]/div[2]/label/input').check()
  await page.keyboard.press('Escape');

  await page.locator('//*[@id="__next"]/div[1]/div[2]/div[4]/div/div[2]/div[1]/div/div[4]/div/div[2]/div[1]').click()
  await page.locator('//*[@id="__next"]/div[1]/div[2]/div[4]/div/div[2]/div[1]/div/div[4]/div/div[3]/div[2]/label/input').check()

  
  await page.locator('//*[@id="__next"]/div[1]/div[2]/div[4]/div/div[2]/div[3]/div/div/div/div/div[2]/div[1]').click()
  await page.waitForTimeout(300);
  await page.locator('//*[@id="__next"]/div[1]/div[2]/div[4]/div/div[2]/div[3]/div/div/div/div/div[3]/div[2]/div').click()
  await page.waitForTimeout(300);
  await page.locator('//*[@id="__next"]/div[1]/div[2]/div[4]/div/div[2]/div[3]/div/div/button').click()
  await page.locator('//*[@id="__next"]/div[1]/div[2]/div[5]/button[2]').click()



                                                                              //Profile Picture

  await page.locator('//*[@id="__next"]/div[1]/div[2]/div[4]/div[1]/div/div[2]/label/dihttps://www.youtube.com/watch?v=yOuElUSfAs8&list=PLUDwpEzHYYLsw33jpra65LIvX1nKWpp7-&index=2v').setInputFiles('/home/karthik/Desktop/doctor.jpg');
  await page.waitForTimeout(500);
  await page.locator('//*[@id="__next"]/div[1]/div[2]/div[4]/div[2]/button').click();
  await page.waitForTimeout(700);
  await page.locator('//*[@id="__next"]/div[1]/div[2]/div[5]/button[2]').click();
  await page.waitForTimeout(400);
  await page.locator('//*[@id="__next"]/div[1]/div[1]/div[1]/div[4]/div[5]/h2').click()



                                                                              //Availability

  await waitAndClick('//*[@id="__next"]/div[1]/div[2]/div[4]/div/div/div/div/div/div[2]/div[2]/button');
  await waitAndClick('//*[@id="__next"]/div[1]/div[2]/div[4]/div/div/div/div[2]/div[2]/div[2]/div[2]/div[1]/button');
  await waitAndClick('//*[@id="__next"]/div[1]/div[2]/div[4]/div/div/div/div[2]/div[2]/div[2]/div[3]/button[1]');


  await waitAndClick('//*[@id="__next"]/div[1]/div[1]/div[1]/div[4]/div[6]/h2')
  await page.waitForTimeout(400);
  await waitAndClick('//*[@id="__next"]/div[1]/div[2]/div[5]/button[2]')
  await page.waitForLoadState('networkidle');
  await expect(page).toHaveURL('https://provider.mantracare.com/profile-submitted')
});