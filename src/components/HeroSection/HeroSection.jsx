import homeimg from "../../assets/galleryimg/hand.jpg";

const HeroSection = () => {
  return (
    <div className="relative">
      <div>
        <img
          src={homeimg}
          alt="Shop hero image"
          className="w-full h-[400px] md:h-[850px] object-cover object-center"
        />
      </div>
      <div className="absolute top-[25%] left-[55%]">
        <h1 className="text-3xl font-bold text-[red] sm:text-3xl md:text-4xl xl:text-5xl">
          Shop Here With Us!
        </h1>
        <p className="text-[15px] text-[black] sm:text-black lg:text-2xl hover:text-fuchsia-500 mt-2 lg:mt-5 font-semibold">
          {" "}
          Shop Our Latest Arrival & Fullfill your Wish.
        </p>
      </div>
    </div>
  );
};

export default HeroSection;
