import { Link } from "react-router";
import Navbar from "../components/Navbar";

import { PROBLEMS } from "../data/problems";
import { ChevronRightIcon, Code2Icon } from "lucide-react";
import { getDifficultyBadgeClass } from "../lib/utils";

function ProblemsPage() {
  const problems = Object.values(PROBLEMS); //array of objects

  const easyProblemsCount = problems.filter((p) => p.difficulty === "Easy").length;
  const mediumProblemsCount = problems.filter((p) => p.difficulty === "Medium").length;
  const hardProblemsCount = problems.filter((p) => p.difficulty === "Hard").length;

  return (
    <div className="min-h-screen bg-base-200">
      <Navbar />

      <div className="max-w-6xl mx-auto px-4 py-12">
        {/* HEADER */}
        <div className="mb-8 pb-4 border-b-2 border-primary">
          <h1 className="text-3xl font-mono font-bold uppercase tracking-tighter mb-2 brut-prompt">
            Practice Problems
          </h1>
          <p className="brut-meta text-base-content/50">
            Sharpen your coding skills with these curated problems
          </p>
        </div>

        {/* PROBLEMS LIST */}
        <div className="space-y-4">
          {problems.map((problem) => (
            <Link
              key={problem.id}
              to={`/problem/${problem.id}`}
              className="block bg-base-100 brut brut-lift"
            >
              <div className="p-5">
                <div className="flex items-center justify-between gap-4">
                  {/* LEFT SIDE */}
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-3">
                      <div className="size-12 border-2 border-primary brut-hatch flex items-center justify-center shrink-0">
                        <Code2Icon className="size-6 text-primary" />
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-1">
                          <h2 className="text-lg font-mono font-bold uppercase tracking-tight">{problem.title}</h2>
                          <span className={`brut-tag ${getDifficultyBadgeClass(problem.difficulty)}`}>
                            {problem.difficulty}
                          </span>
                        </div>
                        <p className="brut-meta text-base-content/50">{problem.category}</p>
                      </div>
                    </div>
                    <p className="text-sm text-base-content/70 border-l-2 border-primary/40 pl-3">{problem.description.text}</p>
                  </div>
                  {/* RIGHT SIDE */}

                  <div className="flex items-center gap-2 text-primary shrink-0">
                    <span className="brut-meta">Solve</span>
                    <ChevronRightIcon className="size-5" />
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>

        {/* STATS FOOTER */}
        <div className="mt-12 bg-base-100 brut">
          <div className="grid grid-cols-2 md:grid-cols-4">
            <div className="p-5 border-r-2 border-b-2 md:border-b-0 border-primary/30">
              <div className="brut-meta text-base-content/50 mb-1">Total Problems</div>
              <div className="text-3xl font-mono font-bold text-primary">{problems.length}</div>
            </div>

            <div className="p-5 border-b-2 md:border-b-0 md:border-r-2 border-primary/30">
              <div className="brut-meta text-base-content/50 mb-1">Easy</div>
              <div className="text-3xl font-mono font-bold text-success">{easyProblemsCount}</div>
            </div>
            <div className="p-5 border-r-2 border-primary/30">
              <div className="brut-meta text-base-content/50 mb-1">Medium</div>
              <div className="text-3xl font-mono font-bold text-warning">{mediumProblemsCount}</div>
            </div>
            <div className="p-5">
              <div className="brut-meta text-base-content/50 mb-1">Hard</div>
              <div className="text-3xl font-mono font-bold text-error">{hardProblemsCount}</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
export default ProblemsPage;
