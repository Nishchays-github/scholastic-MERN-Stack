import React from 'react';
import useAuthStore from '../useAuthstore.js';
import Header from '../components/Header.jsx';
const CommunityPage = () => {
  const {User} =  useAuthStore();

  return (
    <>
      <Header User={User}/>
    <div className="flex justify-center items-center h-screen">
      <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-purple-600"></div>
    </div>
    </>
  );
};

export default CommunityPage;