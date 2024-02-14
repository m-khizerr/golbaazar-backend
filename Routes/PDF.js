const express = require('express');
const router = express.Router();
const PDFDocument = require('pdfkit');

router.get('/getorder/:id', async (req, res) => {

  generateInvoicePDF(res, order);
});

const generateInvoicePDF = (res, order) => {
  const doc = new PDFDocument();

  res.setHeader('Content-Type', 'application/pdf');
  res.setHeader('Content-Disposition', `inline; filename=${order.orderId}.pdf`);

  doc.pipe(res);

  doc.fontSize(14).text(`Invoice for Order ${order.orderId}`, 50, 50);

  doc.end();
};

module.exports = router;
