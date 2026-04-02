export interface Hero {
  name: string;
  heroid: string;
  img: string;
  roles: Role[];
  lanes: Lane[];
  specialties: Specialty[];
  "damage-type": DamageType;
}

export const ROLES = [
  "Support",
  "Fighter",
  "Assassin",
  "Marksman",
  "Mage",
  "Tank",
] as const;
export type Role = (typeof ROLES)[number];

export const LANES = ["Roaming", "EXP", "Jungle", "Gold", "Mid"] as const;
export type Lane = (typeof LANES)[number];

export const SPECIALTIES = [
  "Crowd Control",
  "Support",
  "Charge",
  "Burst",
  "Finisher",
  "Damage",
  "Physical",
  "Regen",
  "Chase",
  "Magic Damage",
  "Guard",
  "Initiator",
  "Poke",
  "Control",
  "Push",
] as const;

export type Specialty = (typeof SPECIALTIES)[number];

export const DAMAGE_TYPES = ["Physical", "Magic"] as const;
export type DamageType = (typeof DAMAGE_TYPES)[number];

export interface BattleSpell {
  name: string;
  img: string;
}

export interface EmblemTalent {
  name: string;
  img: string;
}

export interface StandardEmblemTalentSection {
  "tier-one": EmblemTalent[];
  "tier-two": EmblemTalent[];
}

export interface EmblemSet {
  main: EmblemTalent;
  "standard-talents": StandardEmblemTalentSection;
  "core-talents": EmblemTalent[];
}

export interface FinalEmblemSet {
  main: EmblemTalent;
  tierOne: EmblemTalent;
  tierTwo: EmblemTalent;
  core: EmblemTalent;
}

export const ITEM_CATEGORIES = [
  "Defense",
  "Movement",
  "Physical Attack",
  "Magic",
  "Neutral",
] as const;

export type ItemCategory = (typeof ITEM_CATEGORIES)[number];

export interface Item {
  name: string;
  img: string;
  category: ItemCategory;
}
