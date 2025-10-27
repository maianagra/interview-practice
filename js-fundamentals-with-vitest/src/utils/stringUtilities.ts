export function truncate(str: string, maxLength: number): string {
  if (maxLength > str.length) {
    return str;
  }
  return str.slice(0, maxLength) + "...";
}

export function capitalizeWords(str: string): string {
  return str
    .split(" ")
    .map((word) => word.charAt(0).toUpperCase().concat(word.substring(1)))
    .join(" ");
}

export function camelToTitle(str: string): string {
  // Find the capitals and add a space before
  const titleCase = str
    .split("")
    .map((letter) => {
      if (letter.toUpperCase() === letter) {
        return " ".concat(letter);
      }
      return letter;
    })
    .join("");

  // Capitalise the first letter
  return titleCase.charAt(0).toUpperCase().concat(titleCase.slice(1));
}
