const levenshtein = (a: string, b: string): number => {
  const rows = a.length + 1;
  const cols = b.length + 1;

  const dp: number[][] = Array.from({ length: rows }, (_, i) =>
    Array.from({ length: cols }, (_, j) => {
      if (i === 0) return j; // insert all of b
      if (j === 0) return i; // delete all of a
      return 0;
    }),
  );

  for (let i = 1; i < rows; i++) {
    for (let j = 1; j < cols; j++) {
      const deletion = dp[i - 1][j] + 1;
      const insertion = dp[i][j - 1] + 1;
      const substitution = dp[i - 1][j - 1] + (a[i - 1] === b[j - 1] ? 0 : 1);
      dp[i][j] = Math.min(deletion, insertion, substitution);
    }
  }

  return dp[rows - 1][cols - 1];
};

export const findSuggestion = (
  cmd: string,
  candidates: string[],
): string | null => {
  let best: string | null = null;
  let bestDist = Infinity;
  for (const candidate of candidates) {
    const dist = levenshtein(cmd, candidate);
    if (dist < bestDist) {
      bestDist = dist;
      best = candidate;
    }
  }
  return bestDist <= 2 ? best : null;
};
