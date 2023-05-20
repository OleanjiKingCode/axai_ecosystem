export const extractArrayFromText = (text: string) => {
  const startIndex = text.indexOf("[");
  const endIndex = text.lastIndexOf("]");
  const arrayText = text.substring(startIndex, endIndex + 1);
  const parsedArray = JSON.stringify(arrayText.toString());
  return parsedArray;
};
