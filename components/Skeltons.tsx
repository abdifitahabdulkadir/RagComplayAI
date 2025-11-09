import { Skeleton } from "./ui/skeleton";

export default function StatisticsSkelton() {
  return (
    <div className="mt-4" aria-busy="true" aria-live="polite">
      <div className="row mb-4 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
        {Array.from({ length: 4 }).map((_, i) => (
          <div key={i} className="col-md-3 mb-3">
            <div className="stat-card p-4 bg-white rounded-lg shadow-sm">
              <div className="w-10 h-10 mb-2 rounded-full bg-gray-200 animate-pulse" />
              <div className="h-6 w-20 bg-gray-200 rounded mt-2 animate-pulse" />
              <div className="h-3 w-28 bg-gray-200 rounded mt-2 animate-pulse" />
            </div>
          </div>
        ))}
      </div>

      <div className="card shadow-lg mb-4 border-none rounded-[20px] p-5 bg-white">
        <div className="card-body p-0">
          <div className="row flex flex-wrap items-center">
            <div className="col-md-4 text-center w-full md:w-1/3">
              <div className="mx-auto w-28 h-28 rounded-full bg-gray-200 animate-pulse" />
              <p className="mt-3 mb-0">
                <span className="h-4 w-48 bg-gray-200 rounded inline-block animate-pulse" />
              </p>
            </div>
            <div className="col-md-8 w-full md:w-2/3 mt-4 md:mt-0">
              <div className="summary-card space-y-3">
                <div className="h-6 w-56 bg-gray-200 rounded animate-pulse" />
                <div className="h-4 w-full bg-gray-200 rounded animate-pulse" />
                <div className="grid grid-cols-2 gap-3 mt-3">
                  <div className="h-4 w-32 bg-gray-200 rounded animate-pulse" />
                  <div className="h-4 w-40 bg-gray-200 rounded animate-pulse" />
                </div>
                <div className="space-y-2 mt-3">
                  <div className="h-4 w-44 bg-gray-200 rounded animate-pulse" />
                  <div className="h-4 w-32 bg-gray-200 rounded animate-pulse" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export function UserSkelton() {
  return (
    <div className="flex items-center text-white text-2xl gap-2">
      <div className="mr-2">
        <Skeleton className="h-10 w-10 rounded-full" />
      </div>
      <Skeleton className="h-6 w-24" />
    </div>
  );
}
