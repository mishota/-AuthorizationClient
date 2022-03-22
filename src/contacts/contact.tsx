import React from 'react';
import { ContactType } from './contacts';

type ContactPropTypes = {
   contact: ContactType
}
const Contact = (props: ContactPropTypes) => {
   return <div>
      <span>
         <div>{props.contact.name}</div>
         <div>{props.contact.email}</div>
         <div>{props.contact.phone}</div>
      </span>
   </div>
}
export default Contact;
