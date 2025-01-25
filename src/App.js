import React, { useState } from "react";
import "./App.css";

const InventoryApp = () => {
  const [items, setItems] = useState([]); // Original inventory data
  const [newItem, setNewItem] = useState({
    name: "",
    category: "",
    quantity: "",
  });
  const [filterCategory, setFilterCategory] = useState(""); // Filter by category
  const [sortOrder, setSortOrder] = useState("asc"); // Sort order
  const [editingIndex, setEditingIndex] = useState(null); // Index of item being edited

  // Handle input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewItem({ ...newItem, [name]: value });
  };

  // Add or update an item
  const handleAddOrUpdate = () => {
    if (!newItem.name || !newItem.category || !newItem.quantity) {
      alert("Please fill out all fields!");
      return;
    }

    const updatedItem = {
      ...newItem,
      quantity: parseInt(newItem.quantity),
    };

    if (editingIndex !== null) {
      // Update an existing item
      const updatedItems = [...items];
      updatedItems[editingIndex] = updatedItem;
      setItems(updatedItems);
      setEditingIndex(null);
    } else {
      // Add a new item
      setItems([...items, { ...updatedItem, id: Date.now() }]);
    }

    // Clear input fields
    setNewItem({ name: "", category: "", quantity: "" });
  };

  // Delete an item
  const deleteItem = (index) => {
    setItems(items.filter((_, i) => i !== index));
  };

  // Edit an item
  const editItem = (index) => {
    setNewItem(items[index]);
    setEditingIndex(index);
  };

  // Filter by category
  const handleFilterCategory = (e) => {
    setFilterCategory(e.target.value);
  };

  // Sort items by quantity without altering the original state
  const getSortedItems = () => {
    const filteredItems = filterCategory
      ? items.filter((item) =>
          item.category.toLowerCase().includes(filterCategory.toLowerCase())
        )
      : items;

    return filteredItems.sort((a, b) =>
      sortOrder === "asc" ? a.quantity - b.quantity : b.quantity - a.quantity
    );
  };

  const handleSortByQuantity = () => {
    setSortOrder(sortOrder === "asc" ? "desc" : "asc");
  };

  const displayedItems = getSortedItems();

  return (
    <div className="container">
      <h1 className="title">Inventory Management</h1>
      <div className="input-container">
        <input
          className="input"
          name="name"
          placeholder="Item Name"
          value={newItem.name}
          onChange={handleInputChange}
        />
        <input
          className="input"
          name="category"
          placeholder="Category"
          value={newItem.category}
          onChange={handleInputChange}
        />
        <input
          className="input"
          name="quantity"
          type="number"
          placeholder="Quantity"
          value={newItem.quantity}
          onChange={handleInputChange}
        />
        <button className="add-button" onClick={handleAddOrUpdate}>
          {editingIndex !== null ? "Update Item" : "Add Item"}
        </button>
      </div>

      <div className="filter-sort-container">
        <input
          className="filter-input"
          placeholder="Filter by category"
          value={filterCategory}
          onChange={handleFilterCategory}
        />
        <button className="sort-button" onClick={handleSortByQuantity}>
          Sort by Quantity ({sortOrder === "asc" ? "Ascending" : "Descending"})
        </button>
      </div>

      <table className="table">
        <thead>
          <tr>
            <th>Item Name</th>
            <th>Category</th>
            <th>Quantity</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {displayedItems.length > 0 ? (
            displayedItems.map((item, index) => (
              <tr
                key={item.id}
                className={item.quantity < 10 ? "low-stock" : ""}
              >
                <td>{item.name}</td>
                <td>{item.category}</td>
                <td>{item.quantity}</td>
                <td>
                  <button
                    className="edit-button"
                    onClick={() => editItem(index)}
                  >
                    Edit
                  </button>
                  <button
                    className="delete-button"
                    onClick={() => deleteItem(index)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="4">No items found.</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default InventoryApp;




