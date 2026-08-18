import { Filter } from "bad-words";
import { detect as detectPersianBadWords } from "persian-bad-words";

const englishFilter = new Filter();

// Wordlist-based moderation (v1): combines an English profanity list
// (`bad-words`) with a Persian one (`persian-bad-words`, also catches
// common Finglish spellings). Deterministic and free, at the cost of
// missing indirect/creative spellings — see the roadmap doc for the
// AI-moderation upgrade path if that gap matters later.
export function containsBannedContent(text: string): boolean {
  if (!text.trim()) return false;
  return englishFilter.isProfane(text) || detectPersianBadWords(text);
}
