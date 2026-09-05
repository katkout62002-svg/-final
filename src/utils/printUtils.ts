/**
 * Utility to reliably handle printing lessons, exams, and notes
 * even within sandboxed iframes or mobile devices.
 */

export interface PrintDocumentData {
  title: string;
  subtitle?: string;
  unitTitle?: string;
  author?: string;
  htmlContent: string;
}

export function printDocument(data: PrintDocumentData) {
  const authorName = data.author || 'مستر بحيري (#be7ery)';
  const dateStr = new Date().toLocaleDateString('ar-EG', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });

  const fullHtml = `<!DOCTYPE html>
<html lang="ar" dir="rtl">
<head>
  <meta charset="UTF-8">
  <title>${data.title} - ${authorName}</title>
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Cairo:wght@400;600;700;800;900&display=swap" rel="stylesheet">
  <style>
    * { box-sizing: border-box; }
    body {
      font-family: 'Cairo', sans-serif;
      color: #1f2937;
      background: #fff;
      margin: 0;
      padding: 24px;
      line-height: 1.7;
    }
    .print-header {
      display: flex;
      align-items: center;
      justify-content: space-between;
      border-bottom: 3px solid #1d4ed8;
      padding-bottom: 16px;
      margin-bottom: 24px;
    }
    .print-header h1 {
      margin: 0 0 4px 0;
      color: #111827;
      font-size: 24px;
      font-weight: 800;
    }
    .print-header p {
      margin: 0;
      color: #4b5563;
      font-size: 13px;
    }
    .brand-badge {
      text-align: left;
      font-family: monospace;
      font-weight: bold;
      color: #1d4ed8;
      font-size: 18px;
    }
    .lesson-section {
      margin-bottom: 20px;
      page-break-inside: avoid;
    }
    .section-title {
      background: #f3f4f6;
      border-right: 4px solid #1d4ed8;
      padding: 8px 12px;
      font-weight: 700;
      font-size: 16px;
      color: #111827;
      margin-bottom: 12px;
      border-radius: 4px;
    }
    .subsection {
      margin-bottom: 14px;
      padding-right: 8px;
    }
    .subsection h4 {
      margin: 0 0 6px 0;
      color: #1d4ed8;
      font-size: 14px;
      font-weight: 700;
    }
    .subsection p {
      margin: 0 0 6px 0;
      font-size: 13px;
      color: #374151;
    }
    .box-tip {
      background: #eff6ff;
      border: 1px solid #bfdbfe;
      border-radius: 8px;
      padding: 12px;
      margin: 12px 0;
      font-size: 12px;
      color: #1e40af;
      page-break-inside: avoid;
    }
    .terms-table {
      width: 100%;
      border-collapse: collapse;
      margin: 16px 0;
      font-size: 12px;
    }
    .terms-table th, .terms-table td {
      border: 1px solid #e5e7eb;
      padding: 8px 12px;
      text-align: right;
    }
    .terms-table th {
      background: #f9fafb;
      font-weight: 700;
      color: #111827;
    }
    .print-footer {
      margin-top: 36px;
      padding-top: 14px;
      border-top: 1px solid #e5e7eb;
      display: flex;
      justify-content: space-between;
      align-items: center;
      font-size: 11px;
      color: #6b7280;
    }
    @media print {
      body { padding: 10mm; }
      .no-print-button { display: none; }
    }
  </style>
</head>
<body>
  <div class="print-header">
    <div>
      <p style="color: #1d4ed8; font-weight: bold; margin-bottom: 4px;">${data.unitTitle || 'البرمجة والذكاء الاصطناعي - 1 ثانوي'}</p>
      <h1>${data.title}</h1>
      <p>${data.subtitle || 'مذكرات المنهج المعتمد والتدريبات التفاعلية'}</p>
    </div>
    <div class="brand-badge">
      <div style="font-size: 14px; color: #374151; font-family: 'Cairo', sans-serif;">إعداد: مستر بحيري</div>
      <div>#Be7ery</div>
    </div>
  </div>

  <div class="print-content">
    ${data.htmlContent}
  </div>

  <div class="print-footer">
    <div>جميع الحقوق محفوظة © ${dateStr} - إعداد مستر بحيري #be7ery</div>
    <div>منصة البرمجة والذكاء الاصطناعي التفاعلية</div>
  </div>

  <script>
    window.addEventListener('DOMContentLoaded', () => {
      setTimeout(() => {
        window.print();
      }, 500);
    });
  </script>
</body>
</html>`;

  // Try opening popup window first for clean printable sheet
  try {
    const printWindow = window.open('', '_blank');
    if (printWindow) {
      printWindow.document.open();
      printWindow.document.write(fullHtml);
      printWindow.document.close();
      return;
    }
  } catch (err) {
    console.warn('Popup window blocked, fallback to iframe print', err);
  }

  // Fallback: Create invisible iframe to trigger print without popup blocking
  const iframe = document.createElement('iframe');
  iframe.style.position = 'fixed';
  iframe.style.right = '0';
  iframe.style.bottom = '0';
  iframe.style.width = '0';
  iframe.style.height = '0';
  iframe.style.border = '0';
  document.body.appendChild(iframe);

  const doc = iframe.contentWindow?.document;
  if (doc) {
    doc.open();
    doc.write(fullHtml);
    doc.close();
    setTimeout(() => {
      iframe.contentWindow?.focus();
      iframe.contentWindow?.print();
      setTimeout(() => {
        document.body.removeChild(iframe);
      }, 2000);
    }, 600);
  } else {
    // Ultimate fallback
    window.print();
  }
}
