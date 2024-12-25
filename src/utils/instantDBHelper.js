export const useInstantDB = () => {
      const saveMessage = async (contactId, message) => {
        // Logic to save the message to InstantDB
      };
    
      const getMessages = async (contactId) => {
        // Logic to retrieve messages for a contact from InstantDB
      };
    
      return { saveMessage, getMessages };
    };
    