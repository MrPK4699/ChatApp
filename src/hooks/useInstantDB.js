import { init, id } from '@instantdb/react';

// Initialize InstantDB with API key from environment variables
const db = init({
  appId: process.env.REACT_APP_INSTANTDB_API_KEY
});

export const useInstantDB = () => {
  /**
   * Add a new message to the database
   */

  // const myId = JSON.parse(localStorage.getItem('myContactId'))  // No need to parse t should be in string format
  const myId = localStorage.getItem('myContactId')
  const InstantDB=localStorage.getItem('InstantDB')

  const addMessage = async (contactId, text) => {
    try {
      console.log('Message sent:', { contactId, text });

      await db.transact(
        db.tx.messages[id()].update({
          senderId: myId,
          receiverId: contactId,
          text,
          createdAt: new Date(),
        }),
      );
    } catch (error) {
      console.error('Error adding message:', error);
    }
  };

  /**
   * Fetch messages for a specific contact
   */

  const showMessages = (contactId) => {

    const query = {
      messages: {
        $: {
          where: {
            or: [
              {
                and: [
                  { senderId: contactId },
                  { receiverId: myId },
                ],
              },
              {
                and: [
                  { senderId: myId },
                  { receiverId: contactId },
                ],
              },
            ],
          },
        },
      },
    };


    // console.log('Query:', query);

    const { isLoading, error, data } = db.useQuery(query);

    if (error) {
      console.error('Error fetching messages:', error);
      console.error('Query that caused error:', query);
    }

    const sortedMessages = (data?.messages || []).sort(
      (a, b) => new Date(a.createdAt) - new Date(b.createdAt),
    );

    
    return { isLoading, error, messages: sortedMessages };
  };

  
  const showContacts = () => {

    const query = {
      users: {
        $: { where: { contactId : myId } },
      },
    };

    const { isLoading, error, data } = db.useQuery(query);

    console.log(db.useQuery(query));

    if (error) {
      console.error('Error fetching messages:', error);
      console.error('Query that caused error:', query);
    }

    const user = data?.users?.[0];
    // console.log('data of ',myId, data);
    // if (!user) throw new Error('Contacts not found');
    
    return { isLoading, error, contactList: user?.contactList||[] };
  };


  const addContact = async (contactId, name, contactList) => {
    try {
      // Step 1: Append the new contact to the existing list
      const currentContacts = contactList || [];
      const updatedContacts = [...currentContacts, {contactId, name}];
      // console.log('updatedContacts',updatedContacts)

      await db.transact(
        db.tx.users[InstantDB].update({
          contactList: updatedContacts,
        }),
      );
      console.log('Contact added:', { contactId, name });
    } catch (error) {
      console.error('Error adding contact:', error);
    }
  };
  

  const deleteContact = async (contactId) => {
    try {
      await db.transact(
        db.tx.users[id(myId)].update({
          $remove: {
            contactList: [{ id: contactId }],
          },
        }),
      );
      console.log('Contact deleted:', contactId);
    } catch (error) {
      console.error('Error deleting contact:', error);
    }
  };

  return { addMessage, showMessages, addContact, showContacts, deleteContact };
};
