import React, { useEffect, useState } from 'react';
import './index.css';
import { Collection } from './components/Collection';

const cats = [
  { name: 'All' },
  { name: 'Sea' },
  { name: 'Mountines' },
  { name: 'Architecture' },
  { name: 'Cities' },
];

function App() {
  const [categoryId, setCategoryId] = useState(0);
  const [page, setPage] = useState(1);
  const [isLoading, setIsLoading] = useState(true);
  const [searchValue, setSearchValue] = useState('');
  const [collections, setCollections] = useState([]);

  useEffect(() => {
    setIsLoading(true);
    const category = categoryId ? `category=${categoryId}` : '';
    fetch(
      `https://66bf519942533c403145cc8a.mockapi.io/ColectionFotos?page=${page}&limit=3&${category}`
    )
      .then((res) => res.json()) // Виклик функції json()
      .then((json) => {
        setCollections(json);
      })
      .catch((err) => {
        console.warn('Error fetching collections:', err);
      })
      .finally(() => setIsLoading(false));
  }, [categoryId, page]);

  return (
    <div className="App">
      <h1>My photo collection</h1>
      <div className="top">
        <ul className="tags">
          {cats.map((obj, i) => (
            <li
              onClick={() => setCategoryId(i)}
              className={categoryId === i ? 'active' : ''}
              key={obj.name}
            >
              {obj.name}
            </li>
          ))}
        </ul>
        <input
          value={searchValue}
          onChange={(e) => setSearchValue(e.target.value)}
          className="search-input"
          placeholder="Search by name"
        />
      </div>
      <div className="content">
        {isLoading ? (
          <h2>Loading...</h2>
        ) : (
          collections
            .filter((obj) =>
              obj.name.toLowerCase().includes(searchValue.toLowerCase())
            )
            .map((obj, index) => (
              <Collection key={index} name={obj.name} images={obj.photos} />
            ))
        )}
      </div>
      <ul className="pagination">
        {[...Array(5)].map((_, i) => {
          return (
            <li
              onClick={() => setPage(i + 1)}
              className={page === i + 1 ? 'active' : ''}
            >
              {i + 1}
            </li>
          );
        })}
      </ul>
    </div>
  );
}

export default App;
