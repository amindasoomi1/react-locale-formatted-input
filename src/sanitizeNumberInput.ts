import { FormatOptions } from "./types";

type Options = {
  value: string;
  locale: string;
  groupSeparator: string;
  decimalSeparator: string;
  formatOptions: FormatOptions;
};

export default function sanitizeNumberInput({
  value,
  //   locale,
  groupSeparator,
  decimalSeparator,
  formatOptions,
}: Options) {
  if (!value) return "";
  const { maximumFractionDigits } = formatOptions;
  const cleanValue = value.replace(new RegExp(`\\${groupSeparator}`, "g"), "");
  const [int, decimal = null] = cleanValue.split(decimalSeparator);
  if (decimal === null) return int;
  if (!maximumFractionDigits) return int;
  const end =
    maximumFractionDigits === "auto" ? undefined : maximumFractionDigits;
  return [int, decimal.slice(0, end)].join(".");
}
