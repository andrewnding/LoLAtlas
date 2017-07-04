"use strict"

const regions = {
  BR:   'br1.api.riotgames.com',
  EUNE: 'eun1.api.riotgames.com',
  EUW:  'euw1.api.riotgames.com',
  JP:   'jp1.api.riotgames.com',
  KR:   'kr.api.riotgames.com',
  LAN:  'la1.api.riotgames.com',
  LAS:  'la2.api.riotgames.com',
  NA:   'na1.api.riotgames.com',
  OCE:  'oc1.api.riotgames.com',
  TR:	  'tr1.api.riotgames.com',
  RU:	  'ru.api.riotgames.com',
  PBE:  'pbe1.api.riotgames.com',
}

const platforms = {
  BR1:   'br1.api.riotgames.com',
  EUN1: 'eun1.api.riotgames.com',
  EUW1:  'euw1.api.riotgames.com',
  JP1:   'jp1.api.riotgames.com',
  KR:   'kr.api.riotgames.com',
  LA1:  'la1.api.riotgames.com',
  LA2:  'la2.api.riotgames.com',
  NA1:   'na1.api.riotgames.com',
  NA:   'na1.api.riotgames.com', // Could also be NA for older accounts
  OC1:  'oc1.api.riotgames.com',
  TR1:	  'tr1.api.riotgames.com',
  RU:	  'ru.api.riotgames.com',
  PBE1:  'pbe1.api.riotgames.com',
}

var regionalEndpoints = {
  regions, 
  platforms
};

module.exports = regionalEndpoints