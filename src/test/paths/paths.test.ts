import { distanceInMeters, pathData } from '../../map/path'

describe('Path', () => {

    it('Distance in meters', () => {
        const distance = distanceInMeters(
            { lat: 47.49801, lon: 19.03991 },
            { lat: 47.53333, lon: 21.63333 }
        )
        expect(distance).toBeCloseTo(195_369.752, 3)
    })

    it('Path data', () => {
        const data = pathData([
            { lat: 47.596150, lon: 18.870969, elevation: 415.75 },
            { lat: 47.595904, lon: 18.870993, elevation: 420 },
            { lat: 47.595592, lon: 18.871230, elevation: 424.2 },
            { lat: 47.595491, lon: 18.871458, elevation: 428.4 },
            { lat: 47.595413, lon: 18.871516, elevation: 436.2 },
            { lat: 47.595244, lon: 18.871507, elevation: 444.2 },
            { lat: 47.594784, lon: 18.871254, elevation: 450.8 },
            { lat: 47.594191, lon: 18.871411, elevation: 461.2 },
            { lat: 47.594049, lon: 18.871382, elevation: 471.6 },
            { lat: 47.593643, lon: 18.871653, elevation: 478.4 },
            { lat: 47.592908, lon: 18.871867, elevation: 488 },
            { lat: 47.592391, lon: 18.872228, elevation: 495.8 },
            { lat: 47.592150, lon: 18.872290, elevation: 499.8 },
            { lat: 47.591348, lon: 18.872765, elevation: 503.8 },
            { lat: 47.591747, lon: 18.872996, elevation: 507.8 },
            { lat: 47.591751, lon: 18.873096, elevation: 509 },
            { lat: 47.591731, lon: 18.873524, elevation: 510.4 },
            { lat: 47.591787, lon: 18.873636, elevation: 513 },
            { lat: 47.591699, lon: 18.873700, elevation: 516.8 },
            { lat: 47.591559, lon: 18.873774, elevation: 520.6 },
            { lat: 47.591099, lon: 18.873737, elevation: 524.4 },
            { lat: 47.590975, lon: 18.873790, elevation: 525.8 },
            { lat: 47.590719, lon: 18.874185, elevation: 526 },
            { lat: 47.590759, lon: 18.874335, elevation: 523.6 },
            { lat: 47.590186, lon: 18.874817, elevation: 517.6 },
            { lat: 47.589989, lon: 18.875052, elevation: 507.4 },
            { lat: 47.589701, lon: 18.875624, elevation: 495.8 },
            { lat: 47.588772, lon: 18.876814, elevation: 484 },
            { lat: 47.587922, lon: 18.878056, elevation: 473.6 },
            { lat: 47.587528, lon: 18.878523, elevation: 459.4 },
            { lat: 47.587215, lon: 18.879246, elevation: 449.4 },
            { lat: 47.587194, lon: 18.879497, elevation: 439.6 },
            { lat: 47.586555, lon: 18.880873, elevation: 430 },
            { lat: 47.586547, lon: 18.881155, elevation: 418.2 },
            { lat: 47.586516, lon: 18.881272, elevation: 413.8 },
            { lat: 47.586427, lon: 18.881475, elevation: 406.6 },
            { lat: 47.586117, lon: 18.881726, elevation: 401.6 },
            { lat: 47.585758, lon: 18.881847, elevation: 394.6 },
            { lat: 47.585077, lon: 18.882154, elevation: 389.8 },
            { lat: 47.584853, lon: 18.882240, elevation: 384.6 },
            { lat: 47.584540, lon: 18.882263, elevation: 379.8 },
            { lat: 47.584421, lon: 18.882404, elevation: 372.6 },
            { lat: 47.583798, lon: 18.883394, elevation: 365.6 },
            { lat: 47.583395, lon: 18.883980, elevation: 358.6 },
            { lat: 47.582880, lon: 18.884019, elevation: 351.4 },
            { lat: 47.581850, lon: 18.884066, elevation: 346.4 },
            { lat: 47.581311, lon: 18.884022, elevation: 343.6 },
            { lat: 47.580940, lon: 18.883980, elevation: 342.6 },
            { lat: 47.579997, lon: 18.883830, elevation: 341.6 },
            { lat: 47.579095, lon: 18.883758, elevation: 341.4 },
            { lat: 47.579005, lon: 18.883685, elevation: 340.8 },
            { lat: 47.578924, lon: 18.883812, elevation: 340.4 },
            { lat: 47.577869, lon: 18.883751, elevation: 340.6 },
            { lat: 47.577676, lon: 18.883738, elevation: 339.6 },
            { lat: 47.577180, lon: 18.883705, elevation: 337.8 },
            { lat: 47.577156, lon: 18.884622, elevation: 336.6 },
            { lat: 47.576653, lon: 18.884591, elevation: 336 },
            { lat: 47.575972, lon: 18.884551, elevation: 334 },
            { lat: 47.575981, lon: 18.884294, elevation: 333 },
        ])

        expect(data.elevationDiff.from).toBeCloseTo(110.45, 3)
        expect(data.elevationDiff.to).toBeCloseTo(193.2, 3)
        expect(data.length).toBeCloseTo(2908.266, 3)

    })



})

