import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';
import moment from 'moment';
import 'moment/locale/he';

moment.locale('he');

/**
 * Generates a downloadable PDF confirmation for an order with full Hebrew support
 * @param {Object} orderData - Order information (id, fromDate, toDate, totalPrice, deliveryPrice, userName, notes)
 * @param {Array} products - Array of products in the order
 * @param {Object} user - User information (name, address, phoneNumber1, phoneNumber2, email)
 */
export const generateOrderPDF = async (orderData, products, user) => {
  try {
    // Create a hidden div to render the PDF content
    const pdfContent = document.createElement('div');
    pdfContent.style.position = 'absolute';
    pdfContent.style.left = '-10000px';
    pdfContent.style.width = '800px';
    pdfContent.style.backgroundColor = 'white';
    pdfContent.style.padding = '40px';
    pdfContent.style.fontFamily = 'Arial, sans-serif';
    pdfContent.style.direction = 'rtl';
    pdfContent.style.textAlign = 'right';

    const productsTotal = products?.reduce((sum, p) => sum + (p.price || 0), 0) || 0;
    const fromTime = moment(orderData.fromDate).format('HH:mm');
    const toTime = moment(orderData.toDate).format('HH:mm');
    const fromDateFormatted = moment(orderData.fromDate).format('DD/MM/YYYY');

    pdfContent.innerHTML = `
      <div style="font-family: Arial, sans-serif; direction: rtl; text-align: right; padding: 20px;">
        <h1 style="color: #0054EE; text-align: center; margin-bottom: 30px; font-size: 32px;">אישור הזמנה</h1>
        
        <div style="margin-bottom: 20px; border-bottom: 2px solid #0054EE; padding-bottom: 15px;">
          <p style="margin: 8px 0; font-size: 14px;"><strong>מספר הזמנה:</strong> ${orderData.id}</p>
          <p style="margin: 8px 0; font-size: 14px;"><strong>תאריך:</strong> ${moment().format('DD/MM/YYYY')}</p>
        </div>

        <h2 style="color: #0054EE; font-size: 18px; margin: 20px 0 15px 0;">פרטי לקוח</h2>
        <p style="margin: 6px 0; font-size: 13px;"><strong>שם:</strong> ${user?.name || ''}</p>
        <p style="margin: 6px 0; font-size: 13px;"><strong>כתובת:</strong> ${user?.address || ''}</p>
        <p style="margin: 6px 0; font-size: 13px;"><strong>טלפון:</strong> ${user?.phoneNumber1 || ''}</p>
        <p style="margin: 6px 0; font-size: 13px;"><strong>דוא"ל:</strong> ${user?.email || ''}</p>

        <h2 style="color: #0054EE; font-size: 18px; margin: 20px 0 15px 0;">מוצרים</h2>
        <table style="width: 100%; border-collapse: collapse; margin-bottom: 20px;">
          <thead>
            <tr style="background-color: #F2F7FF; border-bottom: 2px solid #0054EE;">
              <th style="padding: 10px; text-align: right; font-size: 13px; font-weight: bold;">שם המוצר</th>
              <th style="padding: 10px; text-align: center; font-size: 13px; font-weight: bold;">מחיר</th>
              <th style="padding: 10px; text-align: center; font-size: 13px; font-weight: bold;">כמות</th>
            </tr>
          </thead>
          <tbody>
            ${products && products.length > 0 ? products.map((product) => `
              <tr style="border-bottom: 1px solid #EEEEEE;">
                <td style="padding: 8px; text-align: right; font-size: 13px;">${product.name || ''}</td>
                <td style="padding: 8px; text-align: center; font-size: 13px;">${product.price || 0}</td>
                <td style="padding: 8px; text-align: center; font-size: 13px;">1</td>
              </tr>
            `).join('') : '<tr><td colspan="3" style="padding: 10px; text-align: center;">אין מוצרים</td></tr>'}
          </tbody>
        </table>

        <h2 style="color: #0054EE; font-size: 18px; margin: 20px 0 15px 0;">שעות ההזמנה</h2>
        <p style="margin: 8px 0; font-size: 13px;"><strong>שעה:</strong> מ ${fromTime} עד ${toTime}</p>
        <p style="margin: 8px 0; font-size: 13px;"><strong>תאריך:</strong> ${fromDateFormatted}</p>

        <div style="background-color: #F2F7FF; border: 2px solid #0054EE; border-radius: 8px; padding: 20px; margin: 20px 0;">
          <p style="margin: 10px 0; font-size: 14px;"><strong>סה"כ מוצרים:</strong> <span style="float: left;">${productsTotal}</span></p>
          <p style="margin: 10px 0; font-size: 14px;"><strong>דמי משלוח:</strong> <span style="float: left;">${orderData.deliveryPrice || 0}</span></p>
          <p style="margin: 10px 0; font-size: 16px; font-weight: bold; border-top: 1px solid #0054EE; padding-top: 10px;">
            <strong>סה"כ לתשלום:</strong> 
            <span style="float: left; color: #0054EE; font-size: 18px;">${orderData.totalPrice || 0}</span>
          </p>
        </div>

        ${orderData.notes && orderData.notes.trim() !== '' ? `
          <h2 style="color: #0054EE; font-size: 18px; margin: 20px 0 15px 0;">הערות</h2>
          <p style="margin: 8px 0; font-size: 13px; white-space: pre-wrap;">${orderData.notes}</p>
        ` : ''}

        <p style="margin-top: 30px; text-align: center; font-size: 12px; color: #999;">תודה על הזמנתך!</p>
      </div>
    `;

    document.body.appendChild(pdfContent);

    // Convert HTML to canvas
    const canvas = await html2canvas(pdfContent, {
      allowTaint: true,
      useCORS: true,
      scale: 2,
      backgroundColor: '#FFFFFF'
    });

    const imgData = canvas.toDataURL('image/png');
    const pdf = new jsPDF({
      orientation: 'p',
      unit: 'mm',
      format: 'a4',
    });

    const imgWidth = 210; // A4 width in mm
    const imgHeight = (canvas.height * imgWidth) / canvas.width;

    pdf.addImage(imgData, 'PNG', 0, 0, imgWidth, imgHeight);

    // Save PDF with required filename pattern: `orde_<orderId>.pdf`
    const fileName = `orde_${orderData.id}.pdf`;
    pdf.save(fileName);
  } catch (error) {
    console.error('Error generating PDF:', error);
    alert('שגיאה בייצור אישור. נסה שוב.');
  }
};

export default generateOrderPDF;
