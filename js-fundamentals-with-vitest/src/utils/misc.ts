export function groupBy<T>(array: T[], key: keyof T): Record<string, T[]> {
  return array.reduce((acc, item) => {
    const groupKey = String(item[key]);
    acc[groupKey] = acc[groupKey] || [];
    acc[groupKey].push(item);
    return acc;
  }, {} as Record<string, T[]>);
}

export function flattenArray(arr: any[]): any[] {
  return arr.reduce(
    (flat, item) =>
      Array.isArray(item) ? flat.concat(flattenArray(item)) : flat.concat(item),
    []
  );
}

function pluck(array: any[], key: string): any[] {
  return array.map(item => item[key]);
}

function sortBy(array: any[], key: string, order: "asc" | "desc" = "asc"): any[] {
  return [...array].sort((a, b) => 
    order === "asc" ? a[key] - b[key] : b[key] - a[key]
  );
}

function mergeObjects(obj1: Record<string, any>, obj2: Record<string, any>) {
  return { ...obj1, ...obj2 };
}

function deepClone(obj: any): any {
  return JSON.parse(JSON.stringify(obj));
}