'use strict'

const db = require('../server/db')
const {User, Closet, Outfit} = require('../server/db/models')

async function seed() {
  await db.sync({force: true})
  console.log('db synced!')

  const users = await Promise.all([
    User.create({
      name: 'cody',
      email: 'cody@email.com',
      password: '123'
    }),
    User.create({
      name: 'murphy',
      email: 'murphy@email.com',
      password: '123'
    })
  ])

  const outfits = await Promise.all([
    Outfit.create({
      userId: 1,
      dressName: 'Hot Pink Scoopneck Dress',
      dressId: 2,
      dressImageURL:
        'http://res.cloudinary.com/micaelascloud/image/upload/v1589312680/jutui1mtgvw6uymtdv8n.jpg'
    }),
    Outfit.create({
      topName: 'Joie Colorblock Short Sleeve',
      topImageURL:
        'http://res.cloudinary.com/micaelascloud/image/upload/v1589311274/mtsnlcisdgrwz9tjrpol.png',
      topId: 1,
      bottomName: 'White Skinny Jeans',
      bottomImageURL:
        'http://res.cloudinary.com/micaelascloud/image/upload/v1589299603/qekfsynsynh1nlbjkpwb.png',
      bottomId: 2,
      userId: 1
    })
  ])

  const closets = await Promise.all([
    Closet.create({
      imageURL:
        'http://res.cloudinary.com/micaelascloud/image/upload/v1589311444/qhyj0bcgnaxqpinwlecb.png',
      name: 'Velvet sleeveless top',
      userId: 1,
      wearCount: 2,
      cost: 50.99,
      category: 'top',
      latestWear: Date.now()
    }),
    Closet.create({
      imageURL:
        'http://res.cloudinary.com/micaelascloud/image/upload/v1589299529/rlnmtzdtyhzceaqwohga.png',
      name: 'Black Floral Blouse',
      userId: 1,
      wearCount: 7,
      cost: 35,
      category: 'top',
      brand: 'Zara',
      latestWear: Date.now()
    }),
    Closet.create({
      imageURL:
        'http://res.cloudinary.com/micaelascloud/image/upload/v1589311155/rxp8z2uc2bnw1y96s2do.png',
      name: 'Animal print top',
      userId: 1,
      wearCount: 2,
      cost: 20,
      category: 'top',
      brand: 'Anthropologie',
      latestWear: Date.now()
    }),
    Closet.create({
      imageURL:
        'http://res.cloudinary.com/micaelascloud/image/upload/v1589311274/mtsnlcisdgrwz9tjrpol.png',
      name: 'Joie Colorblock Short Sleeve',
      userId: 1,
      wearCount: 3,
      cost: 50,
      category: 'top',
      brand: 'Joie'
    }),

    Closet.create({
      imageURL:
        'http://res.cloudinary.com/micaelascloud/image/upload/v1589299603/qekfsynsynh1nlbjkpwb.png',
      name: 'White Skinny Jeans',
      category: 'bottom',
      userId: 1,
      wearCount: 3,
      cost: 70,
      brand: 'Madewell'
    }),
    Closet.create({
      imageURL:
        'http://res.cloudinary.com/micaelascloud/image/upload/v1589311859/zvarrouuaho9kiq8deli.png',
      name: 'JCrew periwinkle pants',
      userId: 1,
      wearCount: 3,
      category: 'bottom',
      cost: 70,
      brand: 'J.Crew'
    }),
    Closet.create({
      imageURL:
        'http://res.cloudinary.com/micaelascloud/image/upload/v1589311945/ii2vgwmbshls9lqkruoy.png',
      name: 'Grey Tuxedo Pants',
      userId: 1,
      wearCount: 3,
      category: 'bottom',
      cost: 70,
      brand: 'Zara'
    }),

    Closet.create({
      imageURL:
        'http://res.cloudinary.com/micaelascloud/image/upload/v1589299632/pgcu4tklltog2kl2sytr.png',
      name: 'Pink pattern moccassins',
      userId: 1,
      wearCount: 3,
      category: 'shoes',
      cost: 70,
      brand: 'J.Crew'
    }),
    Closet.create({
      imageURL:
        'http://res.cloudinary.com/micaelascloud/image/upload/v1589312196/pkhk504jlsllohttfav8.png',
      name: 'Beige criss cross sandals',
      userId: 1,
      wearCount: 19,
      category: 'shoes',
      cost: 40,
      brand: 'Aldo'
    }),
    Closet.create({
      imageURL:
        'http://res.cloudinary.com/micaelascloud/image/upload/v1589299682/wq72juvhjlrtjxpqnjwk.png',
      name: 'Long Grey Wool Coat',
      userId: 1,
      wearCount: 59,
      category: 'outerwear',
      cost: 40,
      brand: 'Cos'
    }),
    Closet.create({
      imageURL:
        'http://res.cloudinary.com/micaelascloud/image/upload/v1589312388/qspzc8pmwcrw54irymda.png',
      name: 'White Blazer',
      userId: 1,
      wearCount: 14,
      category: 'outerwear',
      cost: 90,
      brand: 'Parker'
    }),
    Closet.create({
      imageURL:
        'http://res.cloudinary.com/micaelascloud/image/upload/v1589299682/wq72juvhjlrtjxpqnjwk.png',
      name: 'Long Grey Wool Coat',
      userId: 1,
      wearCount: 59,
      category: 'outerwear',
      cost: 40,
      brand: 'Cos'
    }),

    Closet.create({
      imageURL:
        'http://res.cloudinary.com/micaelascloud/image/upload/v1589312547/q5zpuvfdmq7dumuh59ep.jpg',
      name: 'Green Sequin Dress',
      userId: 1,
      wearCount: 2,
      category: 'dress',
      cost: 120,
      brand: 'Bagdley Mischka'
    }),
    Closet.create({
      imageURL:
        'http://res.cloudinary.com/micaelascloud/image/upload/v1589312680/jutui1mtgvw6uymtdv8n.jpg',
      name: 'Hot Pink Scoopneck Dress',
      userId: 1,
      wearCount: 4,
      category: 'dress',
      cost: 40,
      brand: 'Asos'
    })
  ])

  console.log(
    `seeded ${users.length} users, ${closets.length} items and ${
      outfits.length
    } outfits `
  )
  console.log(`seeded successfully`)
}

// We've separated the `seed` function from the `runSeed` function.
// This way we can isolate the error handling and exit trapping.
// The `seed` function is concerned only with modifying the database.
async function runSeed() {
  console.log('seeding...')
  try {
    await seed()
  } catch (err) {
    console.error(err)
    process.exitCode = 1
  } finally {
    console.log('closing db connection')
    await db.close()
    console.log('db connection closed')
  }
}

// Execute the `seed` function, IF we ran this module directly (`node seed`).
// `Async` functions always return a promise, so we can use `catch` to handle
// any errors that might occur inside of `seed`.
if (module === require.main) {
  runSeed()
}

// we export the seed function for testing purposes (see `./seed.spec.js`)
module.exports = seed
