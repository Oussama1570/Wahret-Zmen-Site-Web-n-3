import React, { useState } from "react";
import ProductCard from "../../src/pages/products/ProductCard.jsx";
import { useFetchAllProductsQuery } from "../redux/features/products/productsApi.js";
import SelectorsPageProducts from "../components/SelectorProductsPage.jsx";
import '../Styles/StylesProducts.css'

const categories = ["All", "Kaftan", "Jebba", "Gandoura", "Safsari", "Chachia"];

const Product = () => {
  const [selectedCategory, setSelectedCategory] = useState("All");
  const { data: products = [] } = useFetchAllProductsQuery();

  const filteredProducts =
    selectedCategory === "All"
      ? products
      : products.filter((product) => product.category.toLowerCase() === selectedCategory.toLowerCase());

  return (
    <div className="container mx-auto py-10 px-4 container-Products">
      {/* Title */}
      <h2 className="text-3xl font-semibold text-gray-800 text-center mb-6">🛍️ Our Products</h2>

      {/* Filter Section */}
      <div className="mb-8 flex justify-center">
        <SelectorsPageProducts options={categories} onSelect={setSelectedCategory} label="Category" />
      </div>

      {/* Products Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {filteredProducts.length > 0 ? (
          filteredProducts.map((product, index) => (
            <ProductCard key={index} product={product} />
          ))
        ) : (
          <p className="col-span-full text-center text-gray-500">No products found.</p>
        )}
      </div>
    </div>
  );
};

export default Product;

