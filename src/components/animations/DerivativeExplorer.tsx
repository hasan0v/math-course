import { useState } from 'react'
import { Mafs, Coordinates, Plot, Point, Line } from 'mafs'
import 'mafs/core.css'

export default function DerivativeExplorer() {
    const [functionType, setFunctionType] = useState<'quadratic' | 'cubic' | 'sine'>('quadratic')
    const [xValue, setXValue] = useState(1)

    // Funksiyalar
    const functions = {
        quadratic: {
            f: (x: number) => x * x,
            fPrime: (x: number) => 2 * x,
            label: 'f(x) = x²',
            derivativeLabel: "f'(x) = 2x"
        },
        cubic: {
            f: (x: number) => x * x * x - 3 * x,
            fPrime: (x: number) => 3 * x * x - 3,
            label: 'f(x) = x³ - 3x',
            derivativeLabel: "f'(x) = 3x² - 3"
        },
        sine: {
            f: (x: number) => Math.sin(x) * 2,
            fPrime: (x: number) => Math.cos(x) * 2,
            label: 'f(x) = 2sin(x)',
            derivativeLabel: "f'(x) = 2cos(x)"
        }
    }

    const currentFunc = functions[functionType]
    const yValue = currentFunc.f(xValue)
    const slope = currentFunc.fPrime(xValue)

    // Toxunan xətt üçün nöqtələr
    const tangentPoint1: [number, number] = [xValue - 2, yValue - 2 * slope]
    const tangentPoint2: [number, number] = [xValue + 2, yValue + 2 * slope]

    // Artma/azalma statusu
    const status = slope > 0 ? 'Artan ↑' : slope < 0 ? 'Azalan ↓' : 'Stasionar —'
    const statusColor = slope > 0 ? 'text-green-600' : slope < 0 ? 'text-red-600' : 'text-gray-600'

    const handleReset = () => {
        setFunctionType('quadratic')
        setXValue(1)
    }

    return (
        <div className="w-full flex flex-col lg:flex-row gap-6">
            {/* Qrafik */}
            <div className="flex-1 bg-white rounded-lg p-4 shadow-sm">
                <h3 className="text-lg font-semibold mb-4">Törəmə və Toxunan Xətt</h3>
                <div className="w-full aspect-square">
                    <Mafs viewBox={{ x: [-6, 6], y: [-6, 6] }}>
                        <Coordinates.Cartesian subdivisions={2} />

                        {/* Funksiya - mavi */}
                        <Plot.OfX y={currentFunc.f} color="#3b82f6" weight={3} />

                        {/* Törəmə - qırmızı, kesik */}
                        <Plot.OfX y={currentFunc.fPrime} color="#ef4444" weight={2} opacity={0.7} />

                        {/* Toxunan xətt - yaşıl */}
                        <Line.Segment point1={tangentPoint1} point2={tangentPoint2} color="#22c55e" weight={2} />

                        {/* Seçilmiş nöqtə */}
                        <Point x={xValue} y={yValue} color="#8b5cf6" />

                        {/* Törəmə nöqtəsi */}
                        <Point x={xValue} y={slope} color="#ef4444" />
                    </Mafs>
                </div>

                {/* Legend */}
                <div className="flex flex-wrap gap-4 mt-4 text-sm">
                    <span className="flex items-center gap-1">
                        <span className="w-4 h-1 bg-blue-500 rounded"></span> {currentFunc.label}
                    </span>
                    <span className="flex items-center gap-1">
                        <span className="w-4 h-1 bg-red-500 rounded"></span> {currentFunc.derivativeLabel}
                    </span>
                    <span className="flex items-center gap-1">
                        <span className="w-4 h-1 bg-green-500 rounded"></span> Toxunan xətt
                    </span>
                </div>
            </div>

            {/* Parametrlər */}
            <div className="w-full lg:w-96 space-y-4">
                {/* Funksiya seçimi */}
                <div className="bg-white rounded-lg p-4 shadow-sm">
                    <h4 className="font-semibold mb-3">Funksiya Seçin</h4>
                    <div className="grid grid-cols-3 gap-2">
                        <button
                            onClick={() => setFunctionType('quadratic')}
                            className={`py-2 rounded font-medium text-sm transition ${functionType === 'quadratic' ? 'bg-blue-500 text-white' : 'bg-gray-100 hover:bg-gray-200'
                                }`}
                        >
                            x²
                        </button>
                        <button
                            onClick={() => setFunctionType('cubic')}
                            className={`py-2 rounded font-medium text-sm transition ${functionType === 'cubic' ? 'bg-blue-500 text-white' : 'bg-gray-100 hover:bg-gray-200'
                                }`}
                        >
                            x³ - 3x
                        </button>
                        <button
                            onClick={() => setFunctionType('sine')}
                            className={`py-2 rounded font-medium text-sm transition ${functionType === 'sine' ? 'bg-blue-500 text-white' : 'bg-gray-100 hover:bg-gray-200'
                                }`}
                        >
                            sin(x)
                        </button>
                    </div>
                </div>

                {/* X dəyəri */}
                <div className="bg-white rounded-lg p-4 shadow-sm">
                    <label className="font-semibold">X dəyəri: {xValue.toFixed(2)}</label>
                    <input
                        type="range"
                        min={-5}
                        max={5}
                        step={0.1}
                        value={xValue}
                        onChange={e => setXValue(Number(e.target.value))}
                        className="w-full mt-2"
                    />
                </div>

                {/* Hesablamalar */}
                <div className="bg-gradient-to-br from-blue-50 to-purple-50 rounded-lg p-4 space-y-3">
                    <h4 className="font-semibold">Hesablamalar</h4>

                    <div className="bg-white rounded p-3 space-y-2">
                        <p className="text-sm">
                            <strong>x =</strong> {xValue.toFixed(2)}
                        </p>
                        <p className="text-sm">
                            <strong className="text-blue-600">f(x) =</strong> {yValue.toFixed(3)}
                        </p>
                        <p className="text-sm">
                            <strong className="text-red-600">f'(x) =</strong> {slope.toFixed(3)}
                        </p>
                    </div>

                    <div className="bg-white rounded p-3">
                        <p className="text-sm">
                            <strong>Toxunanın meyli:</strong> {slope.toFixed(3)}
                        </p>
                        <p className={`text-sm font-semibold ${statusColor}`}>
                            <strong>Status:</strong> {status}
                        </p>
                    </div>
                </div>

                {/* Ekstremum axtarışı */}
                <div className="bg-amber-50 rounded-lg p-4">
                    <h4 className="font-semibold mb-2">Ekstremum Nöqtələr</h4>
                    <p className="text-sm text-gray-700">
                        f'(x) = 0 olduqda mümkün ekstremum!
                    </p>
                    {Math.abs(slope) < 0.1 && (
                        <p className="text-sm font-semibold text-amber-700 mt-2">
                            ⚠️ Bu nöqtədə törəmə ≈ 0 (mümkün ekstremum)
                        </p>
                    )}
                </div>

                <button onClick={handleReset}
                    className="w-full py-2 bg-gray-200 hover:bg-gray-300 rounded-lg font-medium transition">
                    Sıfırla
                </button>
            </div>
        </div>
    )
}
