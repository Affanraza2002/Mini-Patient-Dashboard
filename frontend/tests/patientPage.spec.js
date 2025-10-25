import { test, expect } from "@playwright/test"

test.describe("Patient Page", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("http://localhost:5173")
  })

  test("should display loading state initially", async ({ page }) => {
    const loadingText = page.locator("text=Loading patients")
    await expect(loadingText).toBeVisible({ timeout: 5000 })
  })

  test("should render patient table with rows when data loads", async ({ page }) => {
    const table = page.locator("table")
    await expect(table).toBeVisible({ timeout: 10000 })

    // Updated header count from 4 → 5
    const headers = page.locator("thead th")
    await expect(headers).toHaveCount(5)

    const rows = table.locator("tbody tr")
    const rowCount = await rows.count()
    expect(rowCount).toBeGreaterThanOrEqual(2)
  })

  test("should display patient data correctly", async ({ page }) => {
    const table = page.locator("table")
    await expect(table).toBeVisible({ timeout: 10000 })

    const firstRow = table.locator("tbody tr").first()
    const cells = firstRow.locator("td")

    const id = await cells.nth(0).textContent()
    const name = await cells.nth(1).textContent()
    const age = await cells.nth(2).textContent()
    const status = await cells.nth(3).textContent()

    expect(id).toBeTruthy()
    expect(name).toBeTruthy()
    expect(age).toBeTruthy()
    expect(["Stable", "Critical", "Recovering"]).toContain(status)
  })

  test("should highlight critical status in red", async ({ page }) => {
    const table = page.locator("table")
    await expect(table).toBeVisible({ timeout: 10000 })

    const criticalStatus = page.locator("text=Critical").first()
    if (await criticalStatus.isVisible()) {
      const color = await criticalStatus.evaluate(el => window.getComputedStyle(el).color)
      const redValue = parseInt(color.match(/\d+/)[0])
      expect(redValue).toBeGreaterThan(200)
    }
  })

  test("should refresh data when refresh button is clicked", async ({ page }) => {
    const table = page.locator("table")
    await expect(table).toBeVisible({ timeout: 10000 })

    // Intercept the API request triggered by the refresh button
    const [response] = await Promise.all([
      page.waitForResponse(resp => resp.url().includes("/patients") && resp.status() === 200),
      page.locator('button:has-text("Refresh")').click(),
    ])

    // Confirm API returned data
    const data = await response.json()
    expect(data.length).toBeGreaterThan(0)

    // Ensure table is still visible after refresh
    await expect(table).toBeVisible()
  })
})
