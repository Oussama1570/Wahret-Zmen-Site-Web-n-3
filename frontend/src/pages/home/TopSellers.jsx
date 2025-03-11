import React, { useState } from "react";
import ProductCard from "../products/ProductCard";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import { useFetchAllProductsQuery } from "../../redux/features/products/productsApi";
import Selector from "../../components/Selector.jsx";

const categories = ["Choose a genre", "Kaftan", "Jebba", "Gandoura", "Safsari", "Chachia"];

const responsive = {
  superLargeDesktop: { breakpoint: { max: 4000, min: 1400 }, items: 3 },
  desktop: { breakpoint: { max: 1400, min: 1024 }, items: 3 },
  tablet: { breakpoint: { max: 1024, min: 768 }, items: 2 },
  mobile: { breakpoint: { max: 768, min: 0 }, items: 1 },
};

const TopSellers = () => {
  const [selectedCategory, setSelectedCategory] = useState("Choose a genre");
  const { data: products = [] } = useFetchAllProductsQuery();

  const filteredProducts =
    selectedCategory === "Choose a genre"
      ? products
      : products.filter((product) => product.category.toLowerCase() === selectedCategory.toLowerCase());

  return (
    <div className="py-10">
      {/* Title */}
      <h2 className="text-3xl text-gray-700 font-semibold mb-6 text-center">
        ⭐ Our Collection ⭐
      </h2>

      {/* Category Filter */}
      <div className="mb-8 flex justify-center">
        <Selector options={categories} onSelect={setSelectedCategory} label="Category" />
      </div>

      {/* Carousel */}
      {filteredProducts.length > 0 ? (
        <Carousel
          responsive={responsive}
          autoPlay={true}
          autoPlaySpeed={3000}
          infinite={true}
          containerClass="carousel-container"
          itemClass="p-4"
        >
          {filteredProducts.map((product, index) => (
            <ProductCard key={index} product={product} />
          ))}
        </Carousel>
      ) : (
        <p className="text-center text-gray-500">No products found.</p>
      )}
    </div>
  );
};

export default TopSellers;
