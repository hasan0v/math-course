import { useState } from 'react'
import { Mafs, Coordinates, Circle, Point, Line, Text, Angle } from 'mafs'
import 'mafs/core.css'

export default function CircleProperties() {
    const [radius, setRadius] = useState(3)
    const [centralAngle, setCentralAngle] = useState(60)
    const [showCentralAngle, setShowCentralAngle] = useState(true)
    const [showInscribedAngle, setShowInscribedAngle] = useState(false)
    const [showTangent, setShowTangent] = useState(false)
    const [showChord, setShowChord] = useState(false)

    const angleRad = (centralAngle * Math.PI) / 180

    // Çevrə üzərindəki nöqtələr
    const pointA: [number, number] = [radius, 0]
    const pointB: [number, number] = [radius * Math.cos(angleRad), radius * Math.sin(angleRad)]

    // Daxilə çəkilmiş bucaq üçün nöqtə (qarşı tərəfdə)
    const inscribedAnglePos = Math.PI + angleRad / 2
    const pointC: [number, number] = [
        radius * Math.cos(inscribedAnglePos),
        radius * Math.sin(inscribedAnglePos)
    ]

    // Vətər
    const chordLength = Math.sqrt(
        Math.pow(pointB[0] - pointA[0], 2) + Math.pow(pointB[1] - pointA[1], 2)
    )

    // Mərkəzdən vətərə məsafə
    const distanceToChord = radius * Math.cos(angleRad / 2)

    const handleReset = () => {
        setRadius(3)
        setCentralAngle(60)
        setShowCentralAngle(true)
        setShowInscribedAngle(false)
        setShowTangent(false)
        setShowChord(false)
    }

    return (
        <div className="w-full flex flex-col lg:flex-row gap-6">
            {/* Qrafik */}
            <div className="flex-1 bg-white rounded-lg p-4 shadow-sm">
                <h3 className="text-lg font-semibold mb-4">Çevrə və Xassələri</h3>
                <div className="w-full aspect-square">
                    <Mafs viewBox={{ x: [-5, 5], y: [-5, 5] }}>
                        <Coordinates.Cartesian subdivisions={2} />

                        {/* Çevrə */}
                        <Circle center={[0, 0]} radius={radius} color="#3b82f6" />

                        {/* Mərkəz */}
                        <Point x={0} y={0} color="#000" />
                        <Text x={0.3} y={-0.3}>O</Text>

                        {/* A və B nöqtələri */}
                        <Point x={pointA[0]} y={pointA[1]} color="#ef4444" />
                        <Text x={pointA[0] + 0.3} y={pointA[1] - 0.3}>A</Text>

                        <Point x={pointB[0]} y={pointB[1]} color="#ef4444" />
                        <Text x={pointB[0] + 0.3} y={pointB[1] + 0.3}>B</Text>

                        {/* Mərkəzi bucaq */}
                        {showCentralAngle && (
                            <>
                                <Line.Segment point1={[0, 0]} point2={pointA} color="#22c55e" weight={2} />
                                <Line.Segment point1={[0, 0]} point2={pointB} color="#22c55e" weight={2} />
                            </>
                        )}

                        {/* Daxilə çəkilmiş bucaq */}
                        {showInscribedAngle && (
                            <>
                                <Point x={pointC[0]} y={pointC[1]} color="#8b5cf6" />
                                <Text x={pointC[0] - 0.3} y={pointC[1] - 0.3}>C</Text>
                                <Line.Segment point1={pointC} point2={pointA} color="#8b5cf6" weight={2} />
                                <Line.Segment point1={pointC} point2={pointB} color="#8b5cf6" weight={2} />
                            </>
                        )}

                        {/* Vətər */}
                        {showChord && (
                            <Line.Segment point1={pointA} point2={pointB} color="#f59e0b" weight={3} />
                        )}

                        {/* Toxunan */}
                        {showTangent && (
                            <>
                                <Line.ThroughPoints
                                    point1={[pointA[0], pointA[1] - 3]}
                                    point2={[pointA[0], pointA[1] + 3]}
                                    color="#ec4899"
                                    weight={2}
                                />
                                {/* 90° işarəsi */}
                                <Line.Segment point1={[pointA[0] - 0.3, 0]} point2={[pointA[0] - 0.3, 0.3]} color="#666" />
                                <Line.Segment point1={[pointA[0] - 0.3, 0.3]} point2={[pointA[0], 0.3]} color="#666" />
                            </>
                        )}
                    </Mafs>
                </div>
            </div>

            {/* Parametrlər */}
            <div className="w-full lg:w-96 space-y-4">
                {/* Radius */}
                <div className="bg-white rounded-lg p-4 shadow-sm">
                    <label className="block font-semibold mb-2">Radius: {radius}</label>
                    <input
                        type="range" min={1} max={4} step={0.5} value={radius}
                        onChange={e => setRadius(Number(e.target.value))}
                        className="w-full"
                    />
                </div>

                {/* Mərkəzi bucaq */}
                <div className="bg-white rounded-lg p-4 shadow-sm">
                    <label className="block font-semibold mb-2">Mərkəzi bucaq: {centralAngle}°</label>
                    <input
                        type="range" min={10} max={180} value={centralAngle}
                        onChange={e => setCentralAngle(Number(e.target.value))}
                        className="w-full"
                    />
                </div>

                {/* Göstərmə düymələri */}
                <div className="bg-gray-50 rounded-lg p-4 space-y-2">
                    <h4 className="font-semibold mb-2">Göstər:</h4>

                    <label className="flex items-center gap-2 cursor-pointer">
                        <input type="checkbox" checked={showCentralAngle}
                            onChange={e => setShowCentralAngle(e.target.checked)}
                            className="w-4 h-4" />
                        <span className="text-green-600">Mərkəzi bucaq (yaşıl)</span>
                    </label>

                    <label className="flex items-center gap-2 cursor-pointer">
                        <input type="checkbox" checked={showInscribedAngle}
                            onChange={e => setShowInscribedAngle(e.target.checked)}
                            className="w-4 h-4" />
                        <span className="text-purple-600">Daxilə çəkilmiş bucaq (bənövşəyi)</span>
                    </label>

                    <label className="flex items-center gap-2 cursor-pointer">
                        <input type="checkbox" checked={showChord}
                            onChange={e => setShowChord(e.target.checked)}
                            className="w-4 h-4" />
                        <span className="text-amber-600">Vətər (narıncı)</span>
                    </label>

                    <label className="flex items-center gap-2 cursor-pointer">
                        <input type="checkbox" checked={showTangent}
                            onChange={e => setShowTangent(e.target.checked)}
                            className="w-4 h-4" />
                        <span className="text-pink-600">Toxunan (çəhrayı)</span>
                    </label>
                </div>

                {/* Hesablamalar */}
                <div className="bg-blue-50 rounded-lg p-4 space-y-2">
                    <h4 className="font-semibold">Hesablamalar</h4>
                    <p className="text-sm"><strong>Çevrənin uzunluğu:</strong> {(2 * Math.PI * radius).toFixed(2)}</p>
                    <p className="text-sm"><strong>Sahə:</strong> {(Math.PI * radius * radius).toFixed(2)}</p>
                    <p className="text-sm"><strong>Mərkəzi bucaq:</strong> {centralAngle}°</p>
                    <p className="text-sm"><strong>Daxilə çəkilmiş bucaq:</strong> {centralAngle / 2}°</p>
                    {showChord && (
                        <p className="text-sm"><strong>Vətər uzunluğu:</strong> {chordLength.toFixed(2)}</p>
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
