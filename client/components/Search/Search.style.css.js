import styled from 'styled-components'

export const Header1 = styled.h1`
  font-family: 'EB Garamond', serif;
  display: block;
  position: relative;
  line-height: 40px;
  text-rendering: optimizeLegibility;
  text-align: center;
`
export const Header2 = styled.h2`
  font-family: 'EB Garamond', serif;
  display: block;
  position: relative;
  line-height: 32px;
  text-rendering: optimizeLegibility;
  text-align: center;
`

export const Header3 = styled.h3`
  font-size: 22px;
  text-align: center;
`
export const Header4 = styled.h4`
  text-align: center;
`
export const NavItem = styled.div`
  text-align: center;
  font-size: 22px;
  font-family: Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue',
    sans-serif;
  letter-spacing: 1.3px;
  color: slategrey;
`

export const Body = styled.p`
  font-family: Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue',
    sans-serif;
  font-size: 14px;
  letter-spacing: 1.1px;
  line-height: 16px;
  text-align: center;
`

export const DarkButton = styled.div`
  font-family: Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue',
    sans-serif;
  font-size: 16px;
  letter-spacing: 1.1px;
  line-height: 18px;
  text-align: center;
  text-transform: uppercase;
  background-color: fuchsia;
  border: 1px solid black;
  padding: 7px;
  &:hover {
    cursor: pointer;
  }
  max-width: 100px;
`

export const Table = styled.div`
  display: grid;
  grid-template-columns: repeat(300px, 1fr);
  grid-template-rows: auto;
  justify-items: center;
  margin: 0 150px;
`

export const ArticleContainer = styled.div`
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

export const RemoveButton = styled.button`
  border-radius: 7px;
  background-color: mistyrose;
  padding: 7px;
  margin: 10px 10px 10px 5px;
`
export const Grid = styled.div`
  display: grid;
  grid-template-columns: 400px;
  justify-content: center;
  padding: 50px;
  grid-gap: 50px;
  align-content: center;
`

export const Col1 = styled.div`
  grid-column-start: 1;
`

export const Col2 = styled.div`
  grid-column-start: 2;
`
