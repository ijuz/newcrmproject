import React, { useState, useEffect, useRef } from "react";
import { ArrowUpIcon, ArrowDownIcon, Globe } from "lucide-react";

const CurrencyTicker = ({ Data }) => {
    const containerRef = useRef(null);
    const [cloneCount, setCloneCount] = useState(1);
    const cardWidth = 280;
    // console.log(Data);

    useEffect(() => {
        if (Data?.length > 0) {
            const calculateCloneCount = () => {
                const containerWidth = containerRef.current?.offsetWidth || 0;
                const visibleCards = Math.ceil(containerWidth / cardWidth);
                return Math.max(2, Math.ceil(visibleCards / Data.length));
            };

            const updateCloneCount = () => {
                setCloneCount(calculateCloneCount());
            };

            updateCloneCount();
            window.addEventListener("resize", updateCloneCount);
            return () => window.removeEventListener("resize", updateCloneCount);
        }
    }, [Data]);

    if (!Data || Data.length === 0) {
        return (
            <div className="flex items-center justify-center p-4 space-x-2">
                <Globe className="animate-spin h-5 w-5 text-orange-500" />
                <span className="text-gray-600">No data available</span>
            </div>
        );
    }

    const shouldScroll = Data.length >= 6; // Scroll only if there are 6 or more items
    const totalWidth = Data.length * cardWidth * cloneCount;

    return (
        <div className="relative w-full overflow-hidden bg-gradient-to-r from-orange-50 to-white" ref={containerRef}>
            <style>
                {`
          @keyframes smoothScroll {
            0% { transform: translateX(0); }
            100% { transform: translateX(-${totalWidth}px); }
          }
          .ticker-content {
            ${shouldScroll ? `animation: smoothScroll ${Data.length * 8 * cloneCount}s linear infinite;` : ""}
            will-change: transform;
            display: flex;
          }
          .ticker-container:hover .ticker-content {
            animation-play-state: paused;
          }
          .rate-card {
            transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
          }
          .rate-card:hover {
            transform: translateY(-4px) scale(1.02);
            box-shadow: 0 12px 24px -8px rgba(255, 153, 0, 0.15);
          }
        `}
            </style>
            <div className="ticker-container py-6">
                <div className="ticker-content">
                    {Array.from({ length: shouldScroll ? cloneCount : 1 }).map((_, cloneIndex) => (
                        <div key={`clone-${cloneIndex}`} className="flex">
                            {Data.map((item, index) => (
                                <div
                                    key={`${cloneIndex}-${item._id || index}`}
                                    className="rate-card flex-shrink-0 bg-white rounded-lg shadow-md p-4 mx-2 min-w-[260px] border border-orange-100"
                                >
                                    <div className="w-full space-y-3">
                                        <div className="flex justify-between items-center">
                                            <h2 className="text-base font-bold text-gray-800">{item.country || "Unknown"}</h2>
                                            <span className={`px-3 py-1 rounded-full text-xs font-medium transition-colors
                        ${item.status === "active"
                                                    ?
                                                    "bg-green-100 text-green-700 hover:bg-green-200"
                                                    : "bg-orange-100 text-orange-700 hover:bg-orange-200"
                                                }`}>
                                                {item.status}
                                            </span>
                                        </div>
                                        <div className="space-y-2">
                                            <div className="flex justify-between items-center bg-white/60 rounded-lg p-3 transition-all hover:bg-white/80">
                                                <span className="font-medium text-sm text-gray-800">{item.qualityDescription || "N/A"}</span>
                                            </div>
                                            <div className="flex justify-between items-center bg-white/60 rounded-lg p-3 transition-all hover:bg-white/80">
                                                <span className="text-sm text-gray-600">Rate</span>
                                                <span className="font-medium flex items-center text-sm">
                                                    {item.rate} {item.currency || "USD"}
                                                    {item.status === "active" ? (
                                                        <ArrowDownIcon className="h-4 w-4 text-green-500 ml-2" />
                                                    ) : (
                                                        <ArrowUpIcon className="h-4 w-4 text-orange-500 ml-2" />
                                                    )}
                                                </span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default CurrencyTicker;
