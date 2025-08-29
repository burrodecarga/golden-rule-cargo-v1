import Image from "next/image"

export function CardImage(url: { url: string }) {
    return (
        <div className="space-y-6">
            <div className="relative w-96 h-96 sm:h-[150px] lg:h-[150px] bg-red-100">
                <Image
                    src={url.url}
                    alt="Mountains fill image"
                    className="rounded object-cover"
                    fill
                />
            </div>
        </div>
    )
}