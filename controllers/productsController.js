// بيانات المنتجات المؤقتة
let products = [
    {
        id: 1,
        name: 'لابتوب ديل',
        category: 'إلكترونيات',
        price: 2500,
        inStock: true
    },
    {
        id: 2,
        name: 'هاتف سامسونج',
        category: 'إلكترونيات',
        price: 1200,
        inStock: true
    },
    {
        id: 3,
        name: 'كتاب تعلم البرمجة',
        category: 'كتب',
        price: 50,
        inStock: false
    }
];

// الحصول على جميع المنتجات
const getAllProducts = (req, res) => {
    // دعم التصفية باستخدام query parameters
    const { category, inStock } = req.query;
    
    let filteredProducts = [...products];
    
    if (category) {
        filteredProducts = filteredProducts.filter(product => 
            product.category.toLowerCase().includes(category.toLowerCase())
        );
    }
    
    if (inStock) {
        filteredProducts = filteredProducts.filter(product => 
            product.inStock === (inStock === 'true')
        );
    }
    
    res.json({
        success: true,
        count: filteredProducts.length,
        data: filteredProducts
    });
};

// الحصول على منتج واحد بواسطة ID
const getSingleProduct = (req, res) => {
    const productId = parseInt(req.params.id);
    const product = products.find(p => p.id === productId);
    
    if (!product) {
        return res.status(404).json({
            success: false,
            message: 'المنتج غير موجود'
        });
    }
    
    res.json({
        success: true,
        data: product
    });
};
// إنشاء منتج جديد
const createProduct = (req, res) => {
    const { name, category, price, inStock } = req.body;

    // التحقق من الحقول المطلوبة
    if (!name || !category || !price) {
        return res.status(400).json({
            success: false,
            message: 'الرجاء إدخال جميع الحقول المطلوبة (name, category, price)'
        });
    }

    // إنشاء المنتج الجديد
    const newProduct = {
        id: products.length + 1,
        name,
        category,
        price: Number(price),
        inStock: inStock !== undefined ? inStock : true
    };

    products.push(newProduct);

    res.status(201).json({
        success: true,
        message: 'تم إنشاء المنتج بنجاح',
        data: newProduct
    });
};

// تحديث منتج موجود
const updateProduct = (req, res) => {
    const productId = parseInt(req.params.id);
    const { name, category, price, inStock } = req.body;

    const productIndex = products.findIndex(p => p.id === productId);

    if (productIndex === -1) {
        return res.status(404).json({
            success: false,
            message: 'المنتج غير موجود'
        });
    }

    // تحديث المنتج
    products[productIndex] = {
        ...products[productIndex],
        ...(name && { name }),
        ...(category && { category }),
        ...(price && { price: Number(price) }),
        ...(inStock !== undefined && { inStock })
    };

    res.json({
        success: true,
        message: 'تم تحديث المنتج بنجاح',
        data: products[productIndex]
    });
};

// حذف منتج
const deleteProduct = (req, res) => {
    const productId = parseInt(req.params.id);
    const productIndex = products.findIndex(p => p.id === productId);

    if (productIndex === -1) {
        return res.status(404).json({
            success: false,
            message: 'المنتج غير موجود'
        });
    }

    // حذف المنتج
    const deletedProduct = products.splice(productIndex, 1)[0];

    res.json({
        success: true,
        message: 'تم حذف المنتج بنجاح',
        data: deletedProduct
    });
};

// تصدير الدوال
module.exports = {
    getAllProducts,
    getSingleProduct,
    createProduct,
    updateProduct,
    deleteProduct
};