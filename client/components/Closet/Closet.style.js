import styled from 'styled-components'

export const Table = styled.div`
  display: grid;
  grid-template-columns: repeat(300px, 1fr);
  grid-template-rows: auto;
  justify-items: center;
  margin: 0 150px;
`

export const Item = styled.div`
  width: 350px;
  margin: 30px 50px;
  animation: div 1s ease-in 2s 3 linear fill-mode;

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
