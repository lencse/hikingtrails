import { distanceInCentimeters } from '../../map/paths'

describe('Path', () => {

    it('Distance in centimeters', async () => {
        const d = distanceInCentimeters(
            { lat: 47.49801, lon: 19.03991 }, // Budapest
            { lat: 47.53333, lon: 21.63333 } // Debrecen
        )
        expect(d).toEqual(195_369_75)
    })

})
