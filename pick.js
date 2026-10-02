// pick.js - choose the heaviest lineup whose total weight stays within the cap.
// Value equals weight, so the knapsack collapses to subset-sum: a 0/1 DP over
// 0.1 kg units. 20 people x 8000 units finishes instantly.
// ponytail: bitmask caps candidates at 31; switch to a per-item choice table if the team ever grows past that.
function pick(candidates, capKg) {
  if (candidates.length > 31) throw new Error("pick: at most 31 candidates");
  const cap = Math.round(capKg * 10);
  if (cap < 0) return { chosen: [], total: 0 };
  // reach[sum] = bitmask of candidates adding up to exactly `sum`; -1 = unreachable
  const reach = new Int32Array(cap + 1).fill(-1);
  reach[0] = 0;
  for (let idx = 0; idx < candidates.length; idx++) {
    const w = Math.round(candidates[idx].weight * 10);
    if (w <= 0) continue;
    // descending so each candidate is counted at most once
    for (let sum = cap; sum >= w; sum--) {
      if (reach[sum] === -1 && reach[sum - w] !== -1) reach[sum] = reach[sum - w] | (1 << idx);
    }
  }
  let best = cap;
  while (reach[best] === -1) best--;
  const chosen = candidates.filter((_, idx) => reach[best] & (1 << idx));
  return { chosen, total: best / 10 };
}

if (typeof module !== "undefined") module.exports = { pick }; // lets pick.test.js require() this browser script
