import { expect, test, it } from 'vitest';
import { ProductCode } from '../../../src/type/common/productCode';
import { WidgetCode } from '../../../src/type/common/widgetCode';
import { describe } from 'node:test';


describe('test ProductCode schema', () => {
    it('Give W1234, should return parse success', () => {
        const result = ProductCode.of('W1234')
        expect(result._tag).toBe('Right')

    })

    it('Give G123, should return parse success', () => {
        const parseResult = ProductCode.of('G123')
        expect(parseResult._tag).toBe('Right')
    })


    it('Give W1234, should return parse fail', () => {
        const parseResult = ProductCode.of('W12345')
        expect(parseResult._tag).toBe('Left')
    })

    it('Give W123, should return parse fail', () => {
        const parseResult = WidgetCode.of('W123')
        expect(parseResult._tag).toBe('Left')
    })

    it('Give G1234, should return parse fail', () => {
        const parseResult = ProductCode.of('G1234')
        expect(parseResult._tag).toBe('Left')
    })

    it('Give S1234, should return parse fail', () => {
        const parseResult = ProductCode.of('S1234')
        expect(parseResult._tag).toBe('Left')
    })
});