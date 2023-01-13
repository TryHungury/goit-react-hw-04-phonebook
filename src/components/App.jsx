import styled from "styled-components";
import { Component } from "react";
import { Box } from "./box/Box";
import { PhoneBook } from "./phonebook/PhoneBook";
import { Contacts } from "./contacts/Contacts";
import { nanoid } from "nanoid";

const Title = styled.h1`
  border-radius: ${p=>p.theme.radii.normal};
  background-color: ${p=>p.theme.colors.text};
  color: ${p=>p.theme.colors.accent};
  margin: ${p=>p.theme.space[0]}px auto;
  padding: ${p=>p.theme.space[2]}px;
  margin-top: ${p=>p.theme.space[3]}px;
  font-weight: ${p=>p.theme.fontWeights.bold};
  font-family: ${p=>p.theme.fonts.monospace};
`

const TitleH2 = styled.h2`
  text-align: center;
  border-radius: ${p=>p.theme.radii.normal};
  background-color: ${p=>p.theme.colors.accent};
  margin: ${p=>p.theme.space[0]}px auto;
  padding: ${p=>p.theme.space[2]}px;
  margin-top: ${p=>p.theme.space[5]}px; 
  font-weight: ${p=>p.theme.fontWeights.heading};
  font-family: ${p=>p.theme.fonts.heading};
`

const LS_PHONE_BOOK = 'phone_book';

export class App extends Component {
  state = {
    contacts: [],
    filter: '',
  }

  componentDidMount() {
    const saveContacts = JSON.parse(localStorage.getItem(LS_PHONE_BOOK));

    if (saveContacts) {
      this.setState({contacts: saveContacts})
    }

    return
  }

  componentDidUpdate(_, prevState) {
    if (prevState.contacts.length !== this.state.contacts.length) {
      localStorage.setItem(LS_PHONE_BOOK, JSON.stringify(this.state.contacts))
    }

    return
  }

  addNewContact = ({name, number}) => {
    let count = 0;

    this.state.contacts.map((contact)=>{
     if (contact.name === name) {
      return count += 1;
    }
    
    return count
    })

    if (count === 0) {
      const contact = {
        id: nanoid(),
        name,
        number,
      }
  
      this.setState((prevState)=>{
        return {
          contacts: [ contact, ...prevState.contacts ],
        }
      })

    } else {
      return alert('This contact is already in your phone book...')
    }
  }

  handleDeleteContact = (id) => {
    this.setState(prevState=>{
      return {
        contacts: prevState.contacts.filter((contact)=>contact.id !== id)
      }
    })
  }

  handleFilterContacts = (e) => {
    const filterValue = e.target.value;
    const filterName = e.target.name;

    this.setState({[filterName]: filterValue})
  }

  render() {
    const {contacts, filter} = this.state;

    const filterNormalize = filter.toLowerCase();
    const visibleContacts = contacts.filter((contact) => contact.name.toLowerCase().includes(filterNormalize))

    return (
      <Box height= "100%"  display= "flex" flexDirection="column" justifyContent= "space-evenly" alignItems= "center" fontSize= "40px" backgroundColor="backgroundSecondary">
        <Title>Ukraine Win❤️</Title>
        <Box display="flex" flexDirection="column" justifyContent= "space-evenly" alignItems= "center" as={"section"}>
          <TitleH2>Phonebook</TitleH2>
          <PhoneBook onSubmit={this.addNewContact}></PhoneBook>
        </Box>
        <Box display="flex" flexDirection="column" justifyContent= "space-evenly" alignItems= "center" as={"section"}>
          <TitleH2>Contacts</TitleH2>
          <Contacts contacts={visibleContacts} filter={filter} onChange={this.handleFilterContacts} onClick={this.handleDeleteContact}></Contacts>
        </Box>
      </Box>
    );
  }
};
