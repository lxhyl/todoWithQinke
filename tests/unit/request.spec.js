
import { createAccount } from "../../src/api/account"
import sha1 from "sha1"
describe('测试api', () => {
  it('测试注册账号',async () => {
     const mockData = {
       account:'qwer',
       sha1:sha1(`qwer-1111`)
     }
     const res = await createAccount(mockData)
     
     expect(res.code).toBe(200)
  })
})
