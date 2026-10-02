interface TextsProps {
  texts: string;
  className: string;
}

export function Texts({ texts, className }: TextsProps) {
  return <span className={className}>{texts}</span>;
}
