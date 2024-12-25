import { init, id } from '@instantdb/react';

// Initialize InstantDB with API key from environment variables
const db = init({
  appId: process.env.REACT_APP_INSTANTDB_API_KEY, // Ensure this is set in .env file
});

export const useInstantDB = () => {
  /**
   * Add a new message to the database
   */
  const addMessage = async (contactId, text) => {
    try {
      console.log('Message sent:', { contactId, text });

      await db.transact(
        db.tx.messages[id()].update({
          contactId,
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

  const useMessages = (contactId) => {
    // console.log(typeof contactId , contactId)
    const query = {
      messages: {
        $: {
          where: {
            contactId: contactId, 
          },
        },
      },
    }
  
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
  
  return { addMessage, useMessages };
};
