import { useState } from 'react'
import { Mafs, Coordinates, Line, Point, Text } from 'mafs'
import 'mafs/core.css'

interface LinearSystemProps {
    config?: {
        gridRange?: number
    }
}

export default function LinearSystemSolver({ config = {} }: LinearSystemProps) {
    const { gridRange = 10 } = config

    // Tənlik 1: a₁x + b₁y = c₁
    const [a1, setA1] = useState(2)
    const [b1, setB1] = useState(1)
    const [c1, setC1] = useState(5)

    // Tənlik 2: a₂x + b₂y = c₂
    const [a2, setA2] = useState(1)
    const [b2, setB2] = useState(-1)
    const [c2, setC2] = useState(1)

    // Xətt üçün y = (c - ax) / b düsturu
    const getY1 = (x: number) => (b1 !== 0 ? (c1 - a1 * x) / b1 : 0)
    const getY2 = (x: number) => (b2 !== 0 ? (c2 - a2 * x) / b2 : 0)

    // Kəsişmə nöqtəsini tap (Cramer qaydası)
    const determinant = a1 * b2 - a2 * b1
    const hasUniqueSolution = Math.abs(determinant) > 0.001

    let intersectionX = 0
    let intersectionY = 0
    let solutionType = 'Tək həll'

    if (hasUniqueSolution) {
        intersectionX = (c1 * b2 - c2 * b1) / determinant
        intersectionY = (a1 * c2 - a2 * c1) / determinant
    } else {
        // Paralel və ya eyni xətt
        const ratio1 = b1 !== 0 ? c1 / b1 : 0
        const ratio2 = b2 !== 0 ? c2 / b2 : 0
        if (Math.abs(ratio1 - ratio2) < 0.001) {
            solutionType = 'Sonsuz həll (eyni xətt)'
        } else {
            solutionType = 'Həll yoxdur (paralel)'
        }
    }

    const handleReset = () => {
        setA1(2); setB1(1); setC1(5)
        setA2(1); setB2(-1); setC2(1)
    }

    return (
        <div className="w-full flex flex-col lg:flex-row gap-6">
            {/* Qrafik */}
            <div className="flex-1 bg-white rounded-lg p-4 shadow-sm">
                <h3 className="text-lg font-semibold mb-4">Xətti Tənliklər Sistemi</h3>
                <div className="w-full aspect-square">
                    <Mafs viewBox={{ x: [-gridRange, gridRange], y: [-gridRange, gridRange] }}>
                        <Coordinates.Cartesian subdivisions={2} />

                        {/* Xətt 1 - Mavi */}
                        {b1 !== 0 && (
                            <Line.ThroughPoints
                                point1={[-gridRange, getY1(-gridRange)]}
                                point2={[gridRange, getY1(gridRange)]}
                                color="#3b82f6"
                                weight={3}
                            />
                        )}

                        {/* Xətt 2 - Qırmızı */}
                        {b2 !== 0 && (
                            <Line.ThroughPoints
                                point1={[-gridRange, getY2(-gridRange)]}
                                point2={[gridRange, getY2(gridRange)]}
                                color="#ef4444"
                                weight={3}
                            />
                        )}

                        {/* Kəsişmə nöqtəsi */}
                        {hasUniqueSolution && (
                            <>
                                <Point x={intersectionX} y={intersectionY} color="#22c55e" />
                                <Text x={intersectionX + 0.5} y={intersectionY + 0.5}>
                                    ({intersectionX.toFixed(2)}, {intersectionY.toFixed(2)})
                                </Text>
                            </>
                        )}
                    </Mafs>
                </div>
            </div>

            {/* Parametrlər */}
            <div className="w-full lg:w-96 space-y-4">
                {/* Tənlik 1 */}
                <div className="bg-blue-50 rounded-lg p-4">
                    <h4 className="font-semibold text-blue-700 mb-3">Tənlik 1 (Mavi xətt)</h4>
                    <div className="grid grid-cols-3 gap-2">
                        <div>
                            <label className="text-xs text-gray-600">a₁</label>
                            <input type="number" value={a1} onChange={e => setA1(Number(e.target.value))}
                                className="w-full px-2 py-1 border rounded text-center" />
                        </div>
                        <div>
                            <label className="text-xs text-gray-600">b₁</label>
                            <input type="number" value={b1} onChange={e => setB1(Number(e.target.value))}
                                className="w-full px-2 py-1 border rounded text-center" />
                        </div>
                        <div>
                            <label className="text-xs text-gray-600">c₁</label>
                            <input type="number" value={c1} onChange={e => setC1(Number(e.target.value))}
                                className="w-full px-2 py-1 border rounded text-center" />
                        </div>
                    </div>
                    <p className="text-sm mt-2 font-mono">{a1}x + {b1}y = {c1}</p>
                </div>

                {/* Tənlik 2 */}
                <div className="bg-red-50 rounded-lg p-4">
                    <h4 className="font-semibold text-red-700 mb-3">Tənlik 2 (Qırmızı xətt)</h4>
                    <div className="grid grid-cols-3 gap-2">
                        <div>
                            <label className="text-xs text-gray-600">a₂</label>
                            <input type="number" value={a2} onChange={e => setA2(Number(e.target.value))}
                                className="w-full px-2 py-1 border rounded text-center" />
                        </div>
                        <div>
                            <label className="text-xs text-gray-600">b₂</label>
                            <input type="number" value={b2} onChange={e => setB2(Number(e.target.value))}
                                className="w-full px-2 py-1 border rounded text-center" />
                        </div>
                        <div>
                            <label className="text-xs text-gray-600">c₂</label>
                            <input type="number" value={c2} onChange={e => setC2(Number(e.target.value))}
                                className="w-full px-2 py-1 border rounded text-center" />
                        </div>
                    </div>
                    <p className="text-sm mt-2 font-mono">{a2}x + {b2}y = {c2}</p>
                </div>

                {/* Nəticə */}
                <div className={`rounded-lg p-4 ${hasUniqueSolution ? 'bg-green-50' : 'bg-yellow-50'}`}>
                    <h4 className="font-semibold mb-2">Nəticə</h4>
                    <p className="text-sm font-medium">{solutionType}</p>
                    {hasUniqueSolution && (
                        <div className="mt-2 text-sm">
                            <p><strong>x = </strong>{intersectionX.toFixed(3)}</p>
                            <p><strong>y = </strong>{intersectionY.toFixed(3)}</p>
                        </div>
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
