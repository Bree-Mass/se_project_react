import { v4 as uuidv4 } from "uuid";

// LOCATION
const location = { latitude: 32.912163, longitude: -96.131226 };

// API CALL

const apiCall = `https://api.openweathermap.org/data/2.5/weather?lat=${location.latitude}&lon=${location.longitude}&units=imperial&appid=25749e9bb20cf0f2ab39f77a6519c5e4`;

// DEFAULT CLOTHES

const defaultClothingItems = [
  {
    _id: uuidv4(),
    name: "Cap",
    weatherType: "hot",
    link: "https://m.media-amazon.com/images/I/618ZohQzZIL._AC_UY1000_.jpg",
  },
  {
    _id: uuidv4(),
    name: "Hoodie",
    weatherType: "warm",
    link: "https://nb.scene7.com/is/image/NB/mt41543ag_nb_70_i?$dw_detail_main_lg$&bgc=f1f1f1&layer=1&bgcolor=f1f1f1&blendMode=mult&scale=10&wid=1600&hei=1600",
  },
  {
    _id: uuidv4(),
    name: "Jacket",
    weatherType: "cold",
    link: "https://cdni.llbean.net/is/image/wim/520163_699_41?hei=1095&wid=950&resMode=sharp2&defaultImage=llbprod/520163_699_41",
  },
  {
    _id: uuidv4(),
    name: "Sneakers",
    weatherType: "warm",
    link: "https://www.golausa.com/images/gola-classics-womens-elan-sneakers-p2819-17499_zoom.jpg",
  },
  {
    _id: uuidv4(),
    name: "T-Shirt",
    weatherType: "hot",
    link: "https://prd.cc.duluthtrading.com/dw/image/v2/BBNM_PRD/on/demandware.static/-/Sites-dtc-master-catalog/default/dw13c50eee/images/large/76020_EBR.jpg?sw=980",
  },
  {
    _id: uuidv4(),
    name: "Coat",
    weatherType: "cold",
    link: "https://www.travelandleisure.com/thmb/yAF8wIkzMPB_G0TwzpKFuz2dP0o=/fit-in/1500x1000/filters:no_upscale():max_bytes(150000):strip_icc()/llbean-womens-classic-lambswool-peacoat-def77d5c96884c74a496d45e0525b195.jpg",
  },
  {
    _id: uuidv4(),
    name: "Sandals",
    weatherType: "hot",
    link: "https://target.scene7.com/is/image/Target/GUEST_aa0c51f4-73b9-4820-88e2-532fca1ac2ab?wid=488&hei=488&fmt=pjpeg",
  },
  {
    _id: uuidv4(),
    name: "Runners",
    weatherType: "hot",
    link: "https://m.media-amazon.com/images/I/71f0is8i4BL._AC_UY900_.jpg",
  },
  {
    _id: uuidv4(),
    name: "Boots",
    weatherType: "cold",
    link: "https://www.sheepskinshop.com/cdn/shop/products/4KB_1_kids_sheepskin_boot.jpg?v=1620159729",
  },
  {
    _id: uuidv4(),
    name: "Skirt",
    weatherType: "hot",
    link: "https://i.etsystatic.com/5609612/r/il/52409f/3949231926/il_570xN.3949231926_b4fn.jpg",
  },
  {
    _id: uuidv4(),
    name: "Shorts",
    weatherType: "hot",
    link: "https://scene7.zumiez.com/is/image/zumiez/product_main_medium/Nike-Sportswear-Essentials-Black-Woven-Flow-Shorts-_359922-front-US.jpg",
  },
  {
    _id: uuidv4(),
    name: "Dress",
    weatherType: "hot",
    link: "https://www.collinsdictionary.com/images/full/dress_31690953_1000.jpg",
  },
  {
    _id: uuidv4(),
    name: "Tanktop",
    weatherType: "hot",
    link: "https://cdn.shopify.com/s/files/1/0259/5448/4284/products/SKIMS-LOUNGEWEAR-AP-TNK-0038-HEG-FL.jpg?v=1621644689",
  },
  {
    _id: uuidv4(),
    name: "Button-up",
    weatherType: "hot",
    link: "https://theshirtshop.biz/cdn/shop/products/ScreenShot2022-03-23at9.30.40AM.webp?v=1661779436",
  },
  {
    _id: uuidv4(),
    name: "Long Sleeve",
    weatherType: "warm",
    link: "https://cdni.llbean.net/is/image/wim/512997_40656_41?hei=1095&wid=950&resMode=sharp2&defaultImage=llbprod/512997_40656_41",
  },
  {
    _id: uuidv4(),
    name: "Sunglasses",
    weatherType: "hot",
    link: "https://images.thdstatic.com/productImages/6bf97df0-9694-4916-9d33-297252793cc1/svn/shadedeye-safety-glasses-85901-16-64_600.jpg",
  },
  {
    _id: uuidv4(),
    name: "Wide Brim Hat",
    weatherType: "hot",
    link: "https://www.dopeheadwear.com/cdn/shop/files/FullSizeRender_1475x.jpg?v=1692065601",
  },
];

const weatherBackgrounds = [
  {
    isDay: true,
    weather: "clear",
    url: new URL("../assets/day/sunny_day.png", import.meta.url).href,
  },
  {
    isDay: true,
    weather: "clouds",
    url: new URL("../assets/day/cloudy_day.png", import.meta.url).href,
  },
  {
    isDay: true,
    weather: "rain",
    url: new URL("../assets/day/rainy_day.png", import.meta.url).href,
  },
  {
    isDay: true,
    weather: "thunderstorm",
    url: new URL("../assets/day/stormy_day.png", import.meta.url).href,
  },
  {
    isDay: true,
    weather: "snow",
    url: new URL("../assets/day/snowy_day.png", import.meta.url).href,
  },
  {
    isDay: true,
    weather: "fog",
    url: new URL("../assets/day/foggy_day.png", import.meta.url).href,
  },
  {
    isDay: false,
    weather: "clear",
    url: new URL("../assets/night/sunny_night.png", import.meta.url).href,
  },
  {
    isDay: false,
    weather: "clouds",
    url: new URL("../assets/night/cloudy_night.png", import.meta.url).href,
  },
  {
    isDay: false,
    weather: "rain",
    url: new URL("../assets/night/rainy_night.png", import.meta.url).href,
  },
  {
    isDay: false,
    weather: "thunderstorm",
    url: new URL("../assets/night/stormy_night.png", import.meta.url).href,
  },
  {
    isDay: false,
    weather: "snow",
    url: new URL("../assets/night/snowy_night.png", import.meta.url).href,
  },
  {
    isDay: false,
    weather: "fog",
    url: new URL("../assets/night/foggy_night.png", import.meta.url).href,
  },
];

const defaultWeatherBackgrounds = {
  day: {
    url: new URL("../assets/day/default_day.png", import.meta.url).href,
  },
  night: {
    url: new URL("../assets/night/default_night.png", import.meta.url).href,
  },
};

export {
  location,
  apiCall,
  defaultClothingItems,
  weatherBackgrounds,
  defaultWeatherBackgrounds,
};
