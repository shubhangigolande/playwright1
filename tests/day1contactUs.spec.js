const {test,expect}=require('@playwright/test')
test("verify the login functionality with valid credentials",async({page})=>{
    // step 1:
    // navigate the url
    await page.goto("https://opensource-demo.orangehrmlive.com/web/index.php/auth/login")

    // step 2 enter user name
    await page.locator('input[name="username"]').fill('Admin')

    // step 3 enetr password
    await page.locator('input[name="password"]').fill("admin123")

    // click login button

    await page.locator('button[type="submit"]').click()
    
    //validation
    await expect (page.locator('span[class="oxd-text oxd-text--span oxd-main-menu-item--name"]').first()).toBeVisible()
    await expect(page.locator('img[alt="client brand banner"]')).toBeVisible()
    await expect(page.locator('.oxd-topbar-header-breadcrumb-module')).toHaveText('Dashboard')
    await expect(page).toHaveTitle('OrangeHRM')
    await expect(page).toHaveURL('https://opensource-demo.orangehrmlive.com/web/index.php/dashboard/index')
    
})

test.only('Verify the login functionality with invalid credentials',async({page})=>{
    await page.goto('https://opensource-demo.orangehrmlive.com/web/index.php/auth/login')
    await page.locator('input[name="username"]').fill('Admin')
    await page.locator('input[name="password"]').fill('admin1234')
    await page.locator('button[type="submit"]').click()
    await expect(page.locator('.oxd-alert-content-text')).toBeVisible()
    await expect(page.locator('.oxd-alert-content-text')).toHaveText('Invalid credentials')
})    