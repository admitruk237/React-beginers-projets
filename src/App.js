import React, { useEffect, useState } from 'react';
import './index.css';
import Collection from './components/Collection';

function App() {
  const [collections, setCollections] = useState([]);

  useEffect(() => {
    fetch('https://66bf519942533c403145cc8a.mockapi.io/ColectionFotos')
      .then((res) => res.json()) // Виклик функції json()
      .then((json) => {
        setCollections(json);
      })
      .catch((err) => {
        console.warn('Error fetching collections:', err);
      });
  }, []);

  return (
    <div className="App">
      <h1>My photo collection</h1>
      <div className="top">
        <ul className="tags">
          <li className="active">All</li>
          <li>Mountains</li>
          <li>Sea</li>
          <li>Architecture</li>
          <li>Cities</li>
        </ul>
        <input className="search-input" placeholder="Search by name" />
      </div>
      <div className="content">
        <Collection
          name="Travel the world"
          images={[
            'https://images.unsplash.com/photo-1540959733332-eab4deabeeaf?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MTN8fGNpdHl8ZW58MHx8MHx8&auto=format&fit=crop&w=500&q=60',
            'https://images.unsplash.com/photo-1560840067-ddcaeb7831d2?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8NDB8fGNpdHl8ZW58MHx8MHx8&auto=format&fit=crop&w=500&q=60',
            'https://images.unsplash.com/photo-1531219572328-a0171b4448a3?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mzl8fGNpdHl8ZW58MHx8MHx8&auto=format&fit=crop&w=500&q=60',
            'https://images.unsplash.com/photo-1573108724029-4c46571d6490?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MzR8fGNpdHl8ZW58MHx8MHx8&auto=format&fit=crop&w=500&q=60',
          ]}
        />
      </div>
      <ul className="pagination">
        <li>1</li>
        <li className="active">2</li>
        <li>3</li>
      </ul>
    </div>
  );
}

export default App;
