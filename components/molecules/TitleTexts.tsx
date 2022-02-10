import { Texts } from '@/components/atoms/Texts';
import { CENTER } from '@/styles/GlobalClassNames';

import style from './TitleTexts.module.scss';

interface TitleTextsProps {
  titleText: string;
}

export function TitleTexts({ titleText }: TitleTextsProps) {
  return <Texts texts={titleText} className={[style.headText, CENTER].join(' ')} />;
}
