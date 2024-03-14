import coatguy from "../../assets/coatguy.jpg"
import jeans from "../../assets/jeans.jpg"

const HeroSection = () => {
  return (
    <div className="relative">
        <div>
            <img src={coatguy} alt="" className="w-full object-cover object-top  md:h-[850px]  object-center" />
        </div>
        <div className="absolute top-[30%] left-[55%]">
            <h1 className="text-3xl font-bold text-[red] sm:text-3xl md:text-4xl xl:text-5xl">Shop Here With Us!</h1>
            <p className="text-[15px] text-[#1d4ed8] sm:text-blue-300 lg:text-2xl mt-2 lg:mt-5 font-semibold"> Shop Our Latest Arrival & Unleash your Style
            </p>
        </div>
    </div>
  )
}

export default HeroSection