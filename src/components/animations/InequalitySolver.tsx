import { useState } from 'react'
import { Mafs, Coordinates, Plot, Point, Line } from 'mafs'
import 'mafs/core.css'

export default function InequalitySolver() {
    const [a, setA] = useState(1)
    const [b, setB] = useState(-5)
    const [c, setC] = useState(6)
    const [inequalityType, setInequalityType] = useState<'>' | '>=' | '<' | '<='>('>')

    // Parabola: ax² + bx + c
    const f = (x: number) => a * x * x + b * x + c

    // Köklər
    const discriminant = b * b - 4 * a * c
    let roots: number[] = []

    if (discriminant > 0) {
        const x1 = (-b + Math.sqrt(discriminant)) / (2 * a)
        const x2 = (-b - Math.sqrt(discriminant)) / (2 * a)
        roots = [Math.min(x1, x2), Math.max(x1, x2)]
    } else if (discriminant === 0) {
        roots = [-b / (2 * a)]
    }

    // Həll intervallarını hesabla
    const getSolution = () => {
        if (a === 0) return 'a ≠ 0 olmalıdır'

        const isPositive = (inequalityType === '>' || inequalityType === '>=')
        const includeEquals = (inequalityType === '>=' || inequalityType === '<=')

        if (discriminant < 0) {
            // Kök yoxdur
            if ((a > 0 && isPositive) || (a < 0 && !isPositive)) {
                return 'x ∈ ℝ (bütün həqiqi ədədlər)'
            } else {
                return 'Həll yoxdur (∅)'
            }
        }

        if (discriminant === 0) {
            const x0 = roots[0].toFixed(2)
            if (includeEquals) {
                if ((a > 0 && isPositive) || (a < 0 && !isPositive)) {
                    return `x ∈ ℝ`
                } else {
                    return `x = ${x0}`
                }
            } else {
                if ((a > 0 && isPositive) || (a < 0 && !isPositive)) {
                    return `x ∈ ℝ \\ {${x0}}`
                } else {
                    return 'Həll yoxdur (∅)'
                }
            }
        }

        // İki kök var
        const [x1, x2] = roots.map(r => r.toFixed(2))
        const bracket1 = includeEquals ? '[' : '('
        const bracket2 = includeEquals ? ']' : ')'

        if (a > 0) {
            // Parabola yuxarı açılır
            if (isPositive) {
                return `x ∈ (-∞, ${x1}${bracket2} ∪ ${bracket1}${x2}, +∞)`
            } else {
                return `x ∈ ${bracket1}${x1}, ${x2}${bracket2}`
            }
        } else {
            // Parabola aşağı açılır
            if (isPositive) {
                return `x ∈ ${bracket1}${x1}, ${x2}${bracket2}`
            } else {
                return `x ∈ (-∞, ${x1}${bracket2} ∪ ${bracket1}${x2}, +∞)`
            }
        }
    }

    const handleReset = () => {
        setA(1); setB(-5); setC(6)
        setInequalityType('>')
    }

    return (
        <div className="w-full flex flex-col lg:flex-row gap-6">
            {/* Qrafik */}
            <div className="flex-1 bg-white rounded-lg p-4 shadow-sm">
                <h3 className="text-lg font-semibold mb-4">Kvadrat Bərabərsizlik</h3>
                <div className="w-full aspect-square">
                    <Mafs viewBox={{ x: [-8, 8], y: [-8, 8] }}>
                        <Coordinates.Cartesian subdivisions={2} />

                        {/* X oxu - həll sahəsi */}
                        {a !== 0 && roots.length === 2 && (
                            <>
                                {/* Həll sahəsini vurğula */}
                                {(inequalityType === '<' || inequalityType === '<=') !== (a < 0) ? (
                                    // Aradakı interval
                                    <Line.Segment
                                        point1={[roots[0], 0]}
                                        point2={[roots[1], 0]}
                                        color="#22c55e"
                                        weight={6}
                                    />
                                ) : (
                                    // Kənar intervallar
                                    <>
                                        <Line.Segment point1={[-8, 0]} point2={[roots[0], 0]} color="#22c55e" weight={6} />
                                        <Line.Segment point1={[roots[1], 0]} point2={[8, 0]} color="#22c55e" weight={6} />
                                    </>
                                )}
                            </>
                        )}

                        {/* Parabola */}
                        {a !== 0 && (
                            <Plot.OfX y={f} color="#3b82f6" weight={3} />
                        )}

                        {/* Köklər */}
                        {roots.map((root, i) => (
                            <Point key={i} x={root} y={0} color="#ef4444" />
                        ))}

                        {/* X oxu */}
                        <Line.Segment point1={[-10, 0]} point2={[10, 0]} color="#666" weight={1} />
                    </Mafs>
                </div>
            </div>

            {/* Parametrlər */}
            <div className="w-full lg:w-96 space-y-4">
                {/* Bərabərsizlik növü */}
                <div className="bg-white rounded-lg p-4 shadow-sm">
                    <h4 className="font-semibold mb-3">Bərabərsizlik Növü</h4>
                    <div className="grid grid-cols-4 gap-2">
                        {(['>', '>=', '<', '<='] as const).map(type => (
                            <button
                                key={type}
                                onClick={() => setInequalityType(type)}
                                className={`py-2 rounded font-medium transition ${inequalityType === type ? 'bg-blue-500 text-white' : 'bg-gray-100 hover:bg-gray-200'
                                    }`}
                            >
                                {type === '>=' ? '≥' : type === '<=' ? '≤' : type} 0
                            </button>
                        ))}
                    </div>
                </div>

                {/* Əmsallar */}
                <div className="bg-gradient-to-br from-blue-50 to-purple-50 rounded-lg p-4 space-y-3">
                    <h4 className="font-semibold">Əmsallar</h4>

                    <div>
                        <label className="text-sm">a = {a}</label>
                        <input type="range" min={-5} max={5} step={0.5} value={a}
                            onChange={e => setA(Number(e.target.value))}
                            className="w-full" />
                    </div>

                    <div>
                        <label className="text-sm">b = {b}</label>
                        <input type="range" min={-10} max={10} value={b}
                            onChange={e => setB(Number(e.target.value))}
                            className="w-full" />
                    </div>

                    <div>
                        <label className="text-sm">c = {c}</label>
                        <input type="range" min={-10} max={10} value={c}
                            onChange={e => setC(Number(e.target.value))}
                            className="w-full" />
                    </div>

                    <p className="font-mono text-center p-2 bg-white rounded">
                        {a}x² {b >= 0 ? '+' : ''}{b}x {c >= 0 ? '+' : ''}{c} {inequalityType === '>=' ? '≥' : inequalityType === '<=' ? '≤' : inequalityType} 0
                    </p>
                </div>

                {/* Hesablamalar */}
                <div className="bg-white rounded-lg p-4 shadow-sm space-y-2">
                    <h4 className="font-semibold">Hesablamalar</h4>
                    <p className="text-sm">
                        <strong>Diskriminant:</strong> D = {discriminant.toFixed(2)}
                    </p>
                    <p className="text-sm">
                        <strong>Köklərin sayı:</strong> {discriminant > 0 ? 2 : discriminant === 0 ? 1 : 0}
                    </p>
                    {roots.length > 0 && (
                        <p className="text-sm">
                            <strong>Köklər:</strong> {roots.map(r => r.toFixed(2)).join(', ')}
                        </p>
                    )}
                </div>

                {/* Həll */}
                <div className="bg-green-50 rounded-lg p-4">
                    <h4 className="font-semibold mb-2">Həll</h4>
                    <p className="font-mono text-green-700">{getSolution()}</p>
                </div>

                <button onClick={handleReset}
                    className="w-full py-2 bg-gray-200 hover:bg-gray-300 rounded-lg font-medium transition">
                    Sıfırla
                </button>
            </div>
        </div>
    )
}
