export default function summonerSpellTooltip(summonerSpell) {
  return `<span><div class="summoner-spell-name">${summonerSpell.name}</div><div>${summonerSpell.sanitizedDescription}</div></span>`
}