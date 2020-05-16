const getRandomOutfit = state => {
  function getRandomInteger(max) {
    return Math.floor(Math.random() * Math.floor(max))
  }
  const tops = state.dresses.filter(item => item.category === 'top')
  const bottoms = state.dresses.filter(item => item.category === 'bottom')
  const shoes = state.dresses.filter(item => item.category === 'shoes')
  const dresses = state.dresses.filter(item => item.category === 'dress')

  const dressesRatio = Math.floor(
    dresses.length / (dresses.length + bottoms.length + tops.length) * 10
  )

  const randomTopInteger = getRandomInteger(tops.length)
  const randomBottomInteger = getRandomInteger(bottoms.length)
  const randomShoesInteger = getRandomInteger(shoes.length)
  const randomDressInteger = getRandomInteger(dresses.length)

  const randomTop = tops[randomTopInteger]
  const randomBottom = bottoms[randomBottomInteger]
  const randomShoes = shoes[randomShoesInteger]
  const randomDress = dresses[randomDressInteger]

  const outfitTypeGenerator = () => {
    return getRandomInteger(10) > dressesRatio
      ? {
          randomTop: randomTop,
          randomBottom: randomBottom,
          randomShoes: randomShoes
        }
      : {randomDress: randomDress, randomShoes: randomShoes}
  }
  console.log(outfitTypeGenerator(), '********')
  return outfitTypeGenerator()
}

export default getRandomOutfit
