/**
 * Optional hand-polished lines for specific GitHub events (match by event `id`
 * from the GitHub API). Leave empty to rely on journal-style heuristics only.
 */
export type ActivityJournalOverrideRule = {
  matchEventId: string;
  displayTitle?: string;
  displayDescription?: string;
};

/** Push entries with `matchEventId` equal to the GitHub event `id` to override display copy. */
export const activityJournalOverrides: ActivityJournalOverrideRule[] = [];
