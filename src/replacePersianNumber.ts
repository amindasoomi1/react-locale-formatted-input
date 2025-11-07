export default function replacePersianNumbers(str: string) {
  if (!str) return "";
  const persianNumbers = [
    /۰/g,
    /۱/g,
    /۲/g,
    /۳/g,
    /۴/g,
    /۵/g,
    /۶/g,
    /۷/g,
    /۸/g,
    /۹/g,
  ];
  const arabicNumbers = [
    /٠/g,
    /١/g,
    /٢/g,
    /٣/g,
    /٤/g,
    /٥/g,
    /٦/g,
    /٧/g,
    /٨/g,
    /٩/g,
  ];
  for (let i = 0; i < 10; i++) {
    const persianNumber = persianNumbers[i];
    const arabicNumber = arabicNumbers[i];
    const number = `${i}`;
    str = str.replace(persianNumber, number).replace(arabicNumber, number);
  }
  return str;
}
