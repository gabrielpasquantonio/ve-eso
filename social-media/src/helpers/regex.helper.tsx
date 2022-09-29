class RegexHelper {
  static getFirstMatch = (value: string, rgx: RegExp): string | null => {
    const matchValue = value.match(rgx);
    if (matchValue) {
      return matchValue[0];
    }
    return null;
  };
}

export default RegexHelper;
