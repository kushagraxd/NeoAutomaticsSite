const WORDS = ['zero', 'one', 'two', 'three', 'four', 'five', 'six', 'seven', 'eight', 'nine', 'ten', 'eleven', 'twelve'];

/** "five" for 5; digits above twelve, as house style for running text. */
export function numberWord(n: number): string {
  return WORDS[n] ?? String(n);
}

export function capitalise(s: string): string {
  return s.charAt(0).toUpperCase() + s.slice(1);
}

/** ["a", "b", "c"] → "a, b and c" */
export function listSentence(items: string[]): string {
  if (items.length <= 1) return items.join('');
  return `${items.slice(0, -1).join(', ')} and ${items[items.length - 1]}`;
}
