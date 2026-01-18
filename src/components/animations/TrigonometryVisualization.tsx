import { useState } from 'react'
import { Mafs, Coordinates, Circle, Point, Line, Text, Polygon } from 'mafs'
import 'mafs/core.css'

export default function TrigonometryVisualization() {
    const [angle, setAngle] = useState(45)

    const angleRad = (angle * Math.PI) / 180
    const sinValue = Math.sin(angleRad)
    const cosValue = Math.cos(angleRad)
    const tanValue = Math.tan(angleRad)

    // Üçbucaq nöqtələri (vahid çevrədə)
    const pointA = [0, 0] as [number, number]
    const pointB = [cosValue * 3, 0] as [number, number]
    const pointC = [cosValue * 3, sinValue * 3] as [number, number]

    // Vahid çevrə üzərindəki nöqtə
    const unitCirclePoint = [cosValue, sinValue] as [number, number]

    const handleReset = () => setAngle(45)

    return (
        <div className="w-full flex flex-col lg:flex-row gap-6">
            {/* Qrafik */}
            <div className="flex-1 bg-white rounded-lg p-4 shadow-sm">
                <h3 className="text-lg font-semibold mb-4">Triqonometriya Vizuallaşdırması</h3>
                <div className="w-full aspect-square">
                    <Mafs viewBox={{ x: [-4, 4], y: [-4, 4] }}>
                        <Coordinates.Cartesian subdivisions={2} />

                        {/* Vahid çevrə */}
                        <Circle center={[0, 0]} radius={1} strokeStyle="dashed" color="#94a3b8" />

                        {/* Düzbucaqlı üçbucaq */}
                        <Polygon
                            points={[pointA, pointB, pointC]}
                            color="#3b82f6"
                            fillOpacity={0.1}
                            strokeOpacity={0.8}
                        />

                        {/* Hipotenuz - qırmızı */}
                        <Line.Segment point1={pointA} point2={pointC} color="#ef4444" weight={3} />

                        {/* Qarşı tərəf - göy */}
                        <Line.Segment point1={pointB} point2={pointC} color="#3b82f6" weight={3} />

                        {/* Bitişik tərəf - yaşıl */}
                        <Line.Segment point1={pointA} point2={pointB} color="#22c55e" weight={3} />

                        {/* Düz bucaq işarəsi */}
                        <Line.Segment
                            point1={[pointB[0] - 0.2, 0]}
                            point2={[pointB[0] - 0.2, 0.2]}
                            color="#666"
                        />
                        <Line.Segment
                            point1={[pointB[0] - 0.2, 0.2]}
                            point2={[pointB[0], 0.2]}
                            color="#666"
                        />

                        {/* Nöqtələr */}
                        <Point x={0} y={0} color="#000" />
                        <Point x={pointB[0]} y={0} color="#22c55e" />
                        <Point x={pointC[0]} y={pointC[1]} color="#3b82f6" />

                        {/* Vahid çevrədə nöqtə */}
                        <Point x={unitCirclePoint[0]} y={unitCirclePoint[1]} color="#8b5cf6" />

                        {/* Sin və Cos xətləri vahid çevrədə */}
                        <Line.Segment point1={[0, 0]} point2={unitCirclePoint} color="#8b5cf6" weight={2} />
                        <Line.Segment point1={unitCirclePoint} point2={[unitCirclePoint[0], 0]} color="#ef4444" weight={2} strokeStyle="dashed" />
                        <Line.Segment point1={[0, 0]} point2={[unitCirclePoint[0], 0]} color="#22c55e" weight={2} strokeStyle="dashed" />
                    </Mafs>
                </div>
            </div>

            {/* Parametrlər */}
            <div className="w-full lg:w-96 space-y-4">
                {/* Bucaq slider */}
                <div className="bg-white rounded-lg p-4 shadow-sm">
                    <h4 className="font-semibold mb-3">Bucaq: α = {angle}°</h4>
                    <input
                        type="range"
                        min={0}
                        max={90}
                        value={angle}
                        onChange={e => setAngle(Number(e.target.value))}
                        className="w-full h-2 bg-gray-200 rounded-lg cursor-pointer accent-primary-500"
                    />
                    <div className="flex justify-between text-xs text-gray-500 mt-1">
                        <span>0°</span>
                        <span>30°</span>
                        <span>45°</span>
                        <span>60°</span>
                        <span>90°</span>
                    </div>
                </div>

                {/* Triqonometrik nisbətlər */}
                <div className="bg-gradient-to-br from-blue-50 to-purple-50 rounded-lg p-4 space-y-3">
                    <h4 className="font-semibold">Triqonometrik Nisbətlər</h4>

                    <div className="flex items-center gap-3 p-2 bg-white rounded">
                        <span className="w-16 font-medium text-red-600">sin α</span>
                        <span className="flex-1 font-mono">{sinValue.toFixed(4)}</span>
                        <span className="text-xs text-gray-500">qarşı / hipotenuz</span>
                    </div>

                    <div className="flex items-center gap-3 p-2 bg-white rounded">
                        <span className="w-16 font-medium text-green-600">cos α</span>
                        <span className="flex-1 font-mono">{cosValue.toFixed(4)}</span>
                        <span className="text-xs text-gray-500">bitişik / hipotenuz</span>
                    </div>

                    <div className="flex items-center gap-3 p-2 bg-white rounded">
                        <span className="w-16 font-medium text-blue-600">tg α</span>
                        <span className="flex-1 font-mono">
                            {angle === 90 ? '∞' : tanValue.toFixed(4)}
                        </span>
                        <span className="text-xs text-gray-500">qarşı / bitişik</span>
                    </div>
                </div>

                {/* Pifaqor eyinliyi */}
                <div className="bg-green-50 rounded-lg p-4">
                    <h4 className="font-semibold mb-2">Pifaqor Eyinliyi</h4>
                    <p className="font-mono text-sm">
                        sin²α + cos²α = {(sinValue * sinValue + cosValue * cosValue).toFixed(4)} ✓
                    </p>
                </div>

                {/* Əsas bucaqlar */}
                <div className="bg-white rounded-lg p-4 shadow-sm">
                    <h4 className="font-semibold mb-2">Sürətli Bucaqlar</h4>
                    <div className="flex gap-2">
                        {[0, 30, 45, 60, 90].map(a => (
                            <button
                                key={a}
                                onClick={() => setAngle(a)}
                                className={`px-3 py-1 rounded text-sm font-medium transition ${angle === a ? 'bg-primary-500 text-white' : 'bg-gray-100 hover:bg-gray-200'
                                    }`}
                            >
                                {a}°
                            </button>
                        ))}
                    </div>
                </div>

                <button onClick={handleReset}
                    className="w-full py-2 bg-gray-200 hover:bg-gray-300 rounded-lg font-medium transition">
                    Sıfırla
                </button>
            </div>
        </div>
    )
}
