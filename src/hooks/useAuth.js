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
      console.log(user);
      localStorage.setItem('myContactId', contactId);
      localStorage.setItem('InstantDB', user.id);
      return user;
    } catch (error) {
      console.error('Error logging in:', error.message);
      throw error;
    }
  };


// yha se
const useUserCheck = (contactId) => {
  const query = {
    users: {
      $: {
        where: { contactId },
      },
    },
  };

  const { data, isLoading, error } = db.useQuery(query);

  return {
    userExists: data?.users?.length > 0,
    isLoading,
    error,
  };
};
const useLoginCheck = (contactId) => {
  const query = {
    users: {
      $: {
        where: { contactId },
      },
    },
  };

  const { data, isLoading, error } = db.useQuery(query);
  const user = data?.users?.[0];

  return { user, isLoading, error };
};

  return { signupUser, loginUser, useUserCheck, useLoginCheck };
};
