import { describe, it, expect } from '@jest/globals'
import { MeterDistanceCalculator } from '@/lib/server/map/distance'

describe('MeterDistanceCalulator', () => {
    it('calculates distance between Debrecen and Budapest', () => {
        const calculator = new MeterDistanceCalculator()
        const result = calculator.getDistance(
            { lat: 47.49801, lon: 19.03991 },
            { lat: 47.53333, lon: 21.63333 }
        )
        expect(result).toBeCloseTo(195_369.752, 3)
    })
})
