import type { HexBinaryConverter } from "./HexBinaryConverter";

class DefaultHexBinaryConverter implements HexBinaryConverter {
  toHex(b: string): string {
    if (this.isHex(b)) {
      return b;
    }

    return parseInt(b, 2).toString(16);
  }

  toBinary(h: string): string {
    if (this.isBinary(h)) {
      return h;
    }

    return parseInt(h, 16).toString(2);
  }

  private isBinary(s: string): boolean {
    return /^[01]+$/.test(s);
  }

  private isHex(s: string): boolean {
    return /^[0-9a-fA-F]+$/.test(s);
  }
}

export default DefaultHexBinaryConverter;
