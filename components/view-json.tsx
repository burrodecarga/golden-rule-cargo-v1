export function DataJson(data: any) {
    return (
        <div className="flex flex-col gap-2 items-start">
            <h2 className="font-bold text-2xl mb-4">Your data details</h2>
            <pre className="text-xs font-mono p-3 rounded border max-h-32 overflow-auto">
                {JSON.stringify(data.claims, null, 2)}
            </pre>
        </div>
    )
}