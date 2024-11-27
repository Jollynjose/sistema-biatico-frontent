export const useDownloadPDF = () => {
  const downloadPDF = (pdf: any, filename: string) => {
    const blob = new Blob([pdf], { type: 'application/pdf' });
    const link = document.createElement('a');
    link.href = window.URL.createObjectURL(blob);
    link.download = `${filename}.pdf`;
    link.click();
  };

  return { downloadPDF };
};
