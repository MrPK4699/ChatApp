import { init, id } from '@instantdb/react';

const db = init({
  appId: process.env.REACT_APP_INSTANTDB_API_KEY,
});

export const useAuth = () => {
  const signupUser = async ({ contactId, name, password }, userExists) => {
    try {
      if (userExists) {
        throw new Error('User already exists');
      }

      const hashedPassword = password;

      // Add user to the `users` collection
      await db.transact(
        db.tx.users[id()].update({
          contactId,
          name,
          password: hashedPassword,
          contactList: [],
        }),
      );

      console.log('User signed up successfully!');
    } catch (error) {
      console.error('Error signing up:', error.message);
      throw error;
    }
  };

  const loginUser = async ({ contactId, password }, user) => {
      try {
        if (!user) {
          throw new Error('User not found');
        }
  
        // Verify the password
        const hashedPassword = password; // Use a secure hashing mechanism in production
        if (user.password !== hashedPassword) {
          throw new Error('Invalid credentials');
        }
  
        console.log('User logged in successfully!');
        localStorage.setItem('myContactId', contactId);
        return user;
      } catch (error) {
        console.error('Error logging in:', error.message);
        throw error;
      }
    };

  return { signupUser, loginUser };
};
