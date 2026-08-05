import { Code2, Clock, Users, Trophy, Loader } from "lucide-react";
import { getDifficultyBadgeClass } from "../lib/utils";
import { formatDistanceToNow } from "date-fns";

function RecentSessions({ sessions, isLoading }) {
  return (
    <div className="bg-base-100 brut brut-accent mt-8">
      <div className="p-5">
        <div className="flex items-center gap-3 mb-6 pb-3 border-b-2 border-accent">
          <div className="p-2 bg-accent border-2 border-accent">
            <Clock className="w-5 h-5 text-accent-content" />
          </div>
          <h2 className="text-xl font-mono font-bold uppercase tracking-tight">Your Past Sessions</h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {isLoading ? (
            <div className="col-span-full flex items-center justify-center py-20">
              <Loader className="w-10 h-10 animate-spin text-primary" />
            </div>
          ) : sessions.length > 0 ? (
            sessions.map((session) => (
              <div
                key={session._id}
                className={`relative bg-base-200 border-2 transition-colors ${
                  session.status === "active"
                    ? "border-success"
                    : "border-primary/30 hover:border-primary"
                }`}
              >
                {session.status === "active" && (
                  <div className="absolute top-3 right-3">
                    <div className="brut-tag text-success bg-base-200">
                      <span className="w-1.5 h-1.5 bg-success animate-pulse" />
                      ACTIVE
                    </div>
                  </div>
                )}

                <div className="p-4">
                  <div className="flex items-start gap-3 mb-4">
                    <div
                      className={`w-12 h-12 border-2 flex items-center justify-center shrink-0 ${
                        session.status === "active"
                          ? "border-success brut-hatch-accent"
                          : "border-primary brut-hatch"
                      }`}
                    >
                      <Code2
                        className={`w-6 h-6 ${
                          session.status === "active" ? "text-success" : "text-primary"
                        }`}
                      />
                    </div>
                    <div className="flex-1 min-w-0">
                      <h3 className="font-mono font-bold text-sm mb-2 truncate uppercase">{session.problem}</h3>
                      <span className={`brut-tag ${getDifficultyBadgeClass(session.difficulty)}`}>
                        {session.difficulty}
                      </span>
                    </div>
                  </div>

                  <div className="space-y-2 brut-meta text-base-content/60 mb-4">
                    <div className="flex items-center gap-2">
                      <Clock className="w-4 h-4" />
                      <span>
                        {formatDistanceToNow(new Date(session.createdAt), {
                          addSuffix: true,
                        })}
                      </span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Users className="w-4 h-4" />
                      <span>
                        {session.participant ? "2" : "1"} participant
                        {session.participant ? "s" : ""}
                      </span>
                    </div>
                  </div>

                  <div className="flex items-center justify-between pt-3 border-t-2 border-primary/20">
                    <span className="brut-meta text-base-content/70">Completed</span>
                    <span className="brut-meta text-base-content/30">
                      {new Date(session.updatedAt).toLocaleDateString()}
                    </span>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <div className="col-span-full text-center py-16">
              <div className="w-20 h-20 mx-auto mb-5 border-2 border-accent brut-hatch-accent flex items-center justify-center">
                <Trophy className="w-9 h-9 text-accent" />
              </div>
              <p className="font-mono font-bold uppercase tracking-tight mb-1">No sessions yet</p>
              <p className="brut-meta text-base-content/40">Start your coding journey today!</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default RecentSessions;
