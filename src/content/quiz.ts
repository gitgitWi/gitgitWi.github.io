import { z } from "astro/zod";

export const quizDeckIds = ["ts-basics", "tdd", "refactoring", "design-system"] as const;

export type QuizDeckId = (typeof quizDeckIds)[number];

const quizDeckSchema = z.enum(quizDeckIds);

const quizBaseSchema = z.object({
  id: z.string(),
  deck: quizDeckSchema,
  prompt: z.string(),
  explanation: z.string(),
  /** Published content path, e.g. /til/ts/enum-to-template-literal */
  source: z.string(),
});

export const mcqQuizItemSchema = quizBaseSchema.extend({
  type: z.literal("mcq"),
  choices: z.tuple([z.string(), z.string(), z.string(), z.string()]),
  answerIndex: z.number().int().min(0).max(3),
});

export const shortQuizItemSchema = quizBaseSchema.extend({
  type: z.literal("short"),
  answer: z.string(),
});

export const quizItemSchema = z.discriminatedUnion("type", [
  mcqQuizItemSchema,
  shortQuizItemSchema,
]);

export type McqQuizItem = z.infer<typeof mcqQuizItemSchema>;
export type ShortQuizItem = z.infer<typeof shortQuizItemSchema>;
export type QuizItem = z.infer<typeof quizItemSchema>;

export const parseQuizItems = (items: unknown[]): QuizItem[] =>
  items.map((item) => quizItemSchema.parse(item));
