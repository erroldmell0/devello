import { Code2Icon, LoaderIcon, PlusIcon } from "lucide-react";
import { PROBLEMS } from "../data/problems";

function CreateSessionModal({isOpen, onClose,roomConfig, setRoomConfig,onCreateRoom,isCreating, }){
  const problems = Object.values(PROBLEMS);

  if (!isOpen) return null;

  return (
    <div className="modal modal-open">
      <div className="modal-box max-w-2xl bg-base-100 brut-lg p-6">
        <h3 className="font-mono font-bold text-xl uppercase tracking-tight mb-6 pb-3 border-b-2 border-primary brut-prompt">
          Create New Session
        </h3>

        <div className="space-y-8">
          {/* PROBLEM SELECTION */}
          <div className="space-y-2">
            <label className="flex items-center justify-between">
              <span className="brut-meta text-base-content/70">Select Problem</span>
              <span className="brut-meta text-error">Required</span>
            </label>

            <select
              className="select w-full border-2 border-primary/40 focus:border-primary font-mono"
              value={roomConfig.problem}
              onChange={(e) => {
                const selectedProblem = problems.find((p) => p.title === e.target.value);
                setRoomConfig({
                  difficulty: selectedProblem.difficulty,
                  problem: e.target.value,
                });
              }}
            >
              <option value="" disabled>
                Choose a coding problem...
              </option>

              {problems.map((problem) => (
                <option key={problem.id} value={problem.title}>
                  {problem.title} ({problem.difficulty})
                </option>
              ))}
            </select>
          </div>

          {/* ROOM SUMMARY */}
          {roomConfig.problem && (
            <div className="flex items-start gap-3 p-4 bg-base-200 border-2 border-success">
              <Code2Icon className="size-5 text-success shrink-0 mt-0.5" />
              <div className="space-y-1">
                <p className="brut-meta text-success">Room Summary</p>
                <p className="text-sm">
                  Problem: <span className="font-mono font-bold">{roomConfig.problem}</span>
                </p>
                <p className="text-sm">
                  Max Participants: <span className="font-mono font-bold">2 (1-on-1 session)</span>
                </p>
              </div>
            </div>
          )}
        </div>

        <div className="modal-action gap-3">
          <button
            className="px-5 py-2.5 bg-base-100 border-2 border-base-content/30 text-base-content/70 font-mono font-bold text-xs uppercase tracking-widest hover:border-base-content hover:text-base-content transition-colors"
            onClick={onClose}
          >
            Cancel
          </button>

          <button
            className="px-5 py-2.5 bg-primary border-2 border-primary text-primary-content font-mono font-bold text-xs uppercase tracking-widest brut-press flex items-center gap-2 disabled:opacity-40 disabled:cursor-not-allowed"
            onClick={onCreateRoom}
            disabled={isCreating || !roomConfig.problem}
          >
            {isCreating ? (
              <LoaderIcon className="size-5 animate-spin" />
            ) : (
              <PlusIcon className="size-5" />
            )}

            {isCreating ? "Creating..." : "Create"}
          </button>
        </div>
      </div>
      <div className="modal-backdrop bg-base-300/80" onClick={onClose}></div>
    </div>
  );
}
export default CreateSessionModal;
