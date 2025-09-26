// controllers/productController.js
const Product = require('../Data-Base/Models/product');

// Add a product
exports.addProduct = async (req, res) => {
  try {
    let body = req.body;
    let name = body.name;
    let price = body.price;
    let features = body.specification;
    let description = body.description;
    let stocks = body.stocks;

    if (!name){
      return res.status(400).send({
                message: "Name required",
                success: false
            });
    }

    if (!price){
      return res.status(400).send({
                message: "price required",
                success: false
            });
    }

    if (!features){
      return res.status(400).send({
                message: "features is required",
                success: false
            });
    }

    if (!description){
       return res.status(400).send({
                message: "description is required",
                success: false
            });
          }
    if (!stocks){
       return res.status(400).send({
                message: "stocks is required",
                success: false
            });
    }

    let data = {
      name: name,
      price: price,
      specification: features,
      description: description,
      stocks: stocks, 
    }
    let productData = await Product.create(data);
     return res.status(200).send({
            message : "product added successfully",
            success : true
        })
  } 
    catch (error) {
    console.log(error); 
        return res.status(400).send({
            message: error.message || 5000,
            success: false
        });
  }
};

exports.getProducts = async (req, res) => {
  try {
    let products = await Product.find();
    return res.status(200).send({
      success: true,
      productData: products
    });
  } catch (error) {
    console.log(error);
    return res.status(500).send({
      success: false,
      message: error.message || "Server Error"
    });
  }
};
// Get a single product by ID
exports.getProductById = async (req, res) => {
  try {
    let { id } = req.params;
    let product = await Product.findById(id);

    if (!product) {
      return res.status(404).send({
        success: false,
        message: "Product not found"
      });
    }

    return res.status(200).send({
      success: true,
      productData: product
    });

  } catch (error) {
    console.log(error);
    return res.status(500).send({
      success: false,
      message: error.message || "Server Error"
    });
  }
};
