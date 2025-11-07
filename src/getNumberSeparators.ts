import replacePersianNumbers from "./replacePersianNumber";

export default function getNumberSeparators(locale: string) {
  const nf = new Intl.NumberFormat(locale);
  const group = replacePersianNumbers(nf.format(1111)).replace(/1/g, "");
  const decimal = replacePersianNumbers(nf.format(1.1)).replace(/1/g, "");
  return {
    groupSeparator: group || "",
    decimalSeparator: decimal || "",
  };
}
