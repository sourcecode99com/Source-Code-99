import LegalPage from './legal';
import { Language } from '../translations';

export default function Privacy({ lang }: { lang: Language }) {
  return <LegalPage type="privacy" lang={lang} />;
}
