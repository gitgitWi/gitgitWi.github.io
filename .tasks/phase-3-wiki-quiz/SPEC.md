# Phase 3 — Wiki Quiz (flash cards)

> 상태: SPEC+PLAN 작성됨 / 승인 대기.

## 1. 배경

TIL/wiki 축적분을 능동 회상으로 전환. 정적 사이트 무해(islands)하게 퀴즈를 얹는다.

## 2. 목표

1. 문제 소스: `til` frontmatter `quizRefs` + `src/content/quiz/*.yaml(ts)` 덱.
   스키마: `{ id, deck, prompt, choices?[], answer, explanation, source slug }`.
2. 출제: Fisher–Yates shuffle, 객관식(4지선다, 보기 순서 셔플) / 주관식(정규화 비교: trim·소문자·조사무시 옵션) 랜덤 믹스.
3. UI: `QuizDeck` island (`client:visible`, Preact 권장 — 경량): 카드 플립(flash card), 세션 진행률,
   정답률, 다시풀기, 덱 선택. 키보드 (`←/→` 넘기기, `1-4` 선택, `Enter` 제출).
4. 상태: 세션 메모리 + `localStorage` (덱별 `seen/correct` 카운트, SRS는 Phase 4 이후).
5. 접근성: `aria-live` 정답 피드백, 포커스 트랩 없음, 명도대비 4.5:1, 모션 `prefers-reduced-motion` 존중.

## 3. 비목표

- 서버 저장/로그인 (정적 배포와 충돌). SRS 알고리즘 고도화.

## 4. 종료 게이트

- [ ] 시드 20문항 (기존 til 기반 실문제).
- [ ] 출제 셔플·채점 단위테스트 그린 (vitest).
- [ ] JS 비활성 시에도 문제 목록 정적 렌더 (점진 향상).
- [ ] SSG 빌드 사이즈 회귀 없음 (quiz island 번들 ≤ 30KB gzip 목표).
