import { Box } from "components/box/Box"
import { Component } from "react"
import styled from "styled-components"

const Label = styled.label`
  text-align: center;
  border-radius: ${p=>p.theme.radii.normal};
  border: ${p=>p.theme.borders.none};
  background-color: ${p=>p.theme.colors.text};
  color: ${p=>p.theme.colors.accent};
  padding: ${p=>p.theme.space[3]}px;
  font-weight: ${p=>p.theme.fontWeights.body};
  font-family: ${p=>p.theme.fonts.heading};
  font-size: ${p=>p.theme.fontSizes[4]}px;
`

const FilterInput = styled.input`
  min-width: 500px;
  text-align: center;
  border-radius: ${p=>p.theme.radii.normal};
  border: ${p=>p.theme.borders.none};
  padding: ${p=>p.theme.space[4]}px;
  margin-left: ${p=>p.theme.space[4]}px; 
  font-weight: ${p=>p.theme.fontWeights.body};
  font-family: ${p=>p.theme.fonts.body};
  font-size: ${p=>p.theme.fontSizes[4]}px;
`

const ContactsItem = styled.li`
  display: flex;
  justify-content: center;
  align-items: center;
  /* text-align: center; */
  border-radius: ${p=>p.theme.radii.normal};
  border: ${p=>p.theme.borders.none};
  background-color: ${p=>p.theme.colors.accent};
  color: ${p=>p.theme.colors.text};
  padding: ${p=>p.theme.space[3]}px;
  margin-top: ${p=>p.theme.space[3]}px;
  font-weight: ${p=>p.theme.fontWeights.body};
  font-family: ${p=>p.theme.fonts.heading};
  font-size: ${p=>p.theme.fontSizes[5]}px;
`

const DeleteContactBtn = styled.button`
  text-align: center;
  border-radius: ${p=>p.theme.radii.normal};
  border: ${p=>p.theme.borders.none};
  background-color: ${p=>p.theme.colors.backgroundSecondary};
  color: ${p=>p.theme.colors.accent};
  padding: ${p=>p.theme.space[4]}px;
  margin-left: ${p=>p.theme.space[4]}px;
  font-weight: ${p=>p.theme.fontWeights.body};
  font-family: ${p=>p.theme.fonts.body};
  font-size: ${p=>p.theme.fontSizes[4]}px;
  cursor: pointer;
  transition: background-color linear 500ms,
  color linear 500ms;
  
  &:hover, &:focus {
    background-color: ${p=>p.theme.colors.text};
    color: ${p=>p.theme.colors.accent};
  }
`

export class Contacts extends Component {
  render(){
    const {contacts, filter, onClick, onChange} = this.props;
    return <Box  display= "flex" flexDirection="column" justifyContent= "space-evenly" alignItems= "center" p="0" as={"ul"}>
        <Box style={{listStyle: "none"}} display="flex" justifyContent= "center" alignItems= "center" as={"li"}>
            <Label>Find contacts by name<FilterInput placeholder="pls input name, which you want search..." name="filter" value={filter} onChange={onChange}></FilterInput></Label>
        </Box>
        {contacts.map(({id, name, number})=>{
            return <ContactsItem key={id}>{name}: {number}<DeleteContactBtn type="button" onClick={()=>onClick(id)}>Delete</DeleteContactBtn></ContactsItem>
        })}
    </Box>
  }
} 

