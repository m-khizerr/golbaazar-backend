const express = require('express');
const Order = require('../Models/Order')
const Customer = require('../Models/Customer')
const router = express.Router();
const {addOrder, editOrder, getAllOrders, getOrders, deleteOrder} = require('../Controllers/orderController');
const PDFDocument = require('pdfkit');

router.post('/addorder', addOrder);
router.post('/updateorder/:orderId', editOrder);
router.get('/getallorders', getAllOrders);
router.get('/getorders', getOrders);
router.delete('/deleteorder', deleteOrder);

const getOrderById = async (orderId) => {
    const order = await Order.findById(orderId);
    const customer = await Customer.findById(order.customer);
    const id = order.orderId
    return {
        id,
      customer: 'John Doe',
      date: new Date().toLocaleDateString(),
      // Add other order details as needed
    };
  };
  
  router.get('/:orderId/pdf', async (req, res) => {
    try {
      const orderId = req.params.orderId;
      const order = await Order.findById(orderId);
      const customer = await Customer.findById(order.customer);
  
      if (!order) {
        return res.status(404).json({ error: 'Order not found' });
      }
  
      // Create a PDF document
      const doc = new PDFDocument();
  
      // Set response headers to make the browser interpret the content as a PDF
      res.setHeader('Content-Type', 'application/pdf');
      res.setHeader('Content-Disposition', `inline; filename=order-${orderId}.pdf`);
  
      // Pipe the PDF to the response stream
      doc.pipe(res);
  
      // Add content to the PDF
      doc.fontSize(14).text(`Invoice for Order ${order.orderId}`, { align: 'center' });
      doc.moveDown();
      doc.fontSize(12).text(`Order Date: ${order.date}`, { align: 'left' });
      doc.text(`Customer: ${customer.name}`, { align: 'left' });
      doc.moveDown();
  
      // Product details
      doc.fontSize(12).text('Product Details:', { align: 'left', underline: true });
      doc.moveDown();
      
      order.products.forEach((product, index) => {
        doc.text(`${index + 1}. ${product.name} - Quantity: ${product.quantity} - Price: $${product.price}`, { align: 'left' });
      });
  
      doc.moveDown();
      doc.fontSize(12).text(`Total Price: $${order.price}`, { align: 'left', underline: true });
  
      // End the PDF document
      doc.end();
    } catch (error) {
      console.error('Error generating PDF:', error);
      res.status(500).json({ error: 'Internal server error during PDF generation' });
    }
  });
  

module.exports = router;
