export const normalizeShortAnswer = (value: string): string =>
  value
    .normalize("NFKC")
    .trim()
    .toLowerCase()
    .replace(/[\s.]+/g, "");

type GradeMcqArgs = {
  pickedIndex: number;
  answerIndex: number;
};

export const gradeMCQ = ({ pickedIndex, answerIndex }: GradeMcqArgs): boolean =>
  pickedIndex === answerIndex;

type GradeShortArgs = {
  given: string;
  answer: string;
};

export const gradeShort = ({ given, answer }: GradeShortArgs): boolean =>
  normalizeShortAnswer(given) === normalizeShortAnswer(answer);
