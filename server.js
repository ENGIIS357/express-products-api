const express = require('express');
const app = express();
const productsRoutes = require('./routes/productsRoutes');

// middleware لتحليل JSON
app.use(express.json());

// استخدام مسارات المنتجات
app.use('/api/products', productsRoutes);

// المسار الرئيسي
app.get('/', (req, res) => {
    res.json({ 
        message: 'مرحباً بك في واجهة برمجة تطبيقات المنتجات!',
        endpoints: {
            getAllProducts: 'GET /api/products',
            getSingleProduct: 'GET /api/products/:id',
            createProduct: 'POST /api/products',
            updateProduct: 'PUT /api/products/:id',
            deleteProduct: 'DELETE /api/products/:id'
        }
    });
});

// تشغيل الخادم
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`🚀 الخادم يعمل على http://localhost:${PORT}`);
});