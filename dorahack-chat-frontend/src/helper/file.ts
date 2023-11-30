export const fileToBase64 = async (file: File): Promise<string> => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = e => resolve(e.target?.result as string);
    reader.onerror = error => reject(error);
    reader.readAsDataURL(file);
  });
};

export const downloadFile = (base64: string, fileName: string) => {
  const linkSource = base64;
  const downloadLink = document.createElement('a');
  downloadLink.href = linkSource;
  downloadLink.download = fileName;
  downloadLink.click();
};
