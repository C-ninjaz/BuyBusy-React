/**
 * seedProducts.js
 * One-time script to populate Firestore (uses firebase-admin).
 * Steps:
 * 1. Download a service account JSON from Firebase Console -> Project Settings -> Service accounts.
 * 2. Place the file next to this script and name it serviceAccountKey.json
 * 3. Run: npm install firebase-admin
 * 4. Run: npm run seed
 */

import admin from "firebase-admin";
import fs from "fs";

const keyPath = "./serviceAccountKey.json";
if (!fs.existsSync(keyPath)) {
  console.error(
    "Missing serviceAccountKey.json. Download it from Firebase console and place it next to this script."
  );
  process.exit(1);
}

const serviceAccount = JSON.parse(fs.readFileSync(keyPath, "utf8"));
admin.initializeApp({ credential: admin.credential.cert(serviceAccount) });
const db = admin.firestore();

const sampleProducts = [
  {
    title: "Wireless Headphones",
    price: 1999,
    imageUrl: "https://m.media-amazon.com/images/I/61CGHv6kmWL._SL1500_.jpg",
    category: "Electronics",
    description: "Noise-cancelling wireless headphones with rich bass.",
  },
  {
    title: "Smartwatch Pro",
    price: 2999,
    imageUrl:
      "https://rukminim2.flixcart.com/image/480/640/xif0q/smartwatch/4/d/6/-original-imagvzaukdwhhgza.jpeg?q=90",
    category: "Electronics",
    description: "Fitness tracker with heart-rate monitoring and GPS.",
  },
  {
    title: "Leather Wallet",
    price: 599,
    imageUrl:
      "https://urbanforest.co.in/cdn/shop/files/A7402041.jpg?v=1733571068&width=800",
    category: "Accessories",
    description: "Premium leather wallet with RFID protection.",
  },
  {
    title: "Men's Running Shoes",
    price: 2499,
    imageUrl:
      "https://rukminim2.flixcart.com/image/480/640/xif0q/shoe/q/z/o/-original-imahgbrys2hbczhs.jpeg?q=90",
    category: "Footwear",
    description: "Lightweight running shoes with breathable mesh.",
  },
  {
    title: "Bluetooth Speaker",
    price: 1599,
    imageUrl:
      "https://media.wired.com/photos/683a782e13687d4580a2c63a/4:3/w_640%2Cc_limit/StormBox%25202%2520ryan%2520waniata.png",
    category: "Electronics",
    description: "Portable speaker with 10-hour battery life.",
  },
  {
    title: "Ceramic Coffee Mug",
    price: 299,
    imageUrl:
      "https://exclusivelane.com/cdn/shop/products/whispers-of-warli-handcrafted-ceramic-tea-_-coffee-mug-300-ml-microwave-safe_1_1024x.jpg?v=1642833997",
    category: "Home & Kitchen",
    description: "Stylish mug for hot and cold beverages.",
  },
  {
    title: "Gaming Keyboard",
    price: 1299,
    imageUrl:
      "https://kreo-tech.com/cdn/shop/files/KREO_HIVE_65_WHITE_PDP_-_OWN_MATERIALS.1308.png?v=1759935653",
    category: "Electronics",
    description: "RGB backlit keyboard with mechanical switches.",
  },
  {
    title: "Yoga Mat",
    price: 899,
    imageUrl:
      "https://wiselife.in/cdn/shop/files/2_6a7a9d54-66b3-49c5-b197-94c8058f9386.png?v=1753509345",
    category: "Fitness",
    description: "Non-slip, eco-friendly yoga mat for daily practice.",
  },
  {
    title: "Backpack",
    price: 1299,
    imageUrl:
      "https://icon.in/cdn/shop/files/1_ab4503f4-5a6a-4895-92d7-336366744cea.jpg?v=1735285817&width=500",
    category: "Accessories",
    description: "Durable travel backpack with multiple compartments.",
  },
  {
    title: "Desk Lamp",
    price: 799,
    imageUrl:
      "https://assets.myntassets.com/dpr_1.5,q_30,w_400,c_limit,fl_progressive/assets/images/2025/AUGUST/9/pOsyiiMt_cbb3719c7e1e4225883e362334b090f1.jpg",
    category: "Home & Kitchen",
    description: "Adjustable LED desk lamp with brightness control.",
  },
];

async function seed() {
  console.log("🌱 Seeding sample products...");
  const productsRef = db.collection("products");
  for (const product of sampleProducts) {
    await productsRef.add({
      ...product,
      createdAt: admin.firestore.FieldValue.serverTimestamp(),
    });
    console.log("✅ Added:", product.title);
  }
  console.log("✅ Seeding complete.");
  process.exit(0);
}

seed().catch((err) => {
  console.error("❌ Seeding failed:", err);
  process.exit(1);
});
