import { parseXml } from '../../xml'
import { fileContent } from '../../files'
import { pointsFromGpx } from '../../xml/gpx'

describe('XML', () => {

    it('Parse XML', async () => {
        const xml = await fileContent('src/test/xml/sample.xml')
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

describe('GPX', () => {

    it('Parse XML', async () => {
        const gpx = await fileContent('src/test/xml/sample.gpx')
        const result = await pointsFromGpx(gpx)
        expect(result.length).toEqual(409)
        expect(result[2].lat).toBeCloseTo(47.76365)
        expect(result[2].lon).toBeCloseTo(18.912189)
        expect(result[2].elevation).toBeCloseTo(109.8)
    })

})

