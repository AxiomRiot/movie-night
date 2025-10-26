// const regex = /(?:(\d+(?:[ /-]?\d+)?(?:\s*(?:-|\bor\b)\s*\d+(?:[ /-]?\d+)?)?|½|¼)\s*(?:cup|tablespoons?|teaspoons?|tbsp|tsp)?)(?:\s+)?(.+)/g;
const uniCodeMap = {
  '¼': 0.25,
  '⅓': 0.33,
  '½': 0.5,
  '⅔': 0.67,
  '¾': 0.75,
};

const unicodePattern = Object.keys(uniCodeMap).join('|');
const amountRegex = new RegExp(
  `(\\d+\\s\\d+/\\d+|\\d+\\.\\d+|\\d+/\\d+|\\d+|${unicodePattern})`,
  'g'
);
// const amountRegex = /(\d+\s\d+\/\d+|\d+\.\d+|\d+\/\d+|\d+|¼|⅓|½|⅔|¾)/g;

const ingredients = [
  "1-2 fresh Thai bird chili peppers (thinly sliced)",
  "½ cup oil",
  "1/2- 1 1/2 tablespoons Sichuan peppercorns (powdered or finely ground, reserving 1/4 teaspoon for garnish at the end; if you want a milder flavor use 1/2 or 1 teaspoon ground Sichuan peppercorn)",
  "1 1/2 teaspoons cornstarch",
  "1 to 2 dried red chili peppers"
];

ingredients.forEach(line => {
  const match = line.match(amountRegex);
  if (match) {
    console.log(match);
  } else {
    console.log(`No match for: "${line}"`);
  }
});
