export const b64toBlob = (b64Data: string, contentType = '', sliceSize = 512) => {
  const byteCharacters = atob(b64Data);
  const byteArrays = [];

  for (let offset = 0; offset < byteCharacters.length; offset += sliceSize) {
    const slice = byteCharacters.slice(offset, offset + sliceSize);

    const byteNumbers = new Array(slice.length);
    for (let i = 0; i < slice.length; i++) {
      byteNumbers[i] = slice.charCodeAt(i);
    }

    const byteArray = new Uint8Array(byteNumbers);
    byteArrays.push(byteArray);
  }

  const blob = new Blob(byteArrays, { type: contentType });
  return blob;
};

export const rgbaStr2rgba = (rgbaStr?: string) => {
  if (!rgbaStr || typeof rgbaStr !== 'string') return null;

  // Extract RGBA values from string
  const rgbaArr = rgbaStr.match(/^rgba?\((\d+)[,\s]+(\d+)[,\s]+(\d+)(?:[,\s]*\/?[,\s]*(\d*(?:\.\d+)?))?\)$/i);
  console.log({ rgbaArr });
  if (!rgbaArr) return null;
  return {
    rgbaStr: rgbaArr[0],
    R: parseInt(rgbaArr[1], 10),
    G: parseInt(rgbaArr[2], 10),
    B: parseInt(rgbaArr[3], 10),
    A: rgbaArr[4] ? parseFloat(rgbaArr[4]) : 1,
  };
};

/**
 * @param rgbaStr rgba字符串，如 rgba(50, 150, 230, 0.6)
 * @returns
 */
export const rgba2hex = (rgbaStr?: string) => {
  if (!rgbaStr || typeof rgbaStr !== 'string') return null;

  // Extract RGBA values from string
  const rgbaArr = rgbaStr.match(/^rgba?\((\d+)[,\s]+(\d+)[,\s]+(\d+)(?:[,\s]*\/?[,\s]*(\d*(?:\.\d+)?))?\)$/i);

  if (!rgbaArr) return null;

  // Convert each RGBA value to hexadecimal
  let hex = '#';
  for (let i = 1; i <= 3; i++) {
    hex += ('0' + parseInt(rgbaArr[i], 10).toString(16)).slice(-2);
  }

  // Convert alpha value to hexadecimal
  let alpha = rgbaArr[4] ? Math.round(parseFloat(rgbaArr[4]) * 255).toString(16) : 'ff';
  if (alpha.length === 1) alpha += alpha;

  return hex + alpha;
};

export const hex2rgba = (hexStr?: string) => {
  if (!hexStr || typeof hexStr !== 'string') return null;

  const hex = hexStr.replace('#', '');

  if (hex.length !== 6 && hex.length !== 8) return null;

  const r = parseInt(hex.slice(0, 2), 16);
  const g = parseInt(hex.slice(2, 4), 16);
  const b = parseInt(hex.slice(4, 6), 16);
  const a = hex.length === 8 ? (parseInt(hex.slice(6, 8), 16) / 255).toFixed(2) : 1;

  return `rgba(${r}, ${g}, ${b}, ${a})`;
};
