const platformIdToRegion = {
  BR1:  'br',
  EUN1: 'eune',
  EUW1: 'euw',
  JP1:  'jp',
  LA1:  'lan',
  LA2:  'las',
  NA1:  'na',
  NA:   'na', // Could also be NA for older accounts
  OC1:  'oce',
  TR1:	'tr',
  RU:	  'ru'
}

export default function summonerUrl(platform, summonerName) {
  let urlSummonerName = summonerName.replace(/ /g, '+')
  if (platform === 'KR') {
    return 'http://op.gg/summoner/userName=' + urlSummonerName
  }

  return 'http://' + platformIdToRegion[platform] + '.op.gg/summoner/userName=' + urlSummonerName
}