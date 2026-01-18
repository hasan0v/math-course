import { useState } from 'react'

export default function ProbabilitySimulator() {
    const [mode, setMode] = useState<'dice' | 'coin' | 'both'>('dice')
    const [results, setResults] = useState<number[]>([])
    const [coinResults, setCoinResults] = useState<('heads' | 'tails')[]>([])
    const [isRolling, setIsRolling] = useState(false)

    // Statistika
    const diceFrequency = Array.from({ length: 6 }, (_, i) =>
        results.filter(r => r === i + 1).length
    )

    const headsCount = coinResults.filter(r => r === 'heads').length
    const tailsCount = coinResults.filter(r => r === 'tails').length

    const rollDice = () => {
        return Math.floor(Math.random() * 6) + 1
    }

    const flipCoin = (): 'heads' | 'tails' => {
        return Math.random() > 0.5 ? 'heads' : 'tails'
    }

    const handleSingleRoll = () => {
        if (mode === 'dice' || mode === 'both') {
            setResults(prev => [...prev, rollDice()])
        }
        if (mode === 'coin' || mode === 'both') {
            setCoinResults(prev => [...prev, flipCoin()])
        }
    }

    const handleMultipleRolls = async (count: number) => {
        setIsRolling(true)
        const newDiceResults: number[] = []
        const newCoinResults: ('heads' | 'tails')[] = []

        for (let i = 0; i < count; i++) {
            if (mode === 'dice' || mode === 'both') {
                newDiceResults.push(rollDice())
            }
            if (mode === 'coin' || mode === 'both') {
                newCoinResults.push(flipCoin())
            }
        }

        setResults(prev => [...prev, ...newDiceResults])
        setCoinResults(prev => [...prev, ...newCoinResults])
        setIsRolling(false)
    }

    const handleReset = () => {
        setResults([])
        setCoinResults([])
    }

    const theoreticalProbability = (1 / 6 * 100).toFixed(2)
    const totalRolls = results.length

    return (
        <div className="w-full flex flex-col lg:flex-row gap-6">
            {/* Vizuallaşdırma */}
            <div className="flex-1 space-y-6">
                {/* Mod seçimi */}
                <div className="bg-white rounded-lg p-4 shadow-sm">
                    <div className="flex gap-2">
                        <button
                            onClick={() => setMode('dice')}
                            className={`flex-1 py-2 rounded-lg font-medium transition ${mode === 'dice' ? 'bg-blue-500 text-white' : 'bg-gray-100 hover:bg-gray-200'
                                }`}
                        >
                            🎲 Zər
                        </button>
                        <button
                            onClick={() => setMode('coin')}
                            className={`flex-1 py-2 rounded-lg font-medium transition ${mode === 'coin' ? 'bg-blue-500 text-white' : 'bg-gray-100 hover:bg-gray-200'
                                }`}
                        >
                            🪙 Sikkə
                        </button>
                        <button
                            onClick={() => setMode('both')}
                            className={`flex-1 py-2 rounded-lg font-medium transition ${mode === 'both' ? 'bg-blue-500 text-white' : 'bg-gray-100 hover:bg-gray-200'
                                }`}
                        >
                            🎲🪙 Hər ikisi
                        </button>
                    </div>
                </div>

                {/* Zər Histogram */}
                {(mode === 'dice' || mode === 'both') && (
                    <div className="bg-white rounded-lg p-4 shadow-sm">
                        <h3 className="font-semibold mb-4">Zər Nəticələri (Cəmi: {totalRolls})</h3>
                        <div className="flex items-end gap-2 h-40">
                            {diceFrequency.map((freq, i) => {
                                const maxFreq = Math.max(...diceFrequency, 1)
                                const height = (freq / maxFreq) * 100
                                const percentage = totalRolls > 0 ? ((freq / totalRolls) * 100).toFixed(1) : '0.0'

                                return (
                                    <div key={i} className="flex-1 flex flex-col items-center">
                                        <span className="text-xs mb-1">{percentage}%</span>
                                        <div
                                            className="w-full bg-blue-500 rounded-t transition-all duration-300"
                                            style={{ height: `${height}%` }}
                                        />
                                        <span className="text-sm mt-2 font-bold">{i + 1}</span>
                                        <span className="text-xs text-gray-500">{freq}</span>
                                    </div>
                                )
                            })}
                        </div>
                        <p className="text-xs text-gray-500 mt-2 text-center">
                            Nəzəri ehtimal: hər biri {theoreticalProbability}%
                        </p>
                    </div>
                )}

                {/* Sikkə Nəticələri */}
                {(mode === 'coin' || mode === 'both') && (
                    <div className="bg-white rounded-lg p-4 shadow-sm">
                        <h3 className="font-semibold mb-4">Sikkə Nəticələri (Cəmi: {coinResults.length})</h3>
                        <div className="flex gap-4">
                            <div className="flex-1 text-center p-4 bg-amber-50 rounded-lg">
                                <span className="text-4xl">🦅</span>
                                <p className="text-2xl font-bold text-amber-600">{headsCount}</p>
                                <p className="text-sm text-gray-600">Yazı</p>
                                <p className="text-xs text-gray-500">
                                    {coinResults.length > 0 ? ((headsCount / coinResults.length) * 100).toFixed(1) : '0.0'}%
                                </p>
                            </div>
                            <div className="flex-1 text-center p-4 bg-gray-50 rounded-lg">
                                <span className="text-4xl">👑</span>
                                <p className="text-2xl font-bold text-gray-600">{tailsCount}</p>
                                <p className="text-sm text-gray-600">Tura</p>
                                <p className="text-xs text-gray-500">
                                    {coinResults.length > 0 ? ((tailsCount / coinResults.length) * 100).toFixed(1) : '0.0'}%
                                </p>
                            </div>
                        </div>
                        <p className="text-xs text-gray-500 mt-2 text-center">
                            Nəzəri ehtimal: hər biri 50%
                        </p>
                    </div>
                )}
            </div>

            {/* Kontrol Paneli */}
            <div className="w-full lg:w-80 space-y-4">
                {/* Atış düymələri */}
                <div className="bg-white rounded-lg p-4 shadow-sm space-y-3">
                    <h4 className="font-semibold">Atış Et</h4>
                    <button
                        onClick={handleSingleRoll}
                        disabled={isRolling}
                        className="w-full py-3 bg-green-500 hover:bg-green-600 text-white rounded-lg font-medium transition disabled:opacity-50"
                    >
                        {mode === 'dice' ? '🎲 1 dəfə at' : mode === 'coin' ? '🪙 1 dəfə at' : '🎲🪙 1 dəfə at'}
                    </button>

                    <div className="grid grid-cols-3 gap-2">
                        {[10, 50, 100].map(count => (
                            <button
                                key={count}
                                onClick={() => handleMultipleRolls(count)}
                                disabled={isRolling}
                                className="py-2 bg-blue-100 hover:bg-blue-200 text-blue-700 rounded font-medium transition disabled:opacity-50"
                            >
                                {count}x
                            </button>
                        ))}
                    </div>

                    <button
                        onClick={() => handleMultipleRolls(1000)}
                        disabled={isRolling}
                        className="w-full py-2 bg-purple-100 hover:bg-purple-200 text-purple-700 rounded-lg font-medium transition disabled:opacity-50"
                    >
                        1000 dəfə at (Böyük ədədlər qanunu)
                    </button>
                </div>

                {/* Son nəticə */}
                {(results.length > 0 || coinResults.length > 0) && (
                    <div className="bg-gradient-to-br from-blue-50 to-purple-50 rounded-lg p-4">
                        <h4 className="font-semibold mb-2">Son Nəticə</h4>
                        {results.length > 0 && (
                            <p className="text-3xl font-bold text-center">🎲 {results[results.length - 1]}</p>
                        )}
                        {coinResults.length > 0 && (
                            <p className="text-xl text-center mt-2">
                                {coinResults[coinResults.length - 1] === 'heads' ? '🦅 Yazı' : '👑 Tura'}
                            </p>
                        )}
                    </div>
                )}

                {/* Ehtimal hesablaması */}
                <div className="bg-amber-50 rounded-lg p-4">
                    <h4 className="font-semibold mb-2">Ehtimal Düsturu</h4>
                    <p className="text-sm font-mono bg-white p-2 rounded">
                        P(A) = əlverişli / ümumi
                    </p>
                    <p className="text-xs text-gray-600 mt-2">
                        Atış sayı artdıqca nəzəri ehtimala yaxınlaşırıq!
                    </p>
                </div>

                <button onClick={handleReset}
                    className="w-full py-2 bg-gray-200 hover:bg-gray-300 rounded-lg font-medium transition">
                    Sıfırla
                </button>
            </div>
        </div>
    )
}
