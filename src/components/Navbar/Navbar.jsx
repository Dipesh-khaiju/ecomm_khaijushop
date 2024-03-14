import { FaCartArrowDown } from "react-icons/fa"
import { Link } from "react-router-dom"
import { GiHamburgerMenu } from "react-icons/gi";
import { RxCross2 } from "react-icons/rx";
import { useState } from "react";


const Navbar = ({Carter,userName}) => {
  const [show, setShow] = useState(false);
  const toogleChange =()=>{
    show === false ? setShow(true):setShow(false)
  }
  // const toogleClose =()=>{
  //   setShow(false)
  // }

  return (
    <>
      <div>
        <header className=" max-sm bg-white border-b border-gray-200 relative py-2">
          <div className="container mx-auto flex justify-between p-5 items-center">
            <div>
              <Link to="/">
                <h3 className="font-bold  text-2xl">
                  Khaiju<span className="text-[red]">Shop</span>
                </h3>
              </Link>
            </div>
            <div className="hidden md:block">
              <ul className="flex items-center text-lg justify-center font-semibold">
                <Link to="/">
                  <li className="mr-5 hover:text-gray-900 cursor-pointer">
                    Home
                  </li>
                </Link>
                <Link to="/allproducts">
                  <li className="mr-5 hover:text-gray-900 cursor-pointer">
                    All products
                  </li>
                </Link>
                <li className="mr-5 hover:text-gray-900 cursor-pointer">Men</li>
                <li className="mr-5 hover:text-gray-900 cursor-pointer">
                  Women
                </li>
                <li className="mr-5 hover:text-gray-900 cursor-pointer">
                  Kids
                </li>
              </ul>
            </div>
            {show ? (
              <div>
                <ul className="flex flex-col gap-10 text-2xl absolute top-[88px] left-0  h-screen w-full text-[white] z-10 bg-[red] text-lg justify-center items-center font-semibold">
                  <Link to="/">
                    <li className="mt-5 hover:text-gray-900 cursor-pointer">
                      Home
                    </li>
                  </Link>
                  <Link to="/allproducts">
                  <li className="mt-5 hover:text-gray-900 cursor-pointer">
                    All products
                  </li>
                  </Link>
                 
                  <li className="mt-5 hover:text-gray-900 cursor-pointer">
                    Men
                  </li>
                  <li className="mt-5 hover:text-gray-900 cursor-pointer">
                    Kids
                  </li>
                </ul>
                <button
                  onClick={toogleChange}
                  className="absolute top-[75px] z-10 right-0 text-white py-6 px-4 cursor-pointer"
                >
                  <RxCross2 size={30} />
                </button>
              </div>
            ) : (
              ""
            )}

            <div className="flex justify-center items-center gap-3">
              <Link to="/login">
                <button className=" bg-gray-100 border-0 py-1 px-3 focus:outline-none hover:bg-gray-200 rounded text-base font-semibold">
                  Login
                </button>
              </Link>
              <span>{userName}</span>
              <Link to="/cart">
                <button className="ml-4">
                  <span className="bg-red-500 rounded-full w-3 h-3 flex items-center justify-center absolute z-10 "   >{Carter.length}</span>
                  <FaCartArrowDown className="relative "size={25}  />
                </button>{" "}
              </Link>

              {show ? (
                " "
              ) : (
                <button onClick={toogleChange} className="block md:hidden">
                  <GiHamburgerMenu size={25} />
                </button>
              )}
            </div>
          </div>
        </header>
      </div>
    </>
  );
}

export default Navbar