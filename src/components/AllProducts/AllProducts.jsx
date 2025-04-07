import { useEffect, useState } from "react";
import axios from "axios";
import jeans from "../../assets/jeans.jpg";
import { FaSearch } from "react-icons/fa";
import toast from "react-hot-toast";
import { Link } from "react-router-dom";

const AllProducts = ({ AddToCart }) => {
  const [allProducts, setAllProducts] = useState([]);
  const [originalProducts, setOriginalProducts] = useState([]); // Store original products
  const [searchItem, setSearchItem] = useState("");

  //   for showing allproducts on allproducts page
  useEffect(() => {
    const allproductsonhome = async () => {
      try {
        const res = await axios("http://localhost:3000/api/products");
        setAllProducts(res.data.products);
        setOriginalProducts(res.data.products); // Save a copy of original products
      } catch (err) {
        console.log(err);
      }
    };
    allproductsonhome();
  }, []);

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
      </>
    </>
  );
};
export default AllProducts;
