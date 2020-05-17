import React, {Component} from 'react'

import imageCompression from 'browser-image-compression'

function SearchContainer() {
  async function handleImageUpload(event) {
    const imageFile = event.target.files[0]
    console.log('originalFile instanceof Blob', imageFile instanceof Blob) // true
    console.log(`originalFile size ${imageFile.size / 1024 / 1024} MB`)

    const options = {
      maxSizeMB: 0.4,
      maxWidthOrHeight: 750,
      useWebWorker: true
    }
    try {
      const compressedFile = await imageCompression(imageFile, options)
      console.log(
        'compressedFile instanceof Blob',
        compressedFile instanceof Blob
      ) // true
      console.log(`compressedFile size ${compressedFile.size / 1024 / 1024} MB`) // smaller than maxSizeMB

      await uploadToServer(compressedFile) // write your own logic
    } catch (error) {
      console.log(error)
    }
  }
  return (
    <>
      <div>
        <input
          type="file"
          accept="image/*"
          onChange={event => handleImageUpload(event)}
        />
      </div>
    </>
  )
}

export default SearchContainer
