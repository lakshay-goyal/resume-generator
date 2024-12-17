declare module 'html2pdf.js' {
  interface Html2PdfOptions {
    margin?: number | [number, number, number, number];
    filename?: string;
    image?: { type: string; quality: number };
    html2canvas?: any; // Optional: Specify a library type if needed
    jsPDF?: { unit: string; format: string; orientation: string };
  }

  const html2pdf: {
    (): void;
    from: (element: HTMLElement | string) => {
      save: () => void;
      set: (options: Html2PdfOptions) => any;
    };
  };

  export default html2pdf;
}
