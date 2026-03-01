import type { HexBinaryConverter } from "./HexBinaryConverter";

class DefaultHexBinaryConverter implements HexBinaryConverter {
  hexToBinary(hex: string): string {
    return parseInt(hex, 16).toString(2);
  }

  binaryToHex(binary: string): string {
    return parseInt(binary, 2).toString(16).toUpperCase();
  }
}

export default DefaultHexBinaryConverter;
