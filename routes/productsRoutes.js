const express = require('express');
const router = express.Router();
const {
    getAllProducts,
    getSingleProduct,
    createProduct,
    updateProduct,
    deleteProduct
} = require('../controllers/productsController');

// GET /api/products - الحصول على جميع المنتجات
router.get('/', getAllProducts);

// GET /api/products/:id - الحصول على منتج واحد
router.get('/:id', getSingleProduct);

// POST /api/products - إنشاء منتج جديد
router.post('/', createProduct);

// PUT /api/products/:id - تحديث منتج
router.put('/:id', updateProduct);

// DELETE /api/products/:id - حذف منتج
router.delete('/:id', deleteProduct);

module.exports = router;