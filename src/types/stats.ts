/** Member totals from the Thistle Connect and Thistle Aspire sign-up forms. Totals only, never member records. */
export type NetworkStats = {
  /** Date of the latest sign-up, YYYY-MM-DD. */
  updated: string;
  /** Date of the first sign-up, YYYY-MM-DD. */
  since: string;
  members: number;
  aspiring: number;
  employers: number;
  places: number;
  providers: number;
  last30: number;
  friendShare: number;
  graduateShare: number;
  growth: { month: string; joined: number; total: number }[];
  /** Employers with 2 or more members. Smaller ones are counted but never named. */
  namedEmployers: string[];
  topPlaces: [string, number][];
  topProviders: [string, number][];
  sectors: [string, number][];
  routes: [string, number][];
};
