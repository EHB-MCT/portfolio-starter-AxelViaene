const {checkUserName} = require("../../helpers/endpointHelpers.js")

test("check name", () => {

  expect(checkUserName("")).toBe(false)
  expect(checkUserName(null)).toBe(false)
  expect(checkUserName("i")).toBe(false)
  expect(checkUserName(2)).toBe(false)
  expect(checkUserName("lefhslhfnlskflskflksflksfsbflsebfmsfmsf")).toBe(false)

  expect(checkUserName("Jan")).toBe(true)
  expect(checkUserName("Anne Sophie")).toBe(true)
})