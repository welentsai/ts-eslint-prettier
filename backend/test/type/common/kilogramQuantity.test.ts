import { describe, it, expect } from "vitest";
import { KilogramQuantity } from "../../../src/type/common/kilogramQuantity";


describe('test KilogramQuantity schema', () => {
    it('Given 1.0, should return a validated kilogramquantity', () => {
        const result = KilogramQuantity.of(1.0)
        expect(result._tag).toBe('Right')
    })

    it('Given 0.04, should return a fail', () => {
        const result = KilogramQuantity.of(0.04)
        expect(result._tag).toBe('Left')
    })
    it('Given 100.01, should return a fail', () => {
        const result = KilogramQuantity.of(100.01)
        expect(result._tag).toBe('Left')
    })

})