export function readFile(fileName: String) {
  const reader = new FileReader();
  return reader.readAsText(fileName);
}
