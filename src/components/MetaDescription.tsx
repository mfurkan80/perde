const MAX_LENGTH = 155;
const DEFAULT_DESCRIPTION =
  "Film ve dizilerin özetlerini, oyuncu kadrolarını ve fragmanlarını keşfet; izlediklerini kaydet.";

interface MetaDescriptionProps {
  text?: string;
}

const shorten = (text: string) => {
  const clean = text.replace(/\s+/g, " ").trim();

  if (clean.length <= MAX_LENGTH) {
    return clean;
  }

  const cut = clean.slice(0, MAX_LENGTH - 1);
  return `${cut.slice(0, cut.lastIndexOf(" "))}…`;
};

// React 19 <meta> etiketini otomatik olarak <head>'e taşır; sayfa
// değişince eskisi kaldırılır. Bu yüzden index.html'de ayrı bir
// description etiketi tutulmuyor, yoksa iki tane olurdu.
const MetaDescription = ({ text }: MetaDescriptionProps) => (
  <meta
    name="description"
    content={text?.trim() ? shorten(text) : DEFAULT_DESCRIPTION}
  />
);

export default MetaDescription;
