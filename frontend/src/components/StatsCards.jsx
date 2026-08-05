import { TrophyIcon, UsersIcon } from "lucide-react";

function StatsCards({ activeSessionsCount, recentSessionsCount }) {
  return (
    <div className="lg:col-span-1 grid grid-cols-1 gap-6">
      {/* Active Count */}
      <div className="bg-base-100 brut">
        <div className="p-5">
          <div className="flex items-center justify-between mb-4">
            <div className="p-3 border-2 border-primary brut-hatch">
              <UsersIcon className="w-6 h-6 text-primary" />
            </div>
            <div className="brut-tag text-primary">Live</div>
          </div>
          <div className="text-4xl font-mono font-bold mb-1 text-primary">{activeSessionsCount}</div>
          <div className="brut-meta text-base-content/50">Active Sessions</div>
        </div>
      </div>

      {/* Recent Count */}
      <div className="bg-base-100 brut brut-secondary">
        <div className="p-5">
          <div className="flex items-center justify-between mb-4">
            <div className="p-3 border-2 border-secondary brut-hatch">
              <TrophyIcon className="w-6 h-6 text-secondary" />
            </div>
          </div>
          <div className="text-4xl font-mono font-bold mb-1 text-secondary">{recentSessionsCount}</div>
          <div className="brut-meta text-base-content/50">Total Sessions</div>
        </div>
      </div>
    </div>
  );
}

export default StatsCards;
