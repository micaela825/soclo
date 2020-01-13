import styled from 'styled-components'

export const Container = styled.div`
  display: block;
  margin: 10px;
`
export const PageTitle = styled.h1`
  margin-left: 200px;
  max-width: 200px;
`
export const OptionBar = styled.div`
  margin-left: calc(100vw - 500px);
`

export const MenuButton = styled.button`
  border-radius: 7px;
  background-color: mistyrose;
  padding: 7px;
  margin: 10px 5px 10px 10px;
  opacity: 0.8;
  &:hover {
    cursor: pointer;
    opacity: 1;
  }
  text-transform: uppercase;
`

export const Table = styled.div`
  display: grid;
  grid-template-columns: repeat(6, 250px);
  grid-template-rows: auto;
  justify-items: center;
  margin: 100px 150px;
`

export const Item = styled.div`
  width: 200px;
  margin: 30px 50px;
  animation: div 1s ease-in 2s 3 linear fill-mode;
  border-bottom: grey 1px;

  :hover {
    cursor: pointer;
  }
`

export const NameBody = styled.h5`
  padding: 10px;
  font-size: 22px;
  text-align: center;
  text-transform: lowercase;

  :hover {
    text-transform: uppercase;
  }
`

export const ImageBody = styled.image`
  display: flex;
  justify-content: center;

  :hover {
    opacity: 0.9;
  }
`

export const DescBody = styled.div`
  margin: 25px auto 25px 35px;
  font-family: 'Lato', sans-serif;
`

export const Buttons = styled.div`
  display: flex;
  justify-content: center;
`

export const EditButton = styled.button`
  border-radius: 15px;
  background-color: mistyrose;
  padding: 7px;
  margin: 10px 5px 10px 10px;
`

export const RemoveButton = styled.button`
  border-radius: 15px;
  background-color: mistyrose;
  padding: 7px;
  margin: 10px 10px 10px 5px;
`
