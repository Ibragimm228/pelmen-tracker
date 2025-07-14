
export interface PelmenEntry {
  date: string;
  count: number;
  calories: number;
}

export interface Stats {
  yesterday: { count: number; calories: number };
  week: { count: number; calories: number };
  month: { count: number; calories: number };
  year: { count: number; calories: number };
  allTime: { count: number; calories: number };
}
