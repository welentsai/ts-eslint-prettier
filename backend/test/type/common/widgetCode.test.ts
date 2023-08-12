import { expect, test, it } from 'vitest';
import { WidgetCode } from '../../../src/type/common/widgetCode';
import { describe } from 'node:test';

describe('test widget schema', () => {
    it('Give W1234, should return parse success', () => {
        const parseResult = WidgetCode.of('W1234')
        expect(parseResult._tag).toBe('Right')
    })

    it('Give W1234, should return parse fail', () => {
        const parseResult = WidgetCode.of('W12345')
        expect(parseResult._tag).toBe('Left')
    })

    it('Give W123, should return parse fail', () => {
        const parseResult = WidgetCode.of('W123')
        console.log(parseResult)
        expect(parseResult._tag).toBe('Left')
    })

    it('Give S123, should return parse fail', () => {
        const parseResult = WidgetCode.of('S123')
        console.log(parseResult)
        expect(parseResult._tag).toBe('Left')
    })

});