export const BOSS_TYPE = {
    COMMON: "COMMON",
    ELITE: "ELITE",
    NORMAL: "NORMAL",
    WEEKLY: "WEEKLY"
  };
  
 export function bosstypeName(name) {
     if (name == BOSS_TYPE.COMMON) {
         return 'Common'
     } else if (name == BOSS_TYPE.ELITE) {
        return 'Anführer Boss'
     } else if (name == BOSS_TYPE.NORMAL) {
         return 'Normal'
     } else if (name == BOSS_TYPE.WEEKLY) {
         return 'Wöchentlicher Boss'
     } else {
         return 'undefined'
     }
 }

  export default class BossType {};