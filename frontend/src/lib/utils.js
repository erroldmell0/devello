// Difficulty is shown with the .brut-tag chip, which draws its border from
// currentColor — so these return a text colour rather than a daisyUI badge.
export const getDifficultyBadgeClass = (difficulty) => {
  switch (difficulty?.toLowerCase()) {
    case "easy":
      return "text-success";
    case "medium":
      return "text-warning";
    case "hard":
      return "text-error";
    default:
      return "text-base-content/60";
  }
};
