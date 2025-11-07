import { FormatOptions } from "./types";

type Options = {
  value: string;
  locale: string;
  groupSeparator: string;
  decimalSeparator: string;
  formatOptions: FormatOptions;
};

export default function formatNumberForLocale({
  value,
  locale,
  // groupSeparator,
  decimalSeparator,
  formatOptions,
}: Options) {
  if (!value) return "";
  const { thousandSeparator, maximumFractionDigits } = formatOptions;
  const [intRaw = "", decimalRaw = null] = value.split(".");
  const int = Number(intRaw);
  if (isNaN(int)) return "";
  const intFormatted = thousandSeparator
    ? int.toLocaleString(locale)
    : int.toString();
  if (!maximumFractionDigits || decimalRaw === null) return intFormatted;
  const end =
    maximumFractionDigits === "auto" ? undefined : maximumFractionDigits;
  const decimal = decimalRaw?.slice(0, end);
  return [intFormatted, decimal].join(decimalSeparator);
}
