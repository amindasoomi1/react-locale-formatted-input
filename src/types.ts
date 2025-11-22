export type PadZerosMode = boolean | "whenDecimalExists";
export type FormatOptions = {
  thousandSeparator: boolean;
  maximumFractionDigits: number | "auto";
  padZeros: PadZerosMode;
};
