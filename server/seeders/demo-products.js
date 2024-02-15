const demoBrands = [
  { name: 'Apple', createdAt: new Date(), updatedAt: new Date() },
  { name: 'Dell', createdAt: new Date(), updatedAt: new Date() },
  { name: 'LG', createdAt: new Date(), updatedAt: new Date() },
  { name: 'Lenovo', createdAt: new Date(), updatedAt: new Date() },
  { name: 'Samsung', createdAt: new Date(), updatedAt: new Date() },
]

const demoCategories = [
  { name: 'Appliances', createdAt: new Date(), updatedAt: new Date() },
  { name: 'Electronics', createdAt: new Date(), updatedAt: new Date() },
  { name: 'Furniture', createdAt: new Date(), updatedAt: new Date() },
  { name: 'Sports', createdAt: new Date(), updatedAt: new Date() },
  { name: 'Watches', createdAt: new Date(), updatedAt: new Date() },
]

const demoProducts = [
  { name: 'Coffee Machine', price: 100, rating: 5, img: 'img1.png', createdAt: new Date(), updatedAt: new Date(), categoryId: 1, brandId: 3 },
  { name: 'Refrigerator', price: 200, rating: 4, img: 'img2.png', createdAt: new Date(), updatedAt: new Date(), categoryId: 1, brandId: 3 },
  { name: 'Laptop', price: 300, rating: 3, img: 'img3.png', createdAt: new Date(), updatedAt: new Date(), categoryId: 2, brandId: 4 },
  { name: 'MacBook Pro', price: 1200, rating: 5, img: 'img11.png', createdAt: new Date(), updatedAt: new Date(), categoryId: 2, brandId: 1 },
  { name: 'Smartphone', price: 400, rating: 2, img: 'img4.png', createdAt: new Date(), updatedAt: new Date(), categoryId: 2, brandId: 5 },
  { name: 'Toaster', price: 500, rating: 1, img: 'img5.png', createdAt: new Date(), updatedAt: new Date(), categoryId: 1, brandId: 3 },
  { name: 'IPS Monitor', price: 800, rating: 5, img: 'img6.png', createdAt: new Date(), updatedAt: new Date(), categoryId: 2, brandId: 2 },
  { name: 'Office Armchair', price: 600, rating: 4, img: 'img7.png', createdAt: new Date(), updatedAt: new Date(), categoryId: 3, brandId: 1 },
  { name: 'Washing Machine', price: 800, rating: 3, img: 'img8.png', createdAt: new Date(), updatedAt: new Date(), categoryId: 1, brandId: 5 },
  { name: 'Vacuum Cleaner', price: 900, rating: 2, img: 'img9.png', createdAt: new Date(), updatedAt: new Date(), categoryId: 1, brandId: 3 },
  { name: 'Smart Watch', price: 1000, rating: 1, img: 'img10.png', createdAt: new Date(), updatedAt: new Date(), categoryId: 5, brandId: 1 },
]

module.exports = {
  async up(queryInterface) {
    await Promise.all([
      queryInterface.bulkInsert('Brands', demoBrands),
      queryInterface.bulkInsert('Categories', demoCategories),
    ])
    await queryInterface.bulkInsert('Products', demoProducts)
  },

  async down(queryInterface) {
    await queryInterface.bulkDelete('Products', null, {})
    await Promise.all([
      queryInterface.bulkDelete('Brands', demoBrands),
      queryInterface.bulkDelete('Categories', demoCategories),
    ])
  },
}
