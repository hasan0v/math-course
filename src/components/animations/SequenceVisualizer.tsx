import { useState } from 'react'
import 'mafs/core.css'

export default function SequenceVisualizer() {
    const [mode, setMode] = useState<'arithmetic' | 'geometric'>('arithmetic')

    // Ədədi silsilə parametrləri
    const [a1, setA1] = useState(2)
    const [d, setD] = useState(3)

    // Həndəsi silsilə parametrləri
    const [b1, setB1] = useState(2)
    const [q, setQ] = useState(1.5)

    const [n, setN] = useState(10)

    // Ədədi silsilə hesablamaları
    const arithmeticTerm = (i: number) => a1 + (i - 1) * d
    const arithmeticSum = (count: number) => (count * (2 * a1 + (count - 1) * d)) / 2

    // Həndəsi silsilə hesablamaları
    const geometricTerm = (i: number) => b1 * Math.pow(q, i - 1)
    const geometricSum = (count: number) =>
        q === 1 ? b1 * count : b1 * (Math.pow(q, count) - 1) / (q - 1)

    // Tərtib etmək üçün nöqtələr
    const points = Array.from({ length: n }, (_, i) => ({
        index: i + 1,
        value: mode === 'arithmetic' ? arithmeticTerm(i + 1) : geometricTerm(i + 1)
    }))

    const currentTerm = mode === 'arithmetic' ? arithmeticTerm(n) : geometricTerm(n)
    const currentSum = mode === 'arithmetic' ? arithmeticSum(n) : geometricSum(n)

    const handleReset = () => {
        if (mode === 'arithmetic') {
            setA1(2); setD(3)
        } else {
            setB1(2); setQ(1.5)
        }
        setN(10)
    }

    return (
        <div className="w-full flex flex-col lg:flex-row gap-6">
            {/* Qrafik */}
            <div className="flex-1 bg-white rounded-lg p-4 shadow-sm">
                <h3 className="text-lg font-semibold mb-4">
                    {mode === 'arithmetic' ? 'Ədədi (Arifmetik) Silsilə' : 'Həndəsi Silsilə'}
                </h3>

                {/* Bar chart vizuallaşdırma */}
                <div className="h-64 flex items-end gap-1 p-4 bg-gray-50 rounded-lg overflow-x-auto">
                    {points.map((point, i) => {
                        const maxValue = Math.max(...points.map(p => Math.abs(p.value)))
                        const height = Math.min(Math.abs(point.value) / maxValue * 100, 100)
                        const isPositive = point.value >= 0

                        return (
                            <div key={i} className="flex flex-col items-center min-w-[30px]">
                                <span className="text-xs mb-1">{point.value.toFixed(1)}</span>
                                <div
                                    className={`w-6 rounded-t transition-all duration-300 ${isPositive ? 'bg-blue-500' : 'bg-red-500'
                                        }`}
                                    style={{ height: `${height}%` }}
                                />
                                <span className="text-xs mt-1 text-gray-500">a{point.index}</span>
                            </div>
                        )
                    })}
                </div>

                {/* Mod seçimi */}
                <div className="flex gap-2 mt-4">
                    <button
                        onClick={() => setMode('arithmetic')}
                        className={`flex-1 py-2 rounded-lg font-medium transition ${mode === 'arithmetic' ? 'bg-blue-500 text-white' : 'bg-gray-100 hover:bg-gray-200'
                            }`}
                    >
                        Ədədi Silsilə
                    </button>
                    <button
                        onClick={() => setMode('geometric')}
                        className={`flex-1 py-2 rounded-lg font-medium transition ${mode === 'geometric' ? 'bg-purple-500 text-white' : 'bg-gray-100 hover:bg-gray-200'
                            }`}
                    >
                        Həndəsi Silsilə
                    </button>
                </div>
            </div>

            {/* Parametrlər */}
            <div className="w-full lg:w-96 space-y-4">
                {mode === 'arithmetic' ? (
                    <>
                        <div className="bg-blue-50 rounded-lg p-4">
                            <h4 className="font-semibold mb-3">Ədədi Silsilə Parametrləri</h4>
                            <div className="space-y-3">
                                <div>
                                    <label className="text-sm font-medium">İlk hədd (a₁): {a1}</label>
                                    <input type="range" min={-10} max={10} value={a1}
                                        onChange={e => setA1(Number(e.target.value))}
                                        className="w-full" />
                                </div>
                                <div>
                                    <label className="text-sm font-medium">Diferens (d): {d}</label>
                                    <input type="range" min={-5} max={10} value={d}
                                        onChange={e => setD(Number(e.target.value))}
                                        className="w-full" />
                                </div>
                            </div>
                            <p className="text-sm mt-3 font-mono bg-white p-2 rounded">
                                aₙ = {a1} + (n-1)×{d}
                            </p>
                        </div>
                    </>
                ) : (
                    <>
                        <div className="bg-purple-50 rounded-lg p-4">
                            <h4 className="font-semibold mb-3">Həndəsi Silsilə Parametrləri</h4>
                            <div className="space-y-3">
                                <div>
                                    <label className="text-sm font-medium">İlk hədd (b₁): {b1}</label>
                                    <input type="range" min={1} max={10} value={b1}
                                        onChange={e => setB1(Number(e.target.value))}
                                        className="w-full" />
                                </div>
                                <div>
                                    <label className="text-sm font-medium">Məxrəc (q): {q.toFixed(1)}</label>
                                    <input type="range" min={0.5} max={3} step={0.1} value={q}
                                        onChange={e => setQ(Number(e.target.value))}
                                        className="w-full" />
                                </div>
                            </div>
                            <p className="text-sm mt-3 font-mono bg-white p-2 rounded">
                                bₙ = {b1} × {q.toFixed(1)}^(n-1)
                            </p>
                        </div>
                    </>
                )}

                {/* Hədd sayı */}
                <div className="bg-white rounded-lg p-4 shadow-sm">
                    <label className="font-semibold">Hədd sayı (n): {n}</label>
                    <input type="range" min={3} max={15} value={n}
                        onChange={e => setN(Number(e.target.value))}
                        className="w-full mt-2" />
                </div>

                {/* Nəticələr */}
                <div className="bg-green-50 rounded-lg p-4 space-y-2">
                    <h4 className="font-semibold">Nəticələr</h4>
                    <p className="text-sm">
                        <strong>{n}-ci hədd:</strong> {currentTerm.toFixed(2)}
                    </p>
                    <p className="text-sm">
                        <strong>İlk {n} həddin cəmi:</strong> {currentSum.toFixed(2)}
                    </p>
                </div>

                {/* Sonsuz cəm (həndəsi, |q| < 1) */}
                {mode === 'geometric' && Math.abs(q) < 1 && (
                    <div className="bg-amber-50 rounded-lg p-4">
                        <h4 className="font-semibold mb-2">Sonsuz Cəm</h4>
                        <p className="text-sm">|q| &lt; 1 olduğu üçün sonsuz cəm:</p>
                        <p className="font-mono text-lg mt-1">
                            S∞ = {(b1 / (1 - q)).toFixed(2)}
                        </p>
                    </div>
                )}

                <button onClick={handleReset}
                    className="w-full py-2 bg-gray-200 hover:bg-gray-300 rounded-lg font-medium transition">
                    Sıfırla
                </button>
            </div>
        </div>
    )
}
