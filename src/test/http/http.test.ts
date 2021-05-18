import { httpGet } from '../../http'

describe('HTTP', () => {

    it('HTTP GET', async () => {
        const html = await httpGet('https://github.com/Lencse')
        expect(html).toMatch(/Lencse/)
    })

})
