import React, { createContext, useContext, useState } from "react";

const translations = {
  en: {
    // Navbar
    shop: "Shop",
    demand: "Demand",
    stories: "Stories",
    contact: "Contact",
    // Hero
    hero_badge: "New Collection",
    hero_title: "Crafted for dogs,\nloved by owners.",
    hero_sub: "Premium essentials for your beloved companion — from gourmet treats to luxury accessories.",
    hero_cta: "Shop the Collection",
    hero_scroll: "Scroll to explore",
    // Shop
    our_collection: "Our Collection",
    shop_by_category: "Shop by Category",
    no_products: "No products in this category yet.",
    add_to_bag: "Add to Bag",
    // Category labels
    cat_all: "All",
    cat_accessories: "Accessories",
    cat_food: "Food",
    cat_treats: "Treats",
    cat_toys: "Toys",
    cat_beds: "Beds",
    cat_grooming: "Grooming",
    cat_health: "Health",
    cat_clothing: "Clothing",
    cat_training: "Training",
    // Row titles
    row_featured: "Featured",
    row_new_arrivals: "New Arrivals",
    row_bestsellers: "Bestsellers",
    // Demand
    demand_badge: "Community Wishlist",
    demand_title: "Shape Our Next Collection",
    demand_sub: "Vote for the products you'd love to see. When demand reaches the goal, we make it.",
    // Stories
    stories_badge: "Happy Families",
    stories_title: "Tails Worth Telling",
    // Product page
    back_to_shop: "Back to Shop",
    buy_now: "Buy Now",
    add_to_cart: "Add to Cart",
    quantity: "Quantity",
    color: "Color",
    // Checkout
    checkout: "Checkout",
    step_contact: "Contact",
    step_shipping: "Shipping",
    step_payment: "Payment",
    contact_info: "Contact Information",
    email_address: "Email address",
    phone_number: "Phone number",
    shipping_address: "Shipping Address",
    first_name: "First name",
    last_name: "Last name",
    street_address: "Street address",
    city: "City",
    zip_code: "ZIP code",
    country: "Country",
    payment_details: "Payment Details",
    name_on_card: "Name on card",
    card_number: "Card number",
    expiry_date: "Expiry date",
    continue_btn: "Continue →",
    pay_btn: "Pay",
    order_placed: "Order Placed!",
    order_thanks: "Thank you for your order. You'll receive a confirmation email at",
    order_thanks2: "shortly.",
    order_total: "Order total:",
    continue_shopping: "Continue Shopping",
    secure_payment: "Your payment details are encrypted and secure",
    // Footer
    navigate: "Navigate",
    contact_footer: "Contact",
    legal: "Legal",
    brand_tagline: "A curated sanctuary for your beloved companions. Built by pet lovers, for pet lovers.",
    privacy_policy: "Privacy Policy",
    terms: "Terms of Service",
    shipping_info: "Shipping Info",
    rights: "All rights reserved.",
    made_with: "Made with",
    for_pets: "for pets everywhere",
    // Size guide
    measurement_guide: "Measurement Guide",
    size_chart: "Size Chart (cm)",
    neck: "Neck",
    chest: "Chest",
    back: "Back",
    size_tip: "Measure your dog at the widest points. When between sizes, size up for comfort.",
    // Trust
    free_shipping: "Free Shipping",
    orders_over: "Orders over $50",
    secure_payment_badge: "Secure Payment",
    ssl: "SSL encrypted",
    easy_returns: "Easy Returns",
    return_policy: "30-day policy",
    ships_within: "Ships within 1–3 business days",
    same_day: "Order before 2pm for same-day dispatch",
    loved_by: "Premium quality, loved by 10,000+ pets",
    // Tags
    tag_new: "new",
    tag_bestseller: "bestseller",
    tag_sale: "sale",
    tag_limited: "limited",
    // Highlights
    highlight_1: "Premium quality materials",
    highlight_2: "Vet-recommended formula",
    highlight_3: "100% natural ingredients",
    highlight_4: "Satisfaction guaranteed",
    reviews: "reviews",
    // DemandCard
    coming_soon: "Coming Soon",
    want_this: "want this",
    you_wanted_this: "You wanted this!",
    waiting_for_vote: "This product is waiting for your vote!",
    of_goal: "of goal",
    notify_me: "Notify Me When Available",
  },
  ka: {
    // Navbar
    shop: "მაღაზია",
    demand: "მოთხოვნა",
    stories: "ისტორიები",
    contact: "კონტაქტი",
    // Hero
    hero_badge: "ახალი კოლექცია",
    hero_title: "შექმნილია ძაღლებისთვის,\nსაყვარელი მფლობელებისთვის.",
    hero_sub: "პრემიუმ საჭიროებები თქვენი საყვარელი მეგობრისთვის — გურმე ნამცხვრებიდან ლუქს აქსესუარებამდე.",
    hero_cta: "კოლექციის ნახვა",
    hero_scroll: "გადაახვიეთ ქვემოთ",
    // Shop
    our_collection: "ჩვენი კოლექცია",
    shop_by_category: "შეიძინეთ კატეგორიის მიხედვით",
    no_products: "ამ კატეგორიაში პროდუქტი ჯერ არ არის.",
    add_to_bag: "კალათაში დამატება",
    // Category labels
    cat_all: "ყველა",
    cat_accessories: "აქსესუარები",
    cat_food: "საკვები",
    cat_treats: "გემრიელობები",
    cat_toys: "სათამაშოები",
    cat_beds: "საწოლები",
    cat_grooming: "მოვლა",
    cat_health: "ჯანმრთელობა",
    cat_clothing: "ტანსაცმელი",
    cat_training: "ვარჯიში",
    // Row titles
    row_featured: "გამორჩეული",
    row_new_arrivals: "ახალი ჩამოსვლები",
    row_bestsellers: "ბესტსელერები",
    // Demand
    demand_badge: "საზოგადოების სურვილი",
    demand_title: "შეაქმენი ჩვენი შემდეგი კოლექცია",
    demand_sub: "მისცეთ ხმა პროდუქტებს, რომელთა ნახვა გსურთ. როდესაც მოთხოვნა მიაღწევს მიზანს, ჩვენ ვაშენებთ მას.",
    // Stories
    stories_badge: "ბედნიერი ოჯახები",
    stories_title: "ისტორიები, რომელთა მოყოლა ღირს",
    // Product page
    back_to_shop: "მაღაზიაში დაბრუნება",
    buy_now: "ახლავე ყიდვა",
    add_to_cart: "კალათაში დამატება",
    quantity: "რაოდენობა",
    color: "ფერი",
    // Checkout
    checkout: "შეძენა",
    step_contact: "კონტაქტი",
    step_shipping: "მიწოდება",
    step_payment: "გადახდა",
    contact_info: "საკონტაქტო ინფორმაცია",
    email_address: "ელ. ფოსტის მისამართი",
    phone_number: "ტელეფონის ნომერი",
    shipping_address: "მიწოდების მისამართი",
    first_name: "სახელი",
    last_name: "გვარი",
    street_address: "ქუჩის მისამართი",
    city: "ქალაქი",
    zip_code: "საფოსტო ინდექსი",
    country: "ქვეყანა",
    payment_details: "გადახდის დეტალები",
    name_on_card: "სახელი ბარათზე",
    card_number: "ბარათის ნომერი",
    expiry_date: "ვადის გასვლის თარიღი",
    continue_btn: "გაგრძელება →",
    pay_btn: "გადახდა",
    order_placed: "შეკვეთა გაფორმდა!",
    order_thanks: "გმადლობთ შეკვეთისთვის. დადასტურების ელ. ფოსტა გაიგზავნება",
    order_thanks2: "მალე.",
    order_total: "შეკვეთის ჯამი:",
    continue_shopping: "შოპინგის გაგრძელება",
    secure_payment: "თქვენი გადახდის მონაცემები დაშიფრული და უსაფრთხოა",
    // Footer
    navigate: "ნავიგაცია",
    contact_footer: "კონტაქტი",
    legal: "სამართლებრივი",
    brand_tagline: "კურირებული სამოთხე თქვენი საყვარელი მეგობრებისთვის. შექმნილია შინაური ცხოველების მოყვარულების მიერ.",
    privacy_policy: "კონფიდენციალურობის პოლიტიკა",
    terms: "მომსახურების პირობები",
    shipping_info: "მიწოდების ინფო",
    rights: "ყველა უფლება დაცულია.",
    made_with: "შექმნილია",
    for_pets: "შინაური ცხოველებისთვის",
    // Size guide
    measurement_guide: "ზომების სახელმძღვანელო",
    size_chart: "ზომების ცხრილი (სმ)",
    neck: "კისერი",
    chest: "მკერდი",
    back: "ზურგი",
    size_tip: "გაზომეთ თქვენი ძაღლი ყველაზე განიერ ადგილებში. ზომებს შორის — აირჩიეთ მეტი.",
    // Trust
    free_shipping: "უფასო მიწოდება",
    orders_over: "$50-ზე მეტი შეკვეთა",
    secure_payment_badge: "უსაფრთხო გადახდა",
    ssl: "SSL დაშიფვრა",
    easy_returns: "მარტივი დაბრუნება",
    return_policy: "30-დღიანი პოლიტიკა",
    ships_within: "მიწოდება 1–3 სამუშაო დღეში",
    same_day: "შეუკვეთეთ 14:00-მდე — მიწოდება იმავე დღეს",
    loved_by: "პრემიუმ ხარისხი, 10,000+ შინაური ცხოველს უყვარს",
    // Tags
    tag_new: "ახალი",
    tag_bestseller: "ბესტსელერი",
    tag_sale: "ფასდაკლება",
    tag_limited: "შეზღუდული",
    // Highlights
    highlight_1: "პრემიუმ ხარისხის მასალები",
    highlight_2: "ვეტერინარის რეკომენდებული",
    highlight_3: "100% ბუნებრივი ინგრედიენტები",
    highlight_4: "კმაყოფილების გარანტია",
    reviews: "შეფასება",
    // Trust overrides
    free_shipping: "უფასო მიწოდება",
    orders_over: "50₾-ზე მეტი შეკვეთა",
    secure_payment_badge: "უსაფრთხო გადახდა",
    ssl: "SSL დაშიფვრა",
    easy_returns: "მარტივი დაბრუნება",
    return_policy: "30-დღიანი პოლიტიკა",
    ships_within: "მიწოდება 1–3 სამუშაო დღეში",
    same_day: "შეუკვეთეთ 14:00-მდე — მიწოდება იმავე დღეს",
    loved_by: "პრემიუმ ხარისხი, 10,000+ შინაური ცხოველს უყვარს",
    // DemandCard
    coming_soon: "მალე",
    want_this: "მინდა",
    you_wanted_this: "მოითხოვე!",
    waiting_for_vote: "ეს პროდუქტი შენს ხმას ელოდება!",
    of_goal: "მიზნიდან",
    notify_me: "შემატყობინე",
  }
};

const LanguageContext = createContext();

export function LanguageProvider({ children }) {
  const [lang, setLang] = useState("ka");
  const t = (key) => translations[lang][key] || translations.en[key] || key;
  return (
    <LanguageContext.Provider value={{ lang, setLang, t }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  return useContext(LanguageContext);
}