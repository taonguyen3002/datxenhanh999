import { contact } from "./constant.js";
const takeIP = async () => {
  try {
    const response = await fetch("https://api.ipify.org?format=json");
    const data = await response.json();
    return data.ip;
  } catch (error) {
    console.error("Error fetching IP:", error);
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
  const telegramApiUrl = `https://api.telegram.org/bot${contact.tokenTelegram}/sendMessage?chat_id=${contact.idTelegram}`;

  try {
    await fetch(telegramApiUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        chat_id: contact.idTelegram,
        text: message,
      }),
    });
    console.log("Message sent successfully");
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

export const handleClickButton = async (nameClick) => {
  const pathName = window.location.href;
  const userIP = await takeIP();

  const message = `Người dùng đã click\nIP: ${userIP} \nĐã nhấn vào: ${nameClick} \n URICLICK:\n${pathName}\n `;
  await sendMessageToTelegram(message);
};

// Xử lý khi người dùng submit form
export const handleSubmit = async function () {
  const address1 = document.getElementById("address1");
  const address2 = document.getElementById("address2");
  const fullname = document.getElementById("fullname");
  const numberphone = document.getElementById("numberphone");
  const timebook = document.getElementById("timebook");
  const drive = document.getElementById("drive");
  if (!address1.value) {
    showPopup("Vui lòng nhập Địa Chỉ Đón!");
    return;
  }
  if (!address2.value) {
    showPopup("Vui lòng nhập Địa Chỉ Đến!");
    return false;
  }
  if (!numberphone.value) {
    showPopup("Vui lòng nhập Số Điện Thoại!");
    return false;
  }
  if (!drive.value) {
    showPopup("Vui lòng nhập Chọn Dịch Vụ!");
    return false;
  }

  // Kiểm tra định dạng số điện thoại (chỉ cho phép số và ít nhất 10 chữ số)
  const phonePattern = /^[0-9]{10,}$/;
  if (!phonePattern.test(numberphone.value)) {
    showPopup("Số điện thoại không hợp lệ, vui lòng nhập ít nhất 10 chữ số.");
    return false;
  }
  const userIP = await takeIP();

  // Dữ liệu gửi đi qua Telegram
  const message = `Người dùng đã đặt hàng\nTên Người Đặt: ${fullname.value}\nĐịa Chỉ đón: ${address1.value}\nĐịa Chỉ Đến: ${address2.value}\nLoại xe: ${drive.value}\nThời gian đi: ${timebook.value}\nSố điện thoại: ${numberphone.value}\nUserIP: ${userIP}`;

  await sendMessageToTelegram(message);
  setTimeout(() => {
    address1.value = "";
    address2.value = "";
    fullname.value = "";
    numberphone.value = "";
    timebook.value = "";
    drive.value = "";
  }, 3000);
  showPopup("Bạn đã đặt chuyến đi thành công ! Vui lòng đợi ít phút");
};
export function showPopup(message) {
  document.getElementById("popup-message").textContent = message;
  document.getElementById("popup").style.display = "flex";
}

// Đóng popup khi nhấn vào dấu x
document.getElementById("popup-close").addEventListener("click", function () {
  document.getElementById("popup").style.display = "none";
});
// hide popup
setTimeout(() => {
  document.getElementById("popup-message").textContent =
    "Để Đặt Xe Nhanh Bạn Có Thể Đặt Xe Trực Tiếp Qua Tổng Đài Viên";
  document.getElementById("popup").style.display = "flex";
}, 5000);
// Google script
(function () {
  const trackingID = contact.gID; // Thay đổi nếu cần
  if (!trackingID) return; // Nếu không có ID, thoát khỏi hàm

  // Tạo thẻ script đầu tiên (gtag.js)
  const gtagScript = document.createElement("script");
  gtagScript.async = true;
  gtagScript.src = `https://www.googletagmanager.com/gtag/js?id=${trackingID}`;

  // Tạo thẻ script thứ hai (cấu hình gtag)
  const inlineScript = document.createElement("script");
  inlineScript.textContent = `
    window.dataLayer = window.dataLayer || [];
    function gtag(){dataLayer.push(arguments);}
    gtag('js', new Date());
    gtag('config', '${trackingID}');
  `;
  // Tạo thẻ script tracking click
  const trackingGtag = document.createElement("script");
  trackingGtag.textContent = `function gtag_report_conversion(url) {
  var callback = function () {
    if (typeof(url) != 'undefined') {
      window.location = url;
    }
  };
  gtag('event', 'conversion', {
      'send_to': '${trackingID}/az6aCLKpgbMaEKCD7dU9',
      'event_callback': callback
  });
  return false;
}`;

  // Chèn cả hai script vào thẻ <head>
  document.head.appendChild(gtagScript);
  document.head.appendChild(inlineScript);
  document.head.appendChild(trackingGtag);
})();
