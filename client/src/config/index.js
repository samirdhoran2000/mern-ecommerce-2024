export const registerFormControls = [
  {
    name: "userName",
    label: "User Name",
    placeholder: "Enter your user name",
    componentType: "input",
    type: "text",
  },
  {
    name: "email",
    label: "Email",
    placeholder: "Enter your email",
    componentType: "input",
    type: "email",
  },
  {
    name: "password",
    label: "Password",
    placeholder: "Enter your password",
    componentType: "input",
    type: "password",
  },
];

export const loginFormControls = [
  {
    name: "email",
    label: "Email",
    placeholder: "Enter your email",
    componentType: "input",
    type: "email",
  },
  {
    name: "password",
    label: "Password",
    placeholder: "Enter your password",
    componentType: "input",
    type: "password",
  },
];

export const addProductFormElements = [
  {
    label: "Title",
    name: "title",
    componentType: "input",
    type: "text",
    placeholder: "Enter product title",
  },
  {
    label: "Description",
    name: "description",
    componentType: "textarea",
    placeholder: "Enter product description",
  },
  {
    label: "Category",
    name: "category",
    componentType: "select",
    options: [
      { id: "antibiotics", label: "Antibiotics" },
      { id: "antidiabetic", label: "Antidiabetic" },
      { id: "antivirals", label: "Antivirals" },
      // { id: "accessories", label: "Accessories" },
      // { id: "footwear", label: "Footwear" },
    ],
  },
  {
    label: "Brand",
    name: "brand",
    componentType: "select",
    options: [
      { id: "sunPhara", label: "Sun Phara" },
      { id: "drReaddyLab", label: "Dr. Readdy Lab" },
      { id: "lupin", label: "Lupin" },
      { id: "cipla", label: "Cipla" },
      { id: "aurobindoPharma", label: "Aurobindo Pharma" },
      { id: "torrent", label: "Torrent" },
    ],
  },
  {
    label: "Price",
    name: "price",
    componentType: "input",
    type: "number",
    placeholder: "Enter product price",
  },
  {
    label: "Sale Price",
    name: "salePrice",
    componentType: "input",
    type: "number",
    placeholder: "Enter sale price (optional)",
  },
  {
    label: "Total Stock",
    name: "totalStock",
    componentType: "input",
    type: "number",
    placeholder: "Enter total stock",
  },
];

export const shoppingViewHeaderMenuItems = [
  {
    id: "home",
    label: "Home",
    path: "/shop/home",
  },
  {
    id: "products",
    label: "Products",
    path: "/shop/listing",
  },
  {
    id: "antibiotics",
    label: "Antibiotics",
    path: "/shop/listing",
  },
  {
    id: "antidiabetic",
    label: "Antidiabetic",
    path: "/shop/listing",
  },
  {
    id: "antivirals",
    label: "Antivirals",
    path: "/shop/listing",
  },
  // {
  //   id: "footwear",
  //   label: "Footwear",
  //   path: "/shop/listing",
  // },
  // {
  //   id: "accessories",
  //   label: "Accessories",
  //   path: "/shop/listing",
  // },
  {
    id: "search",
    label: "Search",
    path: "/shop/search",
  },
];

export const categoryOptionsMap = {
  antibiotics: "Antibiotics",
  antidiabetic: "Antidiabetic",
  antivirals: "Antivirals",
  // accessories: "Accessories",
  // footwear: "Footwear",
};

export const brandOptionsMap = {
  sunPhara: "Sun Pharmaceutical",
  drReaddyLab: "Dr. Reddy's Laboratories",
  lupin: "Lupin",
  cipla: "Cipla",
  aurobindoPharma: "Aurobindo Pharma",
  torrent: "Torrent Pharmaceuticals",
};

export const filterOptions = {
  category: [
    { id: "antibiotics", label: "Antibiotics" },
    { id: "antidiabetic", label: "Antidiabetic" },
    { id: "antivirals", label: "Antivirals" },
    // { id: "accessories", label: "Accessories" },
    // { id: "footwear", label: "Footwear" },
  ],
  brand: [
    { id: "sunPhara", label: "Sun Phara" },
    { id: "drReaddyLab", label: "Dr. Readdy Lab" },
    { id: "lupin", label: "Lupin" },
    { id: "cipla", label: "Cipla" },
    { id: "aurobindoPharma", label: "Aurobindo Pharma" },
    { id: "torrent", label: "Torrent" },
  ],
};

export const sortOptions = [
  { id: "price-lowtohigh", label: "Price: Low to High" },
  { id: "price-hightolow", label: "Price: High to Low" },
  { id: "title-atoz", label: "Title: A to Z" },
  { id: "title-ztoa", label: "Title: Z to A" },
];

export const addressFormControls = [
  {
    label: "Address",
    name: "address",
    componentType: "input",
    type: "text",
    placeholder: "Enter your address",
  },
  {
    label: "City",
    name: "city",
    componentType: "input",
    type: "text",
    placeholder: "Enter your city",
  },
  {
    label: "Pincode",
    name: "pincode",
    componentType: "input",
    type: "text",
    placeholder: "Enter your pincode",
  },
  {
    label: "Phone",
    name: "phone",
    componentType: "input",
    type: "text",
    placeholder: "Enter your phone number",
  },
  {
    label: "Notes",
    name: "notes",
    componentType: "textarea",
    placeholder: "Enter any additional notes",
  },
];
