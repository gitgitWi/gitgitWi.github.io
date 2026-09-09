import * as stylex from "@stylexjs/stylex";
import { useCallback, useEffect, useMemo, useRef, useState } from "preact/hooks";

import type { QuizDeckId } from "../../content/quiz.ts";
import { isQuizDeckId } from "../../lib/quiz/deck-meta.ts";
import { gradeMCQ, gradeShort } from "../../lib/quiz/grade.ts";
import { loadDeckItems } from "../../lib/quiz/load-deck.ts";
import { readQuizProgress, recordDeckAnswer } from "../../lib/quiz/progress.ts";
import { buildSession, isSessionMcq, type SessionItem } from "../../lib/quiz/session.ts";

import { quizDeckStyles } from "./QuizDeck.stylex.ts";

const REDUCED_MOTION_QUERY = "(prefers-reduced-motion: reduce)";

type CardSnapshot = {
  flipped: boolean;
  picked?: number;
  shortValue: string;
  revealed: boolean;
  correct?: boolean;
};

type QuizDeckProps = {
  deckIds: readonly QuizDeckId[];
  deckLabels: Record<QuizDeckId, string>;
  deckCounts: Record<QuizDeckId, number>;
  sessionLimit?: number;
};

const emptySnapshot = (): CardSnapshot => ({
  flipped: false,
  shortValue: "",
  revealed: false,
});

const readDeckFromUrl = (): QuizDeckId | undefined => {
  if (typeof window === "undefined") return undefined;
  const param = new URLSearchParams(window.location.search).get("deck") ?? "";
  return isQuizDeckId(param) ? param : undefined;
};

const useReducedMotion = () => {
  const [reduced, setReduced] = useState(false);

  useEffect(() => {
    const media = window.matchMedia(REDUCED_MOTION_QUERY);
    const sync = () => setReduced(media.matches);
    sync();
    media.addEventListener("change", sync);
    return () => media.removeEventListener("change", sync);
  }, []);

  return reduced;
};

export function QuizDeck({ deckIds, deckLabels, deckCounts, sessionLimit = 10 }: QuizDeckProps) {
  const reducedMotion = useReducedMotion();
  const inputRef = useRef<HTMLInputElement>(null);
  const initialDeckId = readDeckFromUrl();
  const [selectedDeckId, setSelectedDeckId] = useState<QuizDeckId | undefined>(initialDeckId);
  const [loading, setLoading] = useState(!!initialDeckId);
  const [order, setOrder] = useState<SessionItem[]>([]);
  const [idx, setIdx] = useState(0);
  const [snapshots, setSnapshots] = useState<Record<number, CardSnapshot>>({});
  const [liveMessage, setLiveMessage] = useState("");
  const [storedProgress, setStoredProgress] = useState(
    () => readQuizProgress()[selectedDeckId ?? "ts-basics"],
  );

  const deckLabel = selectedDeckId ? deckLabels[selectedDeckId] : "";
  const snap = snapshots[idx] ?? emptySnapshot();
  const { flipped, picked, shortValue, revealed } = snap;

  const current = order[idx];
  const total = order.length;
  const finished = selectedDeckId !== undefined && idx >= total;
  const score = useMemo(
    () => Object.values(snapshots).filter((entry) => entry.revealed && entry.correct).length,
    [snapshots],
  );

  const patchSnap = useCallback(
    (patch: Partial<CardSnapshot>) => {
      setSnapshots((prev) => ({
        ...prev,
        [idx]: { ...emptySnapshot(), ...prev[idx], ...patch },
      }));
    },
    [idx],
  );

  const loadAndStartDeck = useCallback(
    async (deckId: QuizDeckId) => {
      setLoading(true);
      const items = await loadDeckItems(deckId);
      const nextLimit = Math.min(sessionLimit, items.length);
      setOrder(buildSession({ items, limit: nextLimit }));
      setIdx(0);
      setSnapshots({});
      setStoredProgress(readQuizProgress()[deckId]);
      setLiveMessage(`${deckLabels[deckId]} 덱을 시작합니다.`);
      setLoading(false);
    },
    [deckLabels, sessionLimit],
  );

  useEffect(() => {
    if (!initialDeckId) return;
    void loadAndStartDeck(initialDeckId);
  }, [initialDeckId, loadAndStartDeck]);

  const selectDeck = useCallback(
    (deckId: QuizDeckId) => {
      const url = new URL(window.location.href);
      url.searchParams.set("deck", deckId);
      history.replaceState({}, "", url);
      setSelectedDeckId(deckId);
      void loadAndStartDeck(deckId);
    },
    [loadAndStartDeck],
  );

  const restartSession = useCallback(() => {
    if (!selectedDeckId) return;
    void loadAndStartDeck(selectedDeckId);
  }, [loadAndStartDeck, selectedDeckId]);

  const goNext = useCallback(() => {
    if (idx >= total - 1) {
      setIdx(total);
      setLiveMessage(`세션 완료. ${score} / ${total} 정답.`);
      return;
    }
    setIdx((value) => value + 1);
    setLiveMessage(`다음 문제 ${idx + 2} / ${total}`);
  }, [idx, score, total]);

  const goPrev = useCallback(() => {
    if (idx <= 0) return;
    setIdx((value) => value - 1);
    setLiveMessage(`이전 문제 ${idx} / ${total}`);
  }, [idx, total]);

  const evaluate = useCallback(() => {
    if (!current || !selectedDeckId || snapshots[idx]?.revealed) return;

    if (current.type === "mcq" && picked === undefined) {
      setLiveMessage("보기를 선택한 뒤 제출하세요.");
      return;
    }

    if (current.type === "short" && shortValue.trim() === "") {
      setLiveMessage("답을 입력한 뒤 제출하세요.");
      return;
    }

    const correct =
      current.type === "mcq" && isSessionMcq(current)
        ? gradeMCQ({
            pickedIndex: picked ?? -1,
            answerIndex: current.shuffledAnswerIndex,
          })
        : current.type === "short"
          ? gradeShort({ given: shortValue, answer: current.answer })
          : false;

    setSnapshots((prev) => ({
      ...prev,
      [idx]: {
        flipped: true,
        picked,
        shortValue,
        revealed: true,
        correct,
      },
    }));

    const progress = recordDeckAnswer({ deckId: selectedDeckId, correct });
    setStoredProgress(progress);
    setLiveMessage(correct ? "정답입니다." : "오답입니다.");
  }, [current, idx, picked, selectedDeckId, shortValue, snapshots]);

  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      if (!selectedDeckId || finished) return;
      const target = event.target as HTMLElement | null;
      const typing = target?.tagName === "INPUT" || target?.tagName === "TEXTAREA";

      if (!flipped && event.key === "Enter" && !typing) {
        event.preventDefault();
        patchSnap({ flipped: true });
        setLiveMessage("문제를 확인했습니다. 답을 입력하세요.");
        return;
      }

      if (revealed) {
        if (event.key === "ArrowRight") {
          event.preventDefault();
          goNext();
        }
        if (event.key === "ArrowLeft") {
          event.preventDefault();
          goPrev();
        }
        return;
      }

      if (current?.type === "mcq" && !typing) {
        const choice = Number(event.key);
        if (choice >= 1 && choice <= 4) {
          event.preventDefault();
          patchSnap({ picked: choice - 1 });
          setLiveMessage(`${choice}번 보기를 선택했습니다.`);
        }
      }

      if (event.key === "Enter") {
        event.preventDefault();
        evaluate();
      }

      if (!typing && event.key === "ArrowLeft") {
        event.preventDefault();
        goPrev();
      }
      if (!typing && event.key === "ArrowRight" && revealed) {
        event.preventDefault();
        goNext();
      }
    };

    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [current, evaluate, finished, flipped, goNext, goPrev, patchSnap, revealed, selectedDeckId]);

  useEffect(() => {
    if (flipped && current?.type === "short" && !revealed) {
      inputRef.current?.focus();
    }
  }, [current?.type, flipped, revealed]);

  const progressPercent = useMemo(
    () => (total === 0 ? 0 : Math.round(((idx + (revealed ? 1 : 0)) / total) * 100)),
    [idx, revealed, total],
  );

  const deckPicker = (
    <nav aria-label="덱 선택">
      <ul {...stylex.props(quizDeckStyles.deckNav)}>
        {deckIds.map((deckId) => (
          <li key={deckId}>
            <button
              type="button"
              {...stylex.props(
                quizDeckStyles.deckButton,
                selectedDeckId === deckId && quizDeckStyles.deckButtonActive,
              )}
              aria-current={selectedDeckId === deckId ? "true" : undefined}
              onClick={() => selectDeck(deckId)}
            >
              {deckLabels[deckId]} ({deckCounts[deckId]})
            </button>
          </li>
        ))}
      </ul>
    </nav>
  );

  if (!selectedDeckId) {
    return (
      <div {...stylex.props(quizDeckStyles.root)}>
        {deckPicker}
        <p {...stylex.props(quizDeckStyles.deckPrompt)} aria-live="polite">
          덱을 선택하면 flash card 세션이 시작됩니다.
        </p>
      </div>
    );
  }

  if (loading || !current) {
    return (
      <div {...stylex.props(quizDeckStyles.root)}>
        {deckPicker}
        <p {...stylex.props(quizDeckStyles.deckPrompt)} aria-live="polite">
          {loading ? `${deckLabel} 덱을 불러오는 중…` : liveMessage}
        </p>
      </div>
    );
  }

  if (finished) {
    return (
      <div {...stylex.props(quizDeckStyles.root)}>
        {deckPicker}
        <div {...stylex.props(quizDeckStyles.header)}>
          <h2 {...stylex.props(quizDeckStyles.prompt)}>{deckLabel} 완료</h2>
        </div>
        <p {...stylex.props(quizDeckStyles.feedback)} aria-live="polite">
          {liveMessage || `${score} / ${total} 정답`}
        </p>
        {storedProgress && (
          <p {...stylex.props(quizDeckStyles.stats)}>
            누적 — seen {storedProgress.seen}, correct {storedProgress.correct}
          </p>
        )}
        <div {...stylex.props(quizDeckStyles.actions)}>
          <button
            type="button"
            {...stylex.props(quizDeckStyles.primaryButton)}
            onClick={restartSession}
          >
            다시 풀기
          </button>
        </div>
      </div>
    );
  }

  const mcq = isSessionMcq(current) ? current : undefined;
  const choices = mcq?.shuffledChoices ?? [];

  const front = (
    <div {...stylex.props(quizDeckStyles.cardFace)}>
      <p {...stylex.props(quizDeckStyles.prompt)}>{current.prompt}</p>
      <p {...stylex.props(quizDeckStyles.hint)}>Enter — 뒤집기 · ←/→ — 이동</p>
      <div {...stylex.props(quizDeckStyles.actions)}>
        <button
          type="button"
          {...stylex.props(quizDeckStyles.primaryButton)}
          onClick={() => {
            patchSnap({ flipped: true });
            setLiveMessage("문제를 확인했습니다. 답을 입력하세요.");
          }}
        >
          카드 뒤집기
        </button>
      </div>
    </div>
  );

  const back = (
    <div {...stylex.props(quizDeckStyles.cardFace, quizDeckStyles.cardBack)}>
      <p {...stylex.props(quizDeckStyles.prompt)}>{current.prompt}</p>

      {current.type === "mcq" && mcq && (
        <ul {...stylex.props(quizDeckStyles.choices)}>
          {choices.map((choice, choiceIndex) => {
            const selected = picked === choiceIndex;
            const showResult = revealed;
            const isCorrect = choiceIndex === mcq.shuffledAnswerIndex;

            return (
              <li key={choice}>
                <button
                  type="button"
                  disabled={revealed}
                  {...stylex.props(
                    quizDeckStyles.choiceButton,
                    selected && quizDeckStyles.choiceSelected,
                    showResult && isCorrect && quizDeckStyles.choiceCorrect,
                    showResult && selected && !isCorrect && quizDeckStyles.choiceWrong,
                  )}
                  onClick={() => {
                    patchSnap({ picked: choiceIndex });
                    setLiveMessage(`${choiceIndex + 1}번 보기를 선택했습니다.`);
                  }}
                >
                  <span aria-hidden="true">{choiceIndex + 1}.</span>
                  <span>{choice}</span>
                </button>
              </li>
            );
          })}
        </ul>
      )}

      {current.type === "short" && (
        <input
          ref={inputRef}
          type="text"
          value={shortValue}
          disabled={revealed}
          aria-label="주관식 답"
          {...stylex.props(quizDeckStyles.shortInput)}
          onInput={(event) => patchSnap({ shortValue: (event.target as HTMLInputElement).value })}
        />
      )}

      {revealed && (
        <>
          <p {...stylex.props(quizDeckStyles.explanation)}>{current.explanation}</p>
          <a href={current.source} {...stylex.props(quizDeckStyles.sourceLink)}>
            출처 보기
          </a>
        </>
      )}

      <div {...stylex.props(quizDeckStyles.actions)}>
        {!revealed && (
          <button type="button" {...stylex.props(quizDeckStyles.primaryButton)} onClick={evaluate}>
            제출
          </button>
        )}
        {revealed && (
          <button type="button" {...stylex.props(quizDeckStyles.primaryButton)} onClick={goNext}>
            {idx >= total - 1 ? "결과 보기" : "다음"}
          </button>
        )}
        <button type="button" {...stylex.props(quizDeckStyles.secondaryButton)} onClick={goPrev}>
          이전
        </button>
      </div>
    </div>
  );

  return (
    <div {...stylex.props(quizDeckStyles.root)}>
      {deckPicker}
      <div {...stylex.props(quizDeckStyles.header)}>
        <h2 {...stylex.props(quizDeckStyles.prompt)}>{deckLabel}</h2>
        <div {...stylex.props(quizDeckStyles.stats)}>
          <span>
            {idx + 1} / {total}
          </span>
          <span>점수 {score}</span>
          {storedProgress && (
            <span>
              누적 {storedProgress.correct}/{storedProgress.seen}
            </span>
          )}
        </div>
      </div>

      <div
        {...stylex.props(quizDeckStyles.progressTrack)}
        role="progressbar"
        aria-valuemin={0}
        aria-valuemax={100}
        aria-valuenow={progressPercent}
        aria-label="세션 진행률"
      >
        <div
          {...stylex.props(quizDeckStyles.progressFill)}
          style={{ width: `${progressPercent}%` }}
        />
      </div>

      <p {...stylex.props(quizDeckStyles.feedback)} aria-live="polite">
        {liveMessage}
      </p>

      {reducedMotion ? (
        <div {...stylex.props(quizDeckStyles.cardFade)}>
          <div
            {...stylex.props(
              flipped ? quizDeckStyles.cardFaceHidden : quizDeckStyles.cardFaceStatic,
            )}
          >
            {front}
          </div>
          <div
            {...stylex.props(
              flipped ? quizDeckStyles.cardFaceStatic : quizDeckStyles.cardFaceHidden,
            )}
          >
            {back}
          </div>
        </div>
      ) : (
        <div {...stylex.props(quizDeckStyles.cardShell)}>
          <div {...stylex.props(quizDeckStyles.card, flipped && quizDeckStyles.cardFlipped)}>
            {front}
            {back}
          </div>
        </div>
      )}

      <p {...stylex.props(quizDeckStyles.hint)}>키보드: 1–4 선택 · Enter 제출/뒤집기 · ←/→ 이동</p>
    </div>
  );
}

export default QuizDeck;
