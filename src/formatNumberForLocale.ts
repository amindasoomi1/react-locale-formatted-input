import { FormatOptions } from "./types";

type Options = {
  value: string;
  locale: string;
  groupSeparator: string;
  decimalSeparator: string;
  formatOptions: FormatOptions;
  isFirstLoad: boolean;
};

export default function formatNumberForLocale({
  value,
  locale,
  decimalSeparator,
  formatOptions,
  isFirstLoad,
}: Options) {
  if (!value) return "";

  const { thousandSeparator, maximumFractionDigits } = formatOptions;

  const padZeros = isFirstLoad && formatOptions.padZeros;

  const [intRaw = "", decimalRaw = null] = value.split(".");
  const int = Number(intRaw);
  if (isNaN(int)) return "";

  const intFormatted = thousandSeparator
    ? int.toLocaleString(locale)
    : int.toString();

  if (!maximumFractionDigits) return intFormatted;

  const end =
    maximumFractionDigits === "auto" ? undefined : maximumFractionDigits;

  if (decimalRaw === null) {
    if (padZeros === true && typeof maximumFractionDigits === "number") {
      const zeros = "".padEnd(maximumFractionDigits, "0");
      return [intFormatted, zeros].join(decimalSeparator);
    }
    return intFormatted;
  }

  let decimal = decimalRaw.slice(0, end);

  if (
    (padZeros === "whenDecimalExists" || padZeros === true) &&
    typeof maximumFractionDigits === "number"
  ) {
    decimal = decimal.padEnd(maximumFractionDigits, "0");
  }

  return [intFormatted, decimal].join(decimalSeparator);
}
