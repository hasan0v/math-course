// Placeholder for other animation components
// These will be created in future iterations

export default function PlaceholderAnimation({ title }: { title: string }) {
    return (
        <div className="w-full h-full flex items-center justify-center bg-gray-50 rounded-lg">
            <div className="text-center">
                <div className="text-6xl mb-4">📊</div>
                <h3 className="text-xl font-semibold text-gray-700 mb-2">{title}</h3>
                <p className="text-gray-500">Bu animasiya növbəti addımda əlavə ediləcək</p>
            </div>
        </div>
    )
}
