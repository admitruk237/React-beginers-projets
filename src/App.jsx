import React, { useEffect, useState } from 'react';
import './index.css';

import { Users } from './components/Users';
import { Success } from './components/Success/Success';

// here is the list of users: https://reqres.in/api/users

function App() {
  const [users, setUsers] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchValue, setSearchValue] = useState('');
  const [invites, setinvites] = useState([]);
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    const getData = async () => {
      try {
        const respons = await fetch('https://reqres.in/api/users');
        const data = await respons.json();
        setUsers(data.data);
      } catch (error) {
        console.log(error);
      } finally {
        setIsLoading(false);
      }
    };
    getData();
  }, []);

  const onChangeSearchValue = (event) => {
    setSearchValue(event.target.value);
  };

  const onClickInvite = (id) => {
    if (invites.includes(id)) {
      setinvites((prev) => prev.filter((_id) => _id !== id));
    } else {
      setinvites((prev) => [...prev, id]);
    }
  };

  const onClickSendIvites = () => {
    setSuccess(true);
  };

  return (
    <div className="App">
      {success ? (
        <Success count={invites.length} />
      ) : (
        <Users
          onChangeSearchValue={onChangeSearchValue}
          searchValue={searchValue}
          isLoading={isLoading}
          items={users}
          invites={invites}
          onClickInvite={onClickInvite}
          onClickSendIvites={onClickSendIvites}
        />
      )}
    </div>
  );
}

export default App;
