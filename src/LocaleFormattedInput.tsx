"use client";
import {
  ChangeEvent,
  ComponentProps,
  ForwardedRef,
  forwardRef,
  useMemo,
} from "react";
import formatNumberForLocale from "./formatNumberForLocale";
import getNumberSeparators from "./getNumberSeparators";
import replaceNonDigits from "./replaceNonDigits";
import replacePersianNumbers from "./replacePersianNumber";
import sanitizeNumberInput from "./sanitizeNumberInput";
import { FormatOptions } from "./types";

type BaseProps = {
  value?: string;
  locale?: string;
  format?: null | "price" | "percent" | FormatOptions;
  type?: never;
};
type Props = BaseProps & Omit<ComponentProps<"input">, keyof BaseProps>;

function LocaleFormattedInput(
  { value, onChange, locale = "en-US", format = null, ...props }: Props,
  ref: ForwardedRef<HTMLInputElement>
) {
  const { groupSeparator, decimalSeparator } = useMemo(() => {
    return getNumberSeparators(locale);
  }, [locale]);

  const formatOptions: FormatOptions = useMemo(() => {
    if (!format)
      return { thousandSeparator: false, maximumFractionDigits: "auto" };
    if (format === "percent")
      return { thousandSeparator: false, maximumFractionDigits: 2 };
    if (format === "price")
      return { thousandSeparator: true, maximumFractionDigits: 2 };
    return format;
  }, [format]);

  const formattedValue = useMemo(() => {
    const result = formatNumberForLocale({
      value: replaceNonDigits(replacePersianNumbers(value ?? "")),
      locale,
      groupSeparator,
      decimalSeparator,
      formatOptions,
    });
    return replacePersianNumbers(result);
  }, [value, locale, groupSeparator, decimalSeparator, formatOptions]);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const value = replaceNonDigits(replacePersianNumbers(e.target.value));
    const sanitizedValue = sanitizeNumberInput({
      value,
      locale,
      groupSeparator,
      decimalSeparator,
      formatOptions,
    });
    const cleanValue = replaceNonDigits(replacePersianNumbers(sanitizedValue));
    onChange?.({
      ...e,
      target: { ...e.target, value: cleanValue },
      currentTarget: { ...e.currentTarget, value: cleanValue },
    });
  };

  return (
    <input
      ref={ref}
      type="text"
      value={formattedValue}
      onChange={handleChange}
      inputMode="decimal"
      {...props}
    />
  );
}

export default forwardRef<HTMLInputElement, Props>(LocaleFormattedInput);
