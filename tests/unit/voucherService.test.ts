import {jest} from '@jest/globals';
import voucherRepository from '../../src/repositories/voucherRepository';
import voucherService from '../../src/services/voucherService';

const test = {
  id: 1,
  code: "teste",
  discount: 0.8,
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