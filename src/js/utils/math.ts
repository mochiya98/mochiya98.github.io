import { YearContributionsData } from "../models/contributions";

export function calcContributions(data: YearContributionsData) {
  let maxContributes = 0;
  let totalContributions = 0;
  for (let weekData of data) {
    for (let dayData of weekData) {
      totalContributions += dayData.count - 0;
      const n = dayData.count - 0;
      if (maxContributes < n) maxContributes = n;
    }
  }
  return { maxContributes, totalContributions };
}
