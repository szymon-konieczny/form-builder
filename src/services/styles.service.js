export const getIndentationValueInPx = (indentation, multiplier) => {
  const result = indentation * multiplier;
  return result + 'px';
};