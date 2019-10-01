import React, {Component} from 'react'
import {
  Header1,
  Header2,
  Header3,
  Header4,
  NavItem,
  Body,
  DarkButton,
  Col1,
  Col2,
  NameBody,
  Grid,
  DescBody,
  Buttons,
  EditButton,
  RemoveButton
} from './Search.style.css.js'

class SearchContainer extends Component {
  render() {
    return (
      <Grid>
        <Col1>
          <Header1>header 1</Header1>
          <Header2>header 2</Header2>
          <Header3>$9.47</Header3>
          <Header4>header 2</Header4>
          <NavItem>nav item</NavItem>
          <Body>
            Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum Lorem
            ipsum Lorem ipsum
          </Body>
        </Col1>
        <Col2>
          <DarkButton>submit</DarkButton>
          <NameBody>Name here</NameBody>
          <DescBody>description of item here</DescBody>
          <Buttons>update</Buttons>
          <EditButton>edit</EditButton>
          <RemoveButton>remove</RemoveButton>
        </Col2>
      </Grid>
    )
  }
}

export default SearchContainer
