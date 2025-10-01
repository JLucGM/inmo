import { useState } from 'react';
import { pdf } from '@react-pdf/renderer';
import PDF from '@/Components/PDF/PDF';

export default function PDFOpenButton({ property, setting }) {
  const [loading, setLoading] = useState(false);

  const openPdf = async () => {
    setLoading(true);
    try {
      // Generar el documento PDF como blob
      const blob = await pdf(<PDF data={property} setting={setting} />).toBlob();
      // Crear URL para el blob
      const url = URL.createObjectURL(blob);
      // Abrir en nueva pestaña
      window.open(url, '_blank');
      // Opcional: liberar URL después de un tiempo
      setTimeout(() => URL.revokeObjectURL(url), 10000);
    } catch (error) {
      console.error('Error generando PDF:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <button
      onClick={openPdf}
      disabled={loading}
      className="inline-flex items-center px-4 py-2 bg-orange-800 dark:bg-orange-500 border border-transparent rounded-full font-semibold text-xs text-white dark:text-gray-200 uppercase tracking-widest hover:bg-gray-700 dark:hover:bg-white focus:bg-gray-700 dark:focus:bg-white active:bg-gray-900 dark:active:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 dark:focus:ring-offset-gray-800 transition ease-in-out duration-150"
    >
      {loading ? 'Generando...' : 'Ver PDF'}
    </button>
  );
}
