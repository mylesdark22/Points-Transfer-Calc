export function getMultiplier({ mode, bonusPercent, ratioSource, ratioDest }) {
  if (mode === 'percentage') {
    if (bonusPercent == null || bonusPercent < 0) return null;
    return 1 + bonusPercent / 100;
  }

  if (mode === 'ratio') {
    if (!ratioSource || !ratioDest || ratioSource <= 0 || ratioDest <= 0) return null;
    return ratioDest / ratioSource;
  }

  return null;
}

export function calculate({ target, multiplier, increment = 1000 }) {
  if (!target || target <= 0 || !multiplier || multiplier <= 0) return null;

  const raw = target / multiplier;
  const sourceNeeded = Math.ceil(raw / increment) * increment;
  const destinationReceived = sourceNeeded * multiplier;

  return {
    sourceNeeded,
    destinationReceived,
    surplus: destinationReceived - target,
  };
}
