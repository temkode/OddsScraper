export interface RacerData {
  Selection: string;
  Jockey: string;
  Trainer: string;
  Age: string;
  Weight: string;
  RP?: string;
  'Previous Odds': string[];
  Win: string;
}

export interface RaceData {
  lastUpdated: string;
  url: string;
  content: RacerData[];
}
