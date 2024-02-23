const Voucher = require('../Models/Voucher')
const Store = require('../Models/Store');

const addVoucher = async (req, res) => {
    try {
      const {voucherName, code, percentage, state} = req.body;
      const voucher = new Voucher({
        voucherName: voucherName,
        code: code,
        percentage: percentage,
        state: state,
      })
      if (state === "public") {
        try {
            const savedVoucher = await voucher.save();
            res.status(200).json(savedVoucher);
        } catch (error) {
            res.status(500).json({ error: 'Internal server error' });
        }
        } else {
            const ownerId = req.body.owner;
            console.log(ownerId);
            const ownerStore = await Store.findOne({ owner: ownerId });

            if (!ownerStore) {
                return res.status(404).json({ error: 'Seller or Store not found' });
            }
        
            const savedVoucher = await voucher.save();
        
            ownerStore.vouchers.push(savedVoucher);
        
            Promise.all([ownerStore.save()])
                .then(() => {
                    res.status(201).json({
                        message: 'Voucher Created Successfully',
                        createdVoucher: savedVoucher,
                    });
                })
                .catch((saveError) => {
                    console.error('Error saving store or Voucher:', saveError);
                    res.status(500).json({ error: 'Internal server error' });
                });
        }    
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Internal server error' });
    }
  };
  
  const getAllVouchers = async (req, res) => {
    try {
      const vouchers = await Voucher.find(); 
      res.status(200).json({
        message: "Vouchers retrieved successfully",
        vouchers: vouchers,
      });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Internal server error' });
    }
  };


const deleteVoucher = async (req, res) => {
  const voucherId = req.params.voucherId;
  console.log(voucherId);
  try {
    const deletedVoucher = await Voucher.findByIdAndDelete(voucherId)
    if (!deletedVoucher) {
      return res.status(404).json({ message: 'voucher not found' });
    }
    res.status(200).json({
      message: 'voucher deleted successfully',
      deletedVoucher,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

module.exports = {addVoucher, deleteVoucher, getAllVouchers}