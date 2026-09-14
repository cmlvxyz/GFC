export interface Verse {
  text: string;
  ref: string;
}

export const VERSES: Verse[] = [
  { text: 'For I know the plans I have for you, declares the Lord, plans to prosper you and not to harm you, plans to give you hope and a future.', ref: 'Jeremiah 29:11' },
  { text: 'I can do all things through Christ who strengthens me.', ref: 'Philippians 4:13' },
  { text: 'Trust in the Lord with all your heart and lean not on your own understanding; in all your ways submit to him, and he will make your paths straight.', ref: 'Proverbs 3:5-6' },
  { text: 'The Lord is my shepherd; I shall not want.', ref: 'Psalm 23:1' },
  { text: 'For God so loved the world that he gave his one and only Son, that whoever believes in him shall not perish but have eternal life.', ref: 'John 3:16' },
  { text: 'Be strong and courageous. Do not be afraid; do not be discouraged, for the Lord your God will be with you wherever you go.', ref: 'Joshua 1:9' },
  { text: 'The Lord is close to the brokenhearted and saves those who are crushed in spirit.', ref: 'Psalm 34:18' },
  { text: 'Do not be anxious about anything, but in every situation, by prayer and petition, with thanksgiving, present your requests to God.', ref: 'Philippians 4:6' },
  { text: 'He gives strength to the weary and increases the power of the weak.', ref: 'Isaiah 40:29' },
  { text: 'Therefore encourage one another and build each other up, just as in fact you are doing.', ref: '1 Thessalonians 5:11' }
];

const dayOfYear = (): number => {
  const now = new Date();
  const start = new Date(now.getFullYear(), 0, 0);
  return Math.floor((now.getTime() - start.getTime()) / 86400000);
};

export const todayLabel = new Date().toLocaleDateString('en-US', {
  weekday: 'long',
  month: 'long',
  day: 'numeric'
});

export const getTodayVerse = (): Verse => VERSES[dayOfYear() % VERSES.length];

export const getMoreVerses = (count = 3): Verse[] => {
  const indexToday = dayOfYear() % VERSES.length;
  return [...VERSES.slice(indexToday + 1), ...VERSES.slice(0, indexToday)].slice(0, count);
};