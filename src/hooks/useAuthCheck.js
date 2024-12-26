import { init } from '@instantdb/react';

const db = init({
  appId: process.env.REACT_APP_INSTANTDB_API_KEY,
});

export const useAuthCheck =(contactId) =>{
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
     return {useLoginCheck, useUserCheck}
}
