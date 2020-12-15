import { xml2json } from '../../xml'
import { sampleXml } from './xml-sample'

describe('XML', () => {

    it('Parse XML into JSON', async () => {
        const xml = sampleXml
        const result = await xml2json(xml)
        expect(result.gpx.$.xmlns).toBe('http://www.topografix.com/GPX/1/1')
        expect(result.gpx.wpt[10].name[0]).toBe('Badacsonytördemic')
    })

    it('XML errors', async () => {
        const xml = 'Invalid XML'
        try {
            await xml2json(xml)
            fail('Exception not thrown')
        } catch (e) {
            expect(e).toBeTruthy()
        }
    })

})
