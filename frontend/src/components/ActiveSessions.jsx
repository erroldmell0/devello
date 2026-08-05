import {ArrowRightIcon,Code2Icon,CrownIcon,SparklesIcon,UsersIcon,ZapIcon,LoaderIcon} from "lucide-react";
import { Link } from "react-router";
import { getDifficultyBadgeClass } from "../lib/utils";

function ActiveSessions({ sessions, isLoading, isUserInSession }) {
  return (
    <div className="lg:col-span-2 bg-base-100 brut h-full">
      <div className="p-5">
        {/* HEADERS SECTION */}
        <div className="flex items-center justify-between mb-6 pb-3 border-b-2 border-primary">
          {/* TITLE AND ICON */}
          <div className="flex items-center gap-3">
            <div className="p-2 bg-primary border-2 border-primary">
              <ZapIcon className="size-5 text-primary-content" />
            </div>
            <h2 className="text-xl font-mono font-bold uppercase tracking-tight">Live Sessions</h2>
          </div>

          <div className="brut-tag text-success">
            <span className="size-2 bg-success" />
            {sessions.length} active
          </div>
        </div>

        {/* SESSIONS LIST */}
        <div className="space-y-3 max-h-100 overflow-y-auto pr-2">
          {isLoading ? (
            <div className="flex items-center justify-center py-20">
              <LoaderIcon className="size-10 animate-spin text-primary" />
            </div>
          ) : sessions.length > 0 ? (
            sessions.map((session) => (
              <div
                key={session._id}
                className="bg-base-200 brut-flat hover:border-primary transition-colors"
              >
                <div className="flex items-center justify-between gap-4 p-4">
                  {/* LEFT SIDE */}
                  <div className="flex items-center gap-4 flex-1">
                    <div className="relative size-14 border-2 border-primary brut-hatch flex items-center justify-center shrink-0">
                      <Code2Icon className="size-7 text-primary" />
                      <div className="absolute -top-1.5 -right-1.5 size-3 bg-success border-2 border-base-200" />
                    </div>

                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-2">
                        <h3 className="font-mono font-bold text-base truncate uppercase">{session.problem}</h3>
                        <span className={`brut-tag ${getDifficultyBadgeClass(session.difficulty)}`}>
                          {session.difficulty.slice(0, 1).toUpperCase() +
                            session.difficulty.slice(1)}
                        </span>
                      </div>

                      <div className="flex items-center gap-4 brut-meta text-base-content/60">
                        <div className="flex items-center gap-1.5">
                          <CrownIcon className="size-4" />
                          <span>{session.host?.name}</span>
                        </div>
                        <div className="flex items-center gap-1.5">
                          <UsersIcon className="size-4" />
                          <span>{session.participant ? "2/2" : "1/2"}</span>
                        </div>
                        {session.participant && !isUserInSession(session) ? (
                          <span className="brut-tag text-error">FULL</span>
                        ) : (
                          <span className="brut-tag text-success">OPEN</span>
                        )}
                      </div>
                    </div>
                  </div>

                  {session.participant && !isUserInSession(session) ? (
                    <button
                      disabled
                      className="px-4 py-2 border-2 border-base-content/20 text-base-content/30 font-mono font-bold text-xs uppercase tracking-widest cursor-not-allowed"
                    >
                      Full
                    </button>
                  ) : (
                    <Link
                      to={`/session/${session._id}`}
                      className="px-4 py-2 bg-primary border-2 border-primary text-primary-content font-mono font-bold text-xs uppercase tracking-widest brut-press flex items-center gap-2 shrink-0"
                    >
                      {isUserInSession(session) ? "Rejoin" : "Join"}
                      <ArrowRightIcon className="size-4" />
                    </Link>
                  )}
                </div>
              </div>
            ))
          ) : (
            <div className="text-center py-16">
              <div className="w-20 h-20 mx-auto mb-5 border-2 border-primary brut-hatch flex items-center justify-center">
                <SparklesIcon className="w-9 h-9 text-primary" />
              </div>
              <p className="font-mono font-bold uppercase tracking-tight mb-1">No active sessions</p>
              <p className="brut-meta text-base-content/40">Be the first to create one!</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
export default ActiveSessions;
