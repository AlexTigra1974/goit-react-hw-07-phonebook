import { Contact } from 'components/Contact/Contact';
import { List, Item } from './ContactList.styled';
import { useSelector } from 'react-redux';
import { selectFilteredContacts } from 'redux/selectors';

export const ContactList = () => {
  const contacts = useSelector(selectFilteredContacts);
  return (
    <List>
      {contacts.map(({ name, number, id }) => (
        <Item key={id}>
          <Contact name={name} number={number} id={id} />
        </Item>
      ))}
    </List>
  );
};
