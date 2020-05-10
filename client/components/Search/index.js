import React, {Component} from 'react'

const SearchContainer = () => {
  let fileReader

  const handleFileRead = e => {
    const content = fileReader.result
    console.log(content)
  }

  const handleFileChosen = file => {
    fileReader = new FileReader()
    fileReader.onloadend = handleFileRead
    fileReader.readAsText(file)
  }

  return (
    <div>
      <h1>upload</h1>

      <input
        type="file"
        accept=".csv"
        onChange={e => handleFileChosen(e.target.files[0])}
      />
    </div>
  )
}

export default SearchContainer
