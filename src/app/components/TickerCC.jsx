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

    const RateCard = ({ data }) => (
        <div className="rate-card flex-shrink-0 bg-white rounded-lg shadow-md p-4 mx-2 min-w-[200px] border border-orange-100">
            <div className="w-full space-y-2">
                <div className="flex justify-between items-center">
                    <h2 className="text-base font-bold text-gray-800">{data.country}</h2>
                    <span className={`px-2 py-0.5 rounded-full text-xs font-medium 
        ${data.status?.toLowerCase() === 'active'
                            ? 'bg-green-100 text-green-700'
                            : 'bg-orange-100 text-orange-700'}`}
                    >
                        {data?.status?.charAt(0)?.toUpperCase() + data.status?.slice(1)}
                    </span>

                </div>
                <div className="space-y-1.5">
                    <div className="flex justify-between items-center bg-orange-50/50 rounded-md p-1.5">
                        <span className="text-sm text-gray-600">Outbound</span>
                        <span className="font-medium flex items-center text-sm">
                            {data.profile.Outbound ? data.profile.Outbound : 'N/A'} {data.currency || 'USD'}
                            {data.status?.toLowerCase() === 'active' && data.profile.Outbound ? (
                                <ArrowUpIcon className="h-3 w-3 text-green-500 ml-1" />
                            ) : (
                                <ArrowDownIcon className="h-3 w-3 text-orange-500 ml-1" />
                            )}
                        </span>
                    </div>

                    <div className="flex justify-between items-center bg-orange-50/50 rounded-md p-1.5">
                        <span className="text-sm text-gray-600">IVR</span>
                        <span className="font-medium flex items-center text-sm">
                            {data.profile.IVR ? data.profile.IVR : 'N/A'} {data.currency || 'USD'}
                            {data.status?.toLowerCase() === 'active' && data.profile.IVR ? (
                                <ArrowUpIcon className="h-3 w-3 text-green-500 ml-1" />
                            ) : (
                                <ArrowDownIcon className="h-3 w-3 text-orange-500 ml-1" />
                            )}
                        </span>
                    </div>
                </div>
            </div>
        </div>
    );

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
            transition: all 0.2s ease;
          }

          .rate-card:hover {
            transform: translateY(-2px);
            box-shadow: 0 8px 16px -4px rgba(255, 153, 0, 0.1);
            border-color: rgba(255, 153, 0, 0.3);
          }
        `}
            </style>
            <div className="ticker-container py-6">
                <div className="ticker-content">
                    {Array.from({ length: shouldScroll ? cloneCount : 1 }).map((_, cloneIndex) => (
                        <div key={`clone-${cloneIndex}`} className="flex">
                            {Data.map((data, index) => (
                                <RateCard
                                    key={`${cloneIndex}-${data._id || index}`}
                                    data={data}
                                />
                            ))}
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default CurrencyTicker;
