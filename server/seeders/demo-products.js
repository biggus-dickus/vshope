const demoProducts = [
  { name: 'Coffee Machine', price: 100, rating: 5, img: 'img1.png', createdAt: new Date(), updatedAt: new Date() },
  { name: 'Refrigerator', price: 200, rating: 4, img: 'img2.png', createdAt: new Date(), updatedAt: new Date() },
  { name: 'Microwave Oven', price: 300, rating: 3, img: 'img3.png', createdAt: new Date(), updatedAt: new Date() },
  { name: 'Blender', price: 400, rating: 2, img: 'img4.png', createdAt: new Date(), updatedAt: new Date() },
  { name: 'Toaster', price: 500, rating: 1, img: 'img5.png', createdAt: new Date(), updatedAt: new Date() },
  { name: 'Electric Kettle', price: 600, rating: 5, img: 'img6.png', createdAt: new Date(), updatedAt: new Date() },
  { name: 'Dishwasher', price: 700, rating: 4, img: 'img7.png', createdAt: new Date(), updatedAt: new Date() },
  { name: 'Washing Machine', price: 800, rating: 3, img: 'img8.png', createdAt: new Date(), updatedAt: new Date() },
  { name: 'Vacuum Cleaner', price: 900, rating: 2, img: 'img9.png', createdAt: new Date(), updatedAt: new Date() },
  { name: 'Air Conditioner', price: 1000, rating: 1, img: 'img10.png', createdAt: new Date(), updatedAt: new Date() },
]

module.exports = {
  up: (queryInterface) => queryInterface.bulkInsert('products', demoProducts),
  down: (queryInterface) => queryInterface.bulkDelete('products', null, {}),
}
