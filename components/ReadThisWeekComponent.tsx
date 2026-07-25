'use client';

import { ArchiveItem } from "@/interfaces/archieve"
import { useRouter } from "next/navigation";

function ReadThisWeekComponent({ items }: { items: ArchiveItem[] }) {
    const router = useRouter();

    return (
        <div className="flex flex-col gap-4">
            <h2 className="text-2xl font-bold">Read This Week</h2>
            {items.map((item, index) => (
                <div
                    key={index}
                    onClick={() => router.push(`/archieve/${item.slug}`)}
                    className="border p-4 rounded-lg shadow-sm block hover:shadow-md transition-shadow cursor-pointer"
                >
                    <div className="flex justify-between items-start mb-1">
                        <p className="text-sm text-gray-500">{item.date.toLocaleDateString()}</p>
                        <span className={`text-xs px-2 py-1 rounded-full ${item.visibility === 'public' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
                            {item.visibility}
                        </span>
                    </div>
                    <h3 className="font-semibold text-lg">{item.info}</h3>
                    <p className="text-sm mt-2 text-blue-600 hover:underline">
                        <strong>Source:</strong>
                        <a
                            href={item.Source.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            onClick={(e) => e.stopPropagation()}
                            className="hover:underline"
                        >
                            {item.Source.title}
                        </a>
                    </p>
                    <div className="flex gap-2 mt-3 flex-wrap">
                        {item.Topics.map((topic, tIndex) => (
                            <span
                                key={tIndex}
                                className="bg-gray-100 text-gray-800 text-xs px-2 py-1 rounded-full"
                            >
                                {topic}
                            </span>
                        ))}
                    </div>
                </div>
            ))}
        </div>)
}

export default ReadThisWeekComponent