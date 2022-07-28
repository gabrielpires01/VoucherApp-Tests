import {jest} from '@jest/globals';
import voucherRepository from '../../src/repositories/voucherRepository';
import voucherService from '../../src/services/voucherService';

const test = {
  id: 1,
  code: "teste",
  discount: 80,
  used: false
}

describe("Create Voucher", () => {
  it("should not create voucher", async () => {
    jest.spyOn(voucherRepository, "getVoucherByCode")
      .mockResolvedValueOnce(test)

    await voucherService.createVoucher("", 0)
      .catch(err => expect(err.type).toBe("conflict"))
  })

  it("should create voucher mock", async () => {
    jest.spyOn(voucherRepository, "getVoucherByCode")
      .mockResolvedValueOnce(undefined)
    jest.spyOn(voucherRepository, "createVoucher")
      .mockResolvedValueOnce(undefined)

    await voucherService.createVoucher("", 0)

    expect(voucherRepository.createVoucher).toHaveBeenCalled()
  })
})

describe("Aplly Voucher", () => {
  it("should not aplly voucher", async () => {
    jest.spyOn(voucherRepository, "getVoucherByCode")
      .mockResolvedValueOnce(undefined)

    await voucherService.applyVoucher("", 0)
      .catch(err => expect(err.type).toBe("conflict"))
  })

  it("should aplly discount", async () => {
    jest.spyOn(voucherRepository, "getVoucherByCode")
      .mockResolvedValueOnce(test)
    jest.spyOn(voucherRepository, "useVoucher")
      .mockResolvedValueOnce(undefined)

    const result = await voucherService.applyVoucher("", 100)

    expect(result).toStrictEqual({
      amount: 100,
      discount: 80,
      finalAmount: 20,
      applied: true
    })
  })

  it("should not aplly discount", async () => {
    jest.spyOn(voucherRepository, "getVoucherByCode")
      .mockResolvedValueOnce(test)
    jest.spyOn(voucherRepository, "useVoucher")
      .mockResolvedValueOnce(undefined)

    const result = await voucherService.applyVoucher("", 99)
    
    expect(result).toStrictEqual({
      amount: 99,
      discount: 80,
      finalAmount: 99,
      applied: false
    })
  })
})