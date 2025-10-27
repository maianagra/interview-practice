export function findMissingIds(ids: number[]): number[] {
  const missingIds: number[] = [];
  
  for (let i = 0; i < ids.length - 1; i++) {
    if (ids[i] + 1 !== ids[i + 1]) {
      const difference = ids[i + 1] - ids[i];
      for (let j = 1; j < difference; j++) {
        missingIds.push(ids[i] + j);
      }
    }
  }

  return missingIds;
}
