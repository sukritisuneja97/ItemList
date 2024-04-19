import React, { useState, useEffect } from "react";
import "./App.css";

export const Card = ({ item, onDelete }) => {
  return (
    <div className="card">
      <p>{item.title}</p>
      <button onClick={() => onDelete(item.id)}>Delete</button>
    </div>
  );
};

const App = () => {
  const [items, setItems] = useState([]);

  useEffect(() => {
    fetchItems();
  }, []);

  const fetchItems = () => {
    fetch('https://jsonplaceholder.typicode.com/todos')
      .then(response => response.json())
      .then(data => setItems(data))
      .catch(error => console.error('Error fetching data:', error));
  };

  const deleteItem = (id) => {
    setItems(items.filter(item => item.id !== id));
  };

  const addItem = () => {
    const newItem = { id: items.length + 1, title: `New Item ${items.length + 1}` };
    setItems([...items, newItem]);
  };

  return (
    <div className="list">
      {items.map(item => (
        <Card key={item.id} item={item} onDelete={deleteItem} />
      ))}
      <button onClick={addItem} className="add-button">Add Item</button>
    </div>
  );
};


export default App;
