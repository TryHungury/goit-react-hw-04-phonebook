import styled from "styled-components";
// import { Component } from "react";
import { Box } from "./box/Box";
import { PhoneBook } from "./phonebook/PhoneBook";
import { Contacts } from "./contacts/Contacts";
import { nanoid } from "nanoid";
import { useState, useEffect, useMemo } from "react";

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

export const App = () => {
  const [contacts, setContacts] = useState(()=>{
    return JSON.parse(localStorage.getItem(LS_PHONE_BOOK)) ?? []
  })
  const [filter, setFilter] = useState("")

  useEffect(()=>{
    localStorage.setItem(LS_PHONE_BOOK, JSON.stringify(contacts))
  }, [contacts])

  const addNewContact = ({name, number}) => {
    let count = 0;

    contacts.map((contact)=>{
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
  
      setContacts([contact, ...contacts])

    } else {
      return alert('This contact is already in your phone book...')
    }
  }

  const handleDeleteContact = (id) => {
    setContacts(prev=>{
      return prev.filter((contact)=>contact.id !== id)
    })
  }

  const handleFilterContacts = (e) => {
    const filterValue = e.target.value;

    setFilter(filterValue)
  }

  const visibleContacts = useMemo(()=>{ 
      const filterNormalize = filter.toLowerCase();
      return contacts.filter((contact) => contact.name.toLowerCase().includes(filterNormalize))
    }, [contacts, filter]) 

    return (
      <Box height= "100%"  display= "flex" flexDirection="column" justifyContent= "space-evenly" alignItems= "center" fontSize= "40px" backgroundColor="backgroundSecondary">
        <Title>Ukraine Win❤️</Title>
        <Box display="flex" flexDirection="column" justifyContent= "space-evenly" alignItems= "center" as={"section"}>
          <TitleH2>Phonebook</TitleH2>
          <PhoneBook onSubmit={addNewContact}></PhoneBook>
        </Box>
        <Box display="flex" flexDirection="column" justifyContent= "space-evenly" alignItems= "center" as={"section"}>
          <TitleH2>Contacts</TitleH2>
          <Contacts contacts={visibleContacts} filter={filter} onChange={handleFilterContacts} onClick={handleDeleteContact}></Contacts>
        </Box>
      </Box>
    );
  }