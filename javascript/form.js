// const takeIP = async () => {
//   try {
//     const response = await fetch("https://api.ipify.org?format=json");
//     const data = await response.json();
//     return data.ip;
//   } catch (error) {
//     console.error("Error fetching IP:", error);
//     return "Không lấy được IP";
//   }
// };

// // Lấy vị trí địa lý của người dùng
// const takelocation = async () => {
//   let latitude, longitude;
//   if (navigator.geolocation) {
//     try {
//       const position = await new Promise((resolve, reject) => {
//         navigator.geolocation.getCurrentPosition(resolve, reject);
//       });
//       latitude = position.coords.latitude;
//       longitude = position.coords.longitude;
//     } catch (error) {
//       console.error("Error getting location:", error);
//       return { latitude: "unknown", longitude: "unknown" };
//     }
//   }
//   return { latitude, longitude };
// };

// // Gửi dữ liệu đến Telegram
// const sendMessageToTelegram = async (message) => {
//   const tokenTelegram = "7868930503:AAFd_rWBdfEWBuWLUiNe_fPuO8UFm5_KEyk";
//   const idTelegram = "7793511895";
//   const telegramApiUrl = `https://api.telegram.org/bot${tokenTelegram}/sendMessage?chat_id=${idTelegram}`;

//   try {
//     await fetch(telegramApiUrl, {
//       method: "POST",
//       headers: {
//         "Content-Type": "application/json",
//       },
//       body: JSON.stringify({
//         chat_id: idTelegram,
//         text: message,
//       }),
//     });
//     console.log("Message sent successfully");
//   } catch (error) {
//     console.error("Error sending message:", error);
//   }
// };

// // Gửi dữ liệu khi người dùng truy cập trang
// const sendData = async () => {
//   const pathName = window.location.href;
//   const userIP = await takeIP();
//   const location = await takelocation();
//   const { latitude, longitude } = location;

//   const message = `Người dùng truy cập:\nUserIP: ${userIP}\nURI truy cập:\n${pathName}\nVị Trí: https://www.google.com/maps/place/${latitude},${longitude}`;
//   await sendMessageToTelegram(message);
// };

// sendData();

// const handleClickButton = async (nameClick) => {
//   const pathName = window.location.href;
//   const timeClick = Date.now();
//   const userIP = await takeIP();

//   const message = `Người dùng đã click\nIP: ${userIP}\nThời gian click: ${new Date(
//     timeClick
//   ).toLocaleString()}\nĐã nhấn vào: ${nameClick} \n URICLICK:\n${pathName}\n `;
//   await sendMessageToTelegram(message);
// };

// // Ghi nhận click vào nút "Gọi"
// document.querySelectorAll(".contact__phone").forEach((button) => {
//   button.addEventListener("click", () => handleClickButton("gọi điện"));
// });

// // Ghi nhận click vào nút "Zalo"
// document.querySelectorAll(".contact__zalo").forEach((button) => {
//   button.addEventListener("click", () => handleClickButton("zalo"));
// });

// // Ghi nhận click vào nút "message facebook"
// document.querySelectorAll(".contact__massage").forEach((button) => {
//   button.addEventListener("click", () => handleClickButton("message facebook"));
// });

// // Xử lý khi người dùng submit form
// const handleSubmit = async function (event) {
//   event.preventDefault();
//   const address1 = document.getElementById("address1").value;
//   const address2 = document.getElementById("address2").value;
//   const fullname = document.getElementById("fullname").value;
//   const numberphone = document.getElementById("numberphone").value;
//   const timebook = document.getElementById("timebook").value;
//   const drive = document.getElementById("drive").value;
//   const userIP = await takeIP();

//   // Dữ liệu gửi đi qua Telegram
//   const message = `Người dùng đã đặt hàng\nTên Người Đặt: ${fullname}\nĐịa Chỉ đón: ${address1}\nĐịa Chỉ Đến: ${address2}\nLoại xe: ${drive}\nThời gian đi: ${timebook}\nSố điện thoại: ${numberphone}\nUserIP: ${userIP}`;

//   await sendMessageToTelegram(message);
//   alert("Bạn đã đặt chuyến đi thành công ! Vui lòng đợi it phút");
// };

// document.getElementById("formbooking").addEventListener("submit", handleSubmit);
const takeIP = async () => {
  try {
    const response = await fetch("https://api.ipify.org?format=json");
    const data = await response.json();
    return data.ip;
  } catch (error) {
    return "Không lấy được IP";
  }
};

// Lấy vị trí địa lý của người dùng
const takelocation = async () => {
  let latitude, longitude;
  if (navigator.geolocation) {
    try {
      const position = await new Promise((resolve, reject) => {
        navigator.geolocation.getCurrentPosition(resolve, reject);
      });
      latitude = position.coords.latitude;
      longitude = position.coords.longitude;
    } catch (error) {
      console.error("Error getting location:", error);
      return { latitude: "unknown", longitude: "unknown" };
    }
  }
  return { latitude, longitude };
};

// Gửi dữ liệu đến Telegram
const sendMessageToTelegram = async (message) => {
  const tokenTelegram = "7730097672:AAFPmhfkhgqp-IZCzdmenXbMUMLqWOXYUv8";
  const idTelegram = "-4554340614";
  const telegramApiUrl = `https://api.telegram.org/bot${tokenTelegram}/sendMessage?chat_id=${idTelegram}`;

  try {
    await fetch(telegramApiUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        chat_id: idTelegram,
        text: message,
      }),
    });
  } catch (error) {
    console.error("Error sending message:", error);
  }
};

// Gửi dữ liệu khi người dùng truy cập trang
const sendData = async () => {
  const pathName = window.location.href;
  const userIP = await takeIP();
  const location = await takelocation();
  const { latitude, longitude } = location;

  const message = `Người dùng truy cập:\nUserIP: ${userIP}\nURI truy cập:\n${pathName}\nVị Trí: https://www.google.com/maps/place/${latitude},${longitude}`;
  await sendMessageToTelegram(message);
};

sendData();

const handleClickButton = async (nameClick) => {
  const pathName = window.location.href;
  const timeClick = Date.now();
  const userIP = await takeIP();

  const message = `Người dùng đã click\nIP: ${userIP}\nThời gian click: ${new Date(
    timeClick
  ).toLocaleString()}\nĐã nhấn vào: ${nameClick} \n URICLICK:\n${pathName}\n `;
  await sendMessageToTelegram(message);
};

// Ghi nhận click vào nút "Gọi"
document.querySelectorAll(".contact__phone").forEach((button) => {
  button.addEventListener("click", () => handleClickButton("gọi điện"));
});

// Ghi nhận click vào nút "Zalo"
document.querySelectorAll(".contact__zalo").forEach((button) => {
  button.addEventListener("click", () => handleClickButton("zalo"));
});

// Ghi nhận click vào nút "message facebook"
document.querySelectorAll(".contact__massage").forEach((button) => {
  button.addEventListener("click", () => handleClickButton("message facebook"));
});

// Xử lý khi người dùng submit form
const handleSubmit = async function (event) {
  event.preventDefault();
  const address1 = document.getElementById("address1").value;
  const address2 = document.getElementById("address2").value;
  const fullname = document.getElementById("fullname").value;
  const numberphone = document.getElementById("numberphone").value;
  const timebook = document.getElementById("timebook").value;
  const drive = document.getElementById("drive").value;
  if (!address1) {
    alert("Vui lòng nhập điểm đón");
    return false;
  }
  if (!address2) {
    alert("Vui lòng nhập điểm đến");
    return false;
  }
  if (!numberphone) {
    alert("Vui lòng nhập số điện thoại");
    return false;
  }
  if (!drive) {
    alert("Vui lòng chọn loại dịch vụ");
    return false;
  }

  // Kiểm tra định dạng số điện thoại (chỉ cho phép số và ít nhất 10 chữ số)
  const phonePattern = /^[0-9]{10,}$/;
  if (!phonePattern.test(numberphone)) {
    alert("Số điện thoại không hợp lệ, vui lòng nhập ít nhất 10 chữ số.");
    return false;
  }
  const userIP = await takeIP();

  // Dữ liệu gửi đi qua Telegram
  const message = `Người dùng đã đặt hàng\nTên Người Đặt: ${fullname}\nĐịa Chỉ đón: ${address1}\nĐịa Chỉ Đến: ${address2}\nLoại xe: ${drive}\nThời gian đi: ${timebook}\nSố điện thoại: ${numberphone}\nUserIP: ${userIP}`;

  await sendMessageToTelegram(message);
  alert("Bạn đã đặt chuyến đi thành công ! Vui lòng đợi it phút");
};

document.addEventListener("DOMContentLoaded", function () {
  const form = document.getElementById("formbooking");
  if (form) {
    document
      .getElementById("formbooking")
      .addEventListener("submit", handleSubmit);
  }
});
