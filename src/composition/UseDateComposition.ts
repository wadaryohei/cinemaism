
// ================================
// Type
// ================================
export type DateComposition = {
  splitDates: (dates: string | undefined) => string | undefined;
}

// ================================
// Composition
// ================================
export const UseDateComposition = (): DateComposition => {
  /**
   * 日付けをyyyyだけに切り出して返す
   */
  function splitDates (dates: string | undefined): string | undefined {
    if (dates !== undefined) {
      return dates.slice(0, 4)
    }
  }
  return { splitDates }
}
