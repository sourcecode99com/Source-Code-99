import LegalPage from './legal';
import { Language } from '../translations';

export default function Terms({ lang }: { lang: Language }) {
  return <LegalPage type="terms" lang={lang} />;
}
