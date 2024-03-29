import axios from "axios";

 const OrderDone=({cart})=> {
    // calculate total
    const getTotal = ()=>{
      const anb = cart.reduce((total,cartReduceItem)=>{
        return total + cartReduceItem.price * cartReduceItem.quantity
      },0)
      return anb;
    }

  const handleEsewaPayment = async () => {
    const url = "https://khaijushop-server.onrender.com/api/createOrder";
    const data = {
      amount: getTotal()+10,
      products: [{
        product:"test",
        amount: getTotal()+10,
        quantity: 1
      }] 
    };

    try {
      const response = await axios.post(url, data);
      console.log(response?.data?.formData);
      if (response?.status === 200) {
        esewaCall(response?.data?.formData);
      } else {
        console.error("Failed to create order");
      }
    } catch (error) {
      console.log(error);
    }
  };
  const esewaCall = (formData) => {
    console.log(formData);
    const path = "https://rc-epay.esewa.com.np/api/epay/main/v2/form";
    var form = document.createElement("form");
    form.setAttribute("method", "POST");
    form.setAttribute("action", path);

    for (const key in formData) {
      var hiddenField = document.createElement("input");
      hiddenField.setAttribute("type", "hidden");
      hiddenField.setAttribute("name", key);
      hiddenField.setAttribute("value", formData[key]);
      form.appendChild(hiddenField);
    }

    document.body.appendChild(form);
    form.submit();
  }; 
  return (
    <button
    className="bg-[#60bb46] font-semibold py-3 text-sm text-white uppercase w-full flex justify-center items-center"
    onClick={handleEsewaPayment}
  >
    PAY WITH <img className="w-5 h-5 mx-1" src="https://th.bing.com/th/id/OIP.ntWij_8IZKqCcXwHeegmaQAAAA?rs=1&pid=ImgDetMain" alt="" /> SEWA
  </button>
  
  );
};

export default OrderDone;
