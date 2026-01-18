import { useState } from 'react'
import { Mafs, Coordinates, Plot, Point, Text, useMovablePoint } from 'mafs'
import 'mafs/core.css'

interface QuadraticFunctionProps {
    config?: {
        initialA?: number
        initialB?: number
        initialC?: number
        minA?: number
        maxA?: number
        minB?: number
        maxB?: number
        minC?: number
        maxC?: number
    }
}

export default function QuadraticFunction({ config = {} }: QuadraticFunctionProps) {
    const {
        initialA = 1,
        initialB = 0,
        initialC = 0,
        minA = -5,
        maxA = 5,
        minB = -10,
        maxB = 10,
        minC = -10,
        maxC = 10,
    } = config

    const [a, setA] = useState(initialA)
    const [b, setB] = useState(initialB)
    const [c, setC] = useState(initialC)

    // Hesablamalar
    const calculateVertex = () => {
        if (a === 0) return { x: 0, y: c }
        const x = -b / (2 * a)
        const y = a * x * x + b * x + c
        return { x, y }
    }

    const calculateDiscriminant = () => {
        return b * b - 4 * a * c
    }

    const calculateRoots = () => {
        const D = calculateDiscriminant()
        if (D < 0) return []
        if (D === 0) {
            const x = -b / (2 * a)
            return [{ x, y: 0 }]
        }
        const x1 = (-b + Math.sqrt(D)) / (2 * a)
        const x2 = (-b - Math.sqrt(D)) / (2 * a)
        return [
            { x: x1, y: 0 },
            { x: x2, y: 0 },
        ]
    }

    const vertex = calculateVertex()
    const discriminant = calculateDiscriminant()
    const roots = calculateRoots()

    const handleReset = () => {
        setA(initialA)
        setB(initialB)
        setC(initialC)
    }

    return (
        <div className="w-full h-full flex flex-col lg:flex-row gap-6">
            {/* Qrafik */}
            <div className="flex-1 bg-white rounded-lg p-4 shadow-sm">
                <h3 className="text-lg font-semibold mb-4">Qrafik: y = {a}x² + {b}x + {c}</h3>
                <div className="w-full aspect-square">
                    <Mafs
                        viewBox={{
                            x: [-10, 10],
                            y: [-10, 10],
                        }}
                    >
                        <Coordinates.Cartesian subdivisions={2} />

                        {/* Parabola */}
                        {a !== 0 && (
                            <Plot.OfX
                                y={(x) => a * x * x + b * x + c}
                                color="#0ea5e9"
                                weight={3}
                            />
                        )}

                        {/* Təpə nöqtəsi */}
                        <Point
                            x={vertex.x}
                            y={vertex.y}
                            color="#22c55e"
                        />
                        <Text
                            x={vertex.x}
                            y={vertex.y + 0.5}
                            attach="n"
                            attachDistance={15}
                        >
                            Təpə ({vertex.x.toFixed(2)}, {vertex.y.toFixed(2)})
                        </Text>

                        {/* Kökləri göstər */}
                        {roots.map((root, index) => (
                            <Point
                                key={index}
                                x={root.x}
                                y={root.y}
                                color="#ef4444"
                            />
                        ))}

                        {/* Y-kəsişmə */}
                        <Point x={0} y={c} color="#8b5cf6" />
                    </Mafs>
                </div>
            </div>

            {/* Parametrlər və Məlumatlar */}
            <div className="w-full lg:w-96 space-y-6">
                {/* Sliders */}
                <div className="bg-white rounded-lg p-6 shadow-sm space-y-4">
                    <h3 className="text-lg font-semibold mb-4">Parametrlər</h3>

                    {/* a əmsalı */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                            a əmsalı: {a.toFixed(2)}
                        </label>
                        <input
                            type="range"
                            min={minA}
                            max={maxA}
                            step={0.1}
                            value={a}
                            onChange={(e) => setA(Number(e.target.value))}
                            className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-primary-500"
                        />
                        <div className="flex justify-between text-xs text-gray-500 mt-1">
                            <span>{minA}</span>
                            <span>{maxA}</span>
                        </div>
                    </div>

                    {/* b əmsalı */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                            b əmsalı: {b.toFixed(2)}
                        </label>
                        <input
                            type="range"
                            min={minB}
                            max={maxB}
                            step={0.1}
                            value={b}
                            onChange={(e) => setB(Number(e.target.value))}
                            className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-primary-500"
                        />
                        <div className="flex justify-between text-xs text-gray-500 mt-1">
                            <span>{minB}</span>
                            <span>{maxB}</span>
                        </div>
                    </div>

                    {/* c əmsalı */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                            c əmsalı: {c.toFixed(2)}
                        </label>
                        <input
                            type="range"
                            min={minC}
                            max={maxC}
                            step={0.1}
                            value={c}
                            onChange={(e) => setC(Number(e.target.value))}
                            className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-primary-500"
                        />
                        <div className="flex justify-between text-xs text-gray-500 mt-1">
                            <span>{minC}</span>
                            <span>{maxC}</span>
                        </div>
                    </div>

                    <button
                        onClick={handleReset}
                        className="w-full mt-4 px-4 py-2 bg-gray-200 hover:bg-gray-300 rounded-lg font-medium transition"
                    >
                        Sıfırla
                    </button>
                </div>

                {/* Hesablamalar */}
                <div className="bg-gradient-to-br from-blue-50 to-purple-50 rounded-lg p-6 shadow-sm space-y-3">
                    <h3 className="text-lg font-semibold mb-4">Hesablamalar</h3>

                    <div className="space-y-2 text-sm">
                        <div className="flex justify-between">
                            <span className="text-gray-600">Funksiya:</span>
                            <span className="font-mono font-semibold">
                                y = {a.toFixed(1)}x² {b >= 0 ? '+' : ''}{b.toFixed(1)}x {c >= 0 ? '+' : ''}{c.toFixed(1)}
                            </span>
                        </div>

                        <hr className="my-2" />

                        <div className="flex justify-between">
                            <span className="text-gray-600">Təpə nöqtəsi:</span>
                            <span className="font-semibold text-green-600">
                                ({vertex.x.toFixed(2)}, {vertex.y.toFixed(2)})
                            </span>
                        </div>

                        <div className="flex justify-between">
                            <span className="text-gray-600">Diskriminant:</span>
                            <span className={`font-semibold ${discriminant >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                                D = {discriminant.toFixed(2)}
                            </span>
                        </div>

                        <div className="flex justify-between">
                            <span className="text-gray-600">Köklərin sayı:</span>
                            <span className="font-semibold">
                                {discriminant < 0 ? '0 (kök yoxdur)' : discriminant === 0 ? '1 (toxunma)' : '2 kök'}
                            </span>
                        </div>

                        {roots.length > 0 && (
                            <div>
                                <span className="text-gray-600 block mb-1">X-kəsişmələr:</span>
                                {roots.map((root, index) => (
                                    <div key={index} className="ml-4 font-semibold text-red-600">
                                        x{index + 1} = {root.x.toFixed(2)}
                                    </div>
                                ))}
                            </div>
                        )}

                        <div className="flex justify-between">
                            <span className="text-gray-600">Y-kəsişmə:</span>
                            <span className="font-semibold text-purple-600">
                                (0, {c.toFixed(2)})
                            </span>
                        </div>

                        <hr className="my-2" />

                        <div className="flex justify-between">
                            <span className="text-gray-600">Açılma istiqaməti:</span>
                            <span className="font-semibold">
                                {a > 0 ? '↑ Yuxarı' : a < 0 ? '↓ Aşağı' : '-'}
                            </span>
                        </div>

                        <div className="flex justify-between">
                            <span className="text-gray-600">Ekstremum:</span>
                            <span className="font-semibold">
                                {a > 0 ? 'Minimum' : a < 0 ? 'Maksimum' : '-'}
                            </span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
