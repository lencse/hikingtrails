import { parseXml } from '../../xml'
import { resolve } from 'path'
import { readFileSync } from 'fs'

describe('XML', () => {

    it('Parse XML into JSON', async () => {
        const xml = readFileSync(resolve(process.cwd(), 'src/test/xml/sample.xml')).toString()
        const result = await parseXml(xml)
        expect(result.gpx.$.xmlns).toBe('http://www.topografix.com/GPX/1/1')
        expect(result.gpx.wpt[10].name[0]).toBe('Badacsonytördemic')
    })

    it('XML errors', async () => {
        const xml = 'Invalid XML'
        try {
            await parseXml(xml)
            fail('Exception not thrown')
        } catch (e) {
            expect(e).toBeTruthy()
        }
    })

})
