import axios from "axios";

const OrderDone = () => {
  const handleEsewaPay = async () => {
    const url = "http://localhost:3000/api/createOrder";
    const data = {
      amount: 100,
      products: [
        {
          product: "test",
          amount: 100,
          quantity: 1,
        },
      ],
    };
    try {
      const response = await axios.post(url, data, {
        headers: {
          "Content-Type": "application/json",
        },
      });
      console.log(response?.data?.formData);
      if (response.status === 200) {
        esewaCall(response?.data?.formData);
      } else {
        console.error("Failed to create order");
      }
    } catch (err) {
      console.error("Error creating order:", err);
    }
  };
  

  const esewaCall = (formData) => {
    const path = "https://epay.esewa.com.np/api/epay/main/v2/form";
    var form = document.createElement("form");
    form.setAttribute("method", "POST");
    form.setAttribute("action", path);

    for (const key in formData) {
      if (Object.hasOwnProperty.call(formData, key)) {
        var hiddenField = document.createElement("input");
        hiddenField.setAttribute("type", "hidden");
        hiddenField.setAttribute("name", key);
        hiddenField.setAttribute("value", formData[key]);
        form.appendChild(hiddenField);
      }
    }

    document.body.appendChild(form);
    form.submit();
  };

  return (
    <button
      className="bg-indigo-500 font-semibold hover:bg-indigo-600 py-3 text-sm text-white uppercase w-full"
      onClick={handleEsewaPay}
    >
      PAY WITH ESEWA
    </button>
  );
};

export default OrderDone;
