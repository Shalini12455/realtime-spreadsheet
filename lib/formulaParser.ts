export function evaluateFormula(formula: string, cells: any) {
  if (!formula.startsWith("=")) return formula;

  const expression = formula.substring(1);

  try {
    const replaced = expression.replace(/[A-Z][0-9]+/g, (match) => {
      return cells[match] || 0;
    });

    return eval(replaced);
  } catch {
    return "ERROR";
  }
}