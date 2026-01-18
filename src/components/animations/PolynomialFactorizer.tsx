import { useState } from 'react'
import { Mafs, Coordinates, Plot, Point } from 'mafs'
import 'mafs/core.css'

export default function PolynomialFactorizer() {
    // Coefficients for ax³ + bx² + cx + d
    const [a, setA] = useState(1)
    const [b, setB] = useState(2)
    const [c, setC] = useState(-5)
    const [d, setD] = useState(-6)

    // Polynomial function
    const f = (x: number) => a * x * x * x + b * x * x + c * x + d

    // Find roots using numerical method (Newton-Raphson for real roots)
    const findRoots = () => {
        const roots: number[] = []

        // Try possible rational roots: factors of d / factors of a
        const factorsD = getFactors(Math.abs(d) || 1)
        const factorsA = getFactors(Math.abs(a) || 1)

        const possibleRoots = new Set<number>()
        factorsD.forEach(fd => {
            factorsA.forEach(fa => {
                possibleRoots.add(fd / fa)
                possibleRoots.add(-fd / fa)
            })
        })

        // Test each possible root
        Array.from(possibleRoots).forEach(root => {
            if (Math.abs(f(root)) < 0.0001 && !roots.some(r => Math.abs(r - root) < 0.001)) {
                roots.push(root)
            }
        })

        return roots.sort((a, b) => a - b)
    }

    const getFactors = (n: number): number[] => {
        const factors: number[] = []
        for (let i = 1; i <= Math.sqrt(n); i++) {
            if (n % i === 0) {
                factors.push(i)
                if (i !== n / i) factors.push(n / i)
            }
        }
        return factors.sort((a, b) => a - b)
    }

    const roots = findRoots()

    // Generate factored form
    const getFactoredForm = () => {
        if (roots.length === 0) return 'Rasional kökü yoxdur'

        const factors = roots.map(r => {
            if (r === 0) return 'x'
            return r > 0 ? `(x - ${r})` : `(x + ${Math.abs(r)})`
        })

        const leadCoef = a !== 1 ? `${a}` : ''

        if (roots.length === 3) {
            return `${leadCoef}${factors.join('')}`
        } else if (roots.length === 2) {
            // Remaining quadratic factor
            return `${leadCoef}${factors.join('')}(ax + b)`
        } else {
            return `${leadCoef}${factors[0]}(ax² + bx + c)`
        }
    }

    // Horner scheme for a specific root
    const getHornerScheme = (root: number) => {
        const coeffs = [a, b, c, d]
        const results = [coeffs[0]]

        for (let i = 1; i < coeffs.length; i++) {
            results.push(results[i - 1] * root + coeffs[i])
        }

        return { coeffs, results, quotient: results.slice(0, -1) }
    }

    const handleReset = () => {
        setA(1); setB(2); setC(-5); setD(-6)
    }

    return (
        <div className="w-full flex flex-col lg:flex-row gap-6">
            {/* Qrafik */}
            <div className="flex-1 bg-white rounded-lg p-4 shadow-sm">
                <h3 className="text-lg font-semibold mb-4">Çoxhədlinin Qrafiki</h3>
                <div className="w-full aspect-square">
                    <Mafs viewBox={{ x: [-6, 6], y: [-15, 15] }}>
                        <Coordinates.Cartesian subdivisions={2} />

                        {/* Polynomial curve */}
                        <Plot.OfX y={f} color="#3b82f6" weight={3} />

                        {/* Roots on x-axis */}
                        {roots.map((root, i) => (
                            <Point key={i} x={root} y={0} color="#ef4444" />
                        ))}

                        {/* X-axis */}
                        <Plot.OfX y={() => 0} color="#666" weight={1} opacity={0.5} />
                    </Mafs>
                </div>
            </div>

            {/* Parametrlər və Həll */}
            <div className="w-full lg:w-96 space-y-4">
                {/* Əmsallar */}
                <div className="bg-white rounded-lg p-4 shadow-sm space-y-3">
                    <h4 className="font-semibold">Əmsallar (ax³ + bx² + cx + d)</h4>

                    <div className="grid grid-cols-2 gap-3">
                        <div>
                            <label className="text-sm font-medium">a = {a}</label>
                            <input type="range" min={-3} max={3} value={a}
                                onChange={e => setA(Number(e.target.value))}
                                className="w-full" />
                        </div>
                        <div>
                            <label className="text-sm font-medium">b = {b}</label>
                            <input type="range" min={-10} max={10} value={b}
                                onChange={e => setB(Number(e.target.value))}
                                className="w-full" />
                        </div>
                        <div>
                            <label className="text-sm font-medium">c = {c}</label>
                            <input type="range" min={-10} max={10} value={c}
                                onChange={e => setC(Number(e.target.value))}
                                className="w-full" />
                        </div>
                        <div>
                            <label className="text-sm font-medium">d = {d}</label>
                            <input type="range" min={-10} max={10} value={d}
                                onChange={e => setD(Number(e.target.value))}
                                className="w-full" />
                        </div>
                    </div>

                    <p className="font-mono text-center p-2 bg-gray-50 rounded">
                        P(x) = {a}x³ {b >= 0 ? '+' : ''}{b}x² {c >= 0 ? '+' : ''}{c}x {d >= 0 ? '+' : ''}{d}
                    </p>
                </div>

                {/* Köklər */}
                <div className="bg-blue-50 rounded-lg p-4">
                    <h4 className="font-semibold mb-2">Rasional Köklər</h4>
                    {roots.length > 0 ? (
                        <div className="flex gap-2 flex-wrap">
                            {roots.map((root, i) => (
                                <span key={i} className="px-3 py-1 bg-white rounded font-mono text-blue-700">
                                    x{i + 1} = {root}
                                </span>
                            ))}
                        </div>
                    ) : (
                        <p className="text-sm text-gray-600">Rasional kök tapılmadı</p>
                    )}
                </div>

                {/* Horner Sxemi */}
                {roots.length > 0 && (
                    <div className="bg-gradient-to-br from-purple-50 to-blue-50 rounded-lg p-4">
                        <h4 className="font-semibold mb-2">Horner Sxemi (x = {roots[0]})</h4>
                        <div className="overflow-x-auto">
                            <table className="w-full text-sm">
                                <thead>
                                    <tr>
                                        <td className="font-medium p-1">Əmsal</td>
                                        {getHornerScheme(roots[0]).coeffs.map((c, i) => (
                                            <td key={i} className="text-center p-1 font-mono">{c}</td>
                                        ))}
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                        <td className="font-medium p-1">Nəticə</td>
                                        {getHornerScheme(roots[0]).results.map((r, i) => (
                                            <td key={i} className="text-center p-1 font-mono text-purple-700">{r}</td>
                                        ))}
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                        <p className="text-xs text-gray-500 mt-2">
                            Son nəticə {getHornerScheme(roots[0]).results.slice(-1)[0]} = 0 (kök təsdiqləndi)
                        </p>
                    </div>
                )}

                {/* Vuruqlara ayrılmış forma */}
                <div className="bg-green-50 rounded-lg p-4">
                    <h4 className="font-semibold mb-2">Vuruqlara Ayrılmış Forma</h4>
                    <p className="font-mono text-green-700">{getFactoredForm()}</p>
                </div>

                <button onClick={handleReset}
                    className="w-full py-2 bg-gray-200 hover:bg-gray-300 rounded-lg font-medium transition">
                    Sıfırla
                </button>
            </div>
        </div>
    )
}
