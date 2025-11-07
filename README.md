# LocaleFormattedInput

A locale-aware formatted input component for React. Supports price, percent, and custom numeric formats with thousand separators and configurable fraction digits.

## Installation

```bash
npm install react-locale-formatted-input
# or
yarn add react-locale-formatted-input
```

## Usage

```tsx
import LocaleFormattedInput from "react-locale-formatted-input";
import { useState } from "react";

export default function Example() {
  const [price, setPrice] = useState("");
  const [percent, setPercent] = useState("");
  const [value, setValue] = useState("");

  return (
    <>
      <LocaleFormattedInput
        value={price}
        onChange={(e) => setPrice(e.target.value)}
        locale="en-US"
        format="price"
        placeholder="Price..."
      />
      <LocaleFormattedInput
        value={percent}
        onChange={(e) => setPercent(e.target.value)}
        locale="de-DE"
        format="percent"
        placeholder="Percent..."
      />
      <LocaleFormattedInput
        value={value}
        onChange={(e) => setValue(e.target.value)}
        locale="fa-IR"
        format={{
          thousandSeparator: true,
          maximumFractionDigits: 0,
        }}
        placeholder="Custom..."
      />
    </>
  );
}
```

## Format Modes

| format value  | Behavior                                     |
| ------------- | -------------------------------------------- |
| `null`        | No thousand separator, unlimited decimals    |
| `"price"`     | Thousand separator enabled, up to 2 decimals |
| `"percent"`   | No thousand separator, up to 2 decimals      |
| Custom object | Fully manual formatting                      |

### Custom Format

```ts
const formatOptions = {
  thousandSeparator: true,
  maximumFractionDigits: 4,
};

<LocaleFormattedInput format={formatOptions} />;
```

## Automatic Locale Support

Separators (`groupSeparator` / `decimalSeparator`) are derived automatically from the provided `locale`.

Examples:
| Locale | Number Format |
|--------|--------------|
| `en-US` | `1,234.56` |
| `fa-IR` | `۱٬۲۳۴٫۵۶` |
| `de-DE` | `1.234,56` |

## Props

| Prop       | Type                | Default   | Description                      |
| ---------- | ------------------- | --------- | -------------------------------- | ------ | --------------- |
| `value`    | `string`            | `""`      | Controlled input value           |
| `onChange` | `(event) => void`   | —         | Change handler                   |
| `locale`   | `string`            | `en-US`   | Defines numeral formatting style |
| `format`   | `"price"            | "percent" | FormatOptions                    | `null` | Formatting mode |
| `...props` | Any `<input>` props | —         | Passed through to `<input>`      |

## Keyboard Behavior

- Persian/Arabic digits are normalized
- Thousand separators update dynamically as the user types
- Decimal input behavior respects `maximumFractionDigits`

## License

MIT
