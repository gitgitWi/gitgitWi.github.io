import Prose from './Prose.astro';

export default {
  title: 'ui/Prose',
  component: Prose,
};

export const Default = {
  args: {
    slots: {
      default: '<p>본문 단락입니다. Prose 래퍼는 읽기 폭을 제한합니다.</p>',
    },
  },
};

export const WithHeading = {
  args: {
    slots: {
      default: '<h2>소제목</h2><p>두 번째 단락입니다.</p>',
    },
  },
};
