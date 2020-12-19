import { parseXml } from '../../xml'
import { fileContent } from '../../files'

describe('XML', () => {

    it('Parse XML', async () => {
        const xml = fileContent('src/test/xml/sample.xml')
        const result = await parseXml(xml)
        expect(result.gpx.$.xmlns).toBe('http://www.topografix.com/GPX/1/1')
        expect(result.gpx.wpt[10].name[0]).toBe('Badacsonytördemic')
    })

    it('XML errors', async () => {
        const xml = '<xml>Invalid XML'
        try {
            await parseXml(xml)
            fail('Exception not thrown')
        } catch (e) {
            expect(e).toBeDefined()
        }
    })

})
