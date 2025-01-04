import React, { useState, useEffect, useRef } from "react";
import { ArrowUpIcon, ArrowDownIcon, Globe } from "lucide-react";

const CurrencyTicker = () => {
  const [tickerData, setTickerData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const containerRef = useRef(null);
  const [cloneCount, setCloneCount] = useState(2);
  // console.log(tickerData);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const cctResponse = await fetch("https://backend.cloudqlobe.com/v3/api/cct");
        if (!cctResponse.ok) throw new Error("Failed to fetch rate IDs");
        const cctData = await cctResponse.json();
        // console.log(cctData);

        // const uniqueRateIds = [...new Set(cctData.flatMap(item => item.rateids))];
        // const rateResponses = await Promise.all(
        //   uniqueRateIds.map(id =>
        //     fetch(`https://backend.cloudqlobe.com/v3/api/clirates/${id}`).then(res => res.json())
        //   )
        // );
        setTickerData(cctData);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    if (!loading && tickerData.length > 0) {
      const calculateCloneCount = () => {
        const containerWidth = containerRef.current?.offsetWidth || 0;
        const cardWidth = 280;
        const visibleCards = Math.ceil(containerWidth / cardWidth);
        return Math.max(2, Math.ceil(visibleCards / tickerData.length) + 1);
      };

      const updateCloneCount = () => {
        setCloneCount(calculateCloneCount());
      };

      updateCloneCount();
      window.addEventListener('resize', updateCloneCount);
      return () => window.removeEventListener('resize', updateCloneCount);
    }
  }, [loading, tickerData]);

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

  if (loading) return (
    <div className="flex items-center justify-center p-6 space-x-3">
      <Globe className="animate-spin h-6 w-6 text-orange-500" />
      <span className="text-gray-600 font-medium">Loading rates...</span>
    </div>
  );

  if (error) return (
    <div className="p-4 bg-red-50 text-red-500 rounded-lg border border-red-100">
      Error: {error}
    </div>
  );

  const cardWidth = 216; // 200px + 16px margin
  const totalWidth = tickerData.length * cardWidth;

  return (
    <div className="relative w-full overflow-hidden bg-gradient-to-r from-orange-50 to-white" ref={containerRef}>
      <style>
        {`
          @keyframes smoothScroll {
            0% { transform: translateX(0); }
            100% { transform: translateX(-${totalWidth}px); }
          }

          .ticker-content {
            animation: smoothScroll ${tickerData.length * 5}s linear infinite;
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
          {Array.from({ length: cloneCount }).map((_, cloneIndex) => (
            <div key={`clone-${cloneIndex}`} className="flex">
              {tickerData.map((data, index) => (
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
