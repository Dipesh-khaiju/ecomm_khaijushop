import { useEffect, useState } from "react";
import axios from "axios";
import jeans from "../../assets/jeans.jpg";
import { FaSearch } from "react-icons/fa";
import toast from "react-hot-toast";
import { Link } from "react-router-dom";

const AllProducts = ({ AddToCart }) => {
  const [allCategory, setAllCategory] = useState([]);
  const [products, setProducts] = useState([]);
  const [selectCategory, setSelectCategory] = useState("");
  const [allProducts, setAllProducts] = useState([]);
  const [originalProducts, setOriginalProducts] = useState([]); // Store original products
  const [showProduct, setShowProduct] = useState(false);
  const [searchItem, setSearchItem] = useState("");

  //    for all product  categories
  useEffect(() => {
    const getAllProducts = async () => {
      try {
        const result = await axios("https://dummyjson.com/products/categories");
        const cosmeticsCategories = result.data.filter((category) =>
          [
            "fragrances",
            "skincare",
            "mens-watches",
            "womens-watches",
            "womens-jewellery",
            "sunglasses",
          ].includes(category)
        );
        setAllCategory(cosmeticsCategories);
      } catch (err) {
        console.log(err);
      }
    };
    getAllProducts();
  }, []);

  //for selecting a category and showing data on page
  useEffect(() => {
    const getAllProductsCategories = async () => {
      try {
        if (selectCategory) {
          const res = await axios(
            `https://dummyjson.com/products/category/${selectCategory}`
          );

          const cosmeticsProducts = res.data.products.filter((product) =>
            [
              "fragrances",
              "skincare",
              "mens-watches",
              "womens-watches",
              "womens-jewellery",
              "sunglasses",
            ].includes(product.category)
          );

          setProducts(cosmeticsProducts);
        }
      } catch (err) {
        console.log(err);
      }
    };
    getAllProductsCategories();
  }, [selectCategory]);

  //   for showing allproducts on allproducts page
  useEffect(() => {
    const allproductsonhome = async () => {
      try {
        const res = await axios("https://dummyjson.com/products");
        // Filter only cosmetics-related products
        const cosmeticsProducts = res.data.products.filter((product) =>
          [
            "fragrances",
            "skincare",
            "mens-watches",
            "womens-watches",
            "womens-jewellery",
            "sunglasses",
          ].includes(product.category)
        );
        setAllProducts(cosmeticsProducts);
        setOriginalProducts(cosmeticsProducts); // Save a copy of original products
      } catch (err) {
        console.log(err);
      }
    };
    allproductsonhome();
  }, []);

  const filterCategory = (category) => {
    setSelectCategory(category);
    if (category === "") {
      // If no category selected, show all products and reset search
      setShowProduct(false);
      setAllProducts(originalProducts);
      setSearchItem("");
    } else {
      setShowProduct(true);
    }
  };

  const handleSearchByIcon = () => {
    if (!searchItem.trim()) {
      // If search box is empty, show all products
      setAllProducts(originalProducts);
      return;
    }
    
    const searchTerm = searchItem.toLowerCase();
    const searchProduct = originalProducts.filter((searchFilterItem) =>
      searchFilterItem.title.toLowerCase().includes(searchTerm)
    );
    
    if (searchProduct.length === 0) {
      toast.error("Items do not match your search");
      // Keep current products visible
    } else {
      setAllProducts(searchProduct);
      setShowProduct(false); // Show filtered products in all products view
      setSelectCategory(""); // Reset category filter
    }
  };

  // Add this function to handle search input changes
  const handleSearchInputChange = (e) => {
    setSearchItem(e.target.value);
    if (e.target.value === "") {
      // Reset products when search box is cleared
      setAllProducts(originalProducts);
    }
  };

  return (
    <>
      <>
        <div className="relative">
          <img
            src={jeans}
            alt=""
            className="object-cover w-full obbject-center h-[200px]"
          />
          <div className="w-full h-[200px] bg-black absolute top-0 left-0 opacity-[.4]"></div>
          <h2 className="absolute top-[40%] left-[10%] text-white font-semibold text-3xl  md:text-5xl">
            All Products
          </h2>
        </div>
        {/* Showing all the categories from api  */}

     
        <div className="text-center text-2xl flex items-center justify-center mb-3 mt-3">
          <input
            onChange={handleSearchInputChange}
            value={searchItem}
            placeholder="search-item"
            className="border-4 w-2/3 md:w-auto text-black px-4 py-2"
          />
          <FaSearch
            className="ml-4 cursor-pointer"
            size={30}
            onClick={handleSearchByIcon}
          />
        </div>
        {/* products section showing products from single categories */}
        {showProduct ? (
          <div className="flex flex-wrap justify-center mx-4 gap-5 mt-5 mb-5">
            {products.map((product, index) => (
              <div
                key={index}
                className="lg:w-1/4 md:w-1/2 p-4 w-full border rounded-xl bg-black"
              >
                <Link
                  className="block relative h-48 rounded overflow-hidden"
                  to={`/singleproduct/${product.id}`}
                >
                  <img
                    alt="ecommerce"
                    className="object-contain object-center block"
                    src={product.thumbnail}
                  />
                </Link>
                <div className="mt-4">
                  <h3 className="text-gray-500 text-xs tracking-widest title-font mb-1">
                    Brand: {product.brand}
                  </h3>
                  <h2 className="text-gray-900 title-font text-lg font-medium">
                    Name: {product.title}
                  </h2>
                  <p className="mt-1 text-white">price: Rs.{product.price}</p>
                </div>
                <button
                  className="mt-6 bg-blue-700 hover:bg-blue-900 focus:ring-4 focus:ringblue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 text-white"
                  onClick={() => AddToCart(product)}
                >
                  Add to cart
                </button>
              </div>
            ))}
          </div>
        ) : (
          <div className="flex-wrap flex gap-4 justify-center">
            {allProducts.map((AllItems) => (
              <div
                key={AllItems.id}
                className="lg:w-1/4 md:w-1/2 p-4 w-full border rounded-xl mx-4 bg-black"
              >
                <Link
                  className="block relative h-48 rounded overflow-hidden"
                  to={`/singleproduct/${AllItems.id}`}
                >
                  <img
                    alt="ecommerce"
                    className="object-cover object-center w-full h-full block"
                    src={AllItems.thumbnail}
                  />
                </Link>
                <div className="mt-4">
                  <h3 className="text-xs tracking-widest text-white title-font mb-1">
                    Brand: {AllItems.brand}
                  </h3>
                  <h2 className="title-font text-white text-lg font-medium">
                    Name: {AllItems.title}
                  </h2>
                  <p className="mt-1 text-white">price: Rs.{AllItems.price}</p>
                </div>
                <button
                  className="mt-6 bg-blue-700 hover:bg-blue-900 focus:ring-4 focus:ringblue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 text-white"
                  onClick={() => AddToCart(AllItems)}
                >
                  Add to cart
                </button>
              </div>
            ))}
          </div>
        )}
      </>
    </>
  );
};
export default AllProducts;