import type { HexBinaryConverter } from "./HexBinaryConverter";

class DefaultHexBinaryConverter implements HexBinaryConverter {
  toBinary(s: string): string {
    if (this.isBinary(s)) return s;
    if (this.isDecimal(s)) return parseInt(s, 10).toString(2);

    return s
      .toUpperCase()
      .split("")
      .map((ch) => parseInt(ch, 16).toString(2).padStart(4, "0"))
      .join("");
  }

  toHex(s: string): string {
    if (this.isBinary(s)) {
      const padded = s.padStart(Math.ceil(s.length / 4) * 4, "0");
      return padded
        .match(/.{4}/g)!
        .map((nibble) => parseInt(nibble, 2).toString(16).toUpperCase())
        .join("");
    }
    if (this.isDecimal(s)) return parseInt(s, 10).toString(16).toUpperCase();
    return s.toUpperCase();
  }

  toDecimal(s: string): string {
    if (this.isBinary(s)) return parseInt(s, 2).toString(10);
    if (this.isDecimal(s)) return s;
    return parseInt(s, 16).toString(10);
  }

  private isBinary(str: string): boolean {
    return /^[01]+$/.test(str);
  }

  private isDecimal(str: string): boolean {
    return /^[0-9]+$/.test(str);
  }
}

export default DefaultHexBinaryConverter;
