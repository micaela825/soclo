'use strict'

const db = require('../server/db')
const {User, Closet} = require('../server/db/models')

async function seed() {
  await db.sync({force: true})
  console.log('db synced!')

  const users = await Promise.all([
    User.create({email: 'cody@email.com', password: '123'}),
    User.create({email: 'murphy@email.com', password: '123'})
  ])

  const closets = await Promise.all([
    Closet.create({
      imageURL:
        'https://www.hautelookcdn.com/resizer/868x1300/products/262139/large/10329002.jpg',
      name: 'Black dress',
      description: 'a very pretty dress!'
    }),
    Closet.create({
      imageURL:
        'https://fastly.hautelookcdn.com/products/FN04K93/large/10097318.jpg?height=350&width=228',
      name: 'Floral dress',
      description: 'Perfect for springtime'
    }),
    Closet.create({
      imageURL:
        'https://www.hautelookcdn.com/resizer/434x650/products/K0024M/large/10174444.jpg',
      name: 'Penelope scallop hem dress',
      description: 'Illusion neck, short sleeves, scallop trip'
    }),
    Closet.create({
      imageURL:
        'https://www.hautelookcdn.com/resizer/434x650/products/1735X/large/10246906.jpg',
      name: 'XSCAPE Floral Party Dress',
      description:
        'A bodice boasting geometric symmetry with a V-neck and mesh-inset cutouts at the waist tops a skirt featuring mirror-image floral patterning for a balanced dress that will skew all comments in your favor.'
    }),
    Closet.create({
      imageURL:
        'https://www.hautelookcdn.com/resizer/434x650/products/K0018M/large/10173753.jpg',
      name: 'Tyler Off-the-Shoulder Bow Front Dress',
      description:
        'Fit true to size. Sweetheart neck with bow detail. Off-the-shoulder short sleeves'
    })
  ])

  console.log(`seeded ${users.length} users and ${closets.length} dresses`)
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
