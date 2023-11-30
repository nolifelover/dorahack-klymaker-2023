export default function trimAddress(address?: string) {
  if (!address) return '';
  const startSubStringLength = 5;
  const endSubStringLength = 4;
  if (address) {
    return `${address.substring(
      0,
      startSubStringLength
    )}....${address.substring(address.length - endSubStringLength)}`;
  }
}
