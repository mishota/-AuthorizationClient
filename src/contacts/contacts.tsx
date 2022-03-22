import React from 'react';
import { useState } from "react";
import Contact from './contact';

export type ContactType = {
   name: string,
   email: string,
   phone: string,
}
const initialContacts: ContactType[] = [
   {
      name: "Misha", email: "misha@mail.ru", phone: "+797700000000",
   },
   {
      name: "Anna", email: "anna@mail.ru", phone: "+797711111111",
   },
   {
      name: "Ksu", email: "ksu@mail.ru", phone: "+79772222222",
   },
];

function Contacts() {
   const [contacts, setContacts] = useState(initialContacts);

   return (
      <React.Fragment>
         {contacts.map((contact, index) => <Contact key={index} contact={contact} />)}
      </React.Fragment>
   );
}

export default Contacts;