const uniCodeMap: Record<'¼' | '⅓' | '½' | '⅔' | '¾', number> = {
  '¼': 0.25,
  '⅓': 0.33,
  '½': 0.5,
  '⅔': 0.67,
  '¾': 0.75,
};

const fractionMap = {
  0.25: '¼',
  0.33: '⅓',
  0.5: '½',
  0.67: '⅔',
  0.75: '¾',
};

const unicodePattern = Object.keys(uniCodeMap).join('|');
const amountRegex = new RegExp(
  `(\\d+\\s\\d+/\\d+|\\d+\\.\\d+|\\d+/\\d+|\\d+|${unicodePattern})`,
  'g',
);

function parseAmount(amount: string): number {
  if (amount in uniCodeMap) {
    return uniCodeMap[amount as keyof typeof uniCodeMap];
  }

  const mixedFractionRegex = /^\d+\s\d+\/\d+$/;
  const simpleFractionRegex = /^\d+\/\d+$/;

  if (mixedFractionRegex.test(amount)) {
    const [whole, fraction] = amount.split(' ');
    const [num, denom] = fraction.split('/');
    return Number.parseInt(whole) + Number.parseFloat(num) / Number.parseFloat(denom);
  }

  if (simpleFractionRegex.test(amount)) {
    const [num, denom] = amount.split('/');
    return Number.parseFloat(num) / Number.parseFloat(denom);
  }

  const num = Number.parseFloat(amount);

  return Number.isNaN(num) ? -1 : num;
}

function formatAmount(amount: number): string {
  const whole = Math.floor(amount);
  const frac = amount - whole;

  if (frac === 0) {
    return `${whole}`;
  }

  if (fractionMap[frac as keyof typeof fractionMap]) {
    return whole > 0 ? `${whole} ${fractionMap[frac as keyof typeof fractionMap]}` : fractionMap[frac as keyof typeof fractionMap];
  }

  // Fallback for non-standard fractions
  return amount.toFixed(3);
}

export function scaleIngredient(line: string, multiplier: number): string {
  return line.replace(amountRegex, (match) => {
    const parsed = parseAmount(match);

    if (parsed === -1) {
      return match;
    }

    const scaled = parsed * multiplier;
    return formatAmount(scaled);
  });
}
