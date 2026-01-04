export interface DurationRange {
  id: string;
  start: number;
  end: number;
}

export interface RateRule {
  id: string;
  code: string;
  name: string;
  useTimeStart: string;
  useTimeEnd: string;
  source: string;
  store: string;
  priority: number;
  status: 'Active' | 'Inactive';
  durations: DurationRange[];
}

export interface CarPriceRow {
  id: string;
  storeName: string;
  carGroup: string; // "A", "B", etc.
  sippCode: string; // "CCAV", etc.
  modelName: string;
  prices: Record<string, string>; // key is duration range id, value is price
}

export enum Step {
  LIST = 'LIST',
  BASIC_SETTINGS = 'BASIC_SETTINGS',
  PRICE_SETTINGS = 'PRICE_SETTINGS',
}
