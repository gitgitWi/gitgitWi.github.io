export type QuizView = "finished" | "loading" | "empty" | "card";

type QuizViewArgs = {
  idx: number;
  total: number;
  loading: boolean;
  hasCurrent: boolean;
};

export const quizView = ({ idx, total, loading, hasCurrent }: QuizViewArgs): QuizView => {
  if (total > 0 && idx >= total) return "finished";
  if (loading) return "loading";
  if (!hasCurrent) return "empty";
  return "card";
};
