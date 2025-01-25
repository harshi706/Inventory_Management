import React, { useState, useEffect } from "react";

const Inventory = () => {
  const [items, setItems] = useState(() => {
    // Load data from localStorage or use initial data
    const savedItems = localStorage.getItem("inventory");
    return savedItems
      ? JSON.parse(savedItems)
      : [
          { id: 1, name: "Apples", category: "Fruits", quantity: 8, price: 5 },
          { id: 2, name: "Bananas", category: "Fruits", quantity: 20, price: 3 },
          { id: 3, name: "Laptops", category: "Electronics", quantity: 5, price: 800 },
          { id: 4, name: "Notebooks", category: "Stationery", quantity: 15, price: 2 },
          { id: 5, name: "Chairs", category: "Furniture", quantity: 2, price: 50 },
        ];
  });

  const [filter, setFilter] = useState("");
  const [sortAsc, setSortAsc] = useState(true);
  const [newItem, setNewItem] = useState({ name: "", category: "", quantity: "", price: "" });
  const [editingItem, setEditingItem] = useState(null);

  // Save items to localStorage whenever they change
  useEffect(() => {
    localStorage.setItem("inventory", JSON.stringify(items));
  }, [items]);

  const handleAddItem = () => {
    if (newItem.name && newItem.category && newItem.quantity && newItem.price) {
      setItems([
        ...items,
        {
          id: Date.now(),
          name: newItem.name,
          category: newItem.category,
          quantity: parseInt(newItem.quantity),
          price: parseFloat(newItem.price),
        },
      ]);
      setNewItem({ name: "", category: "", quantity: "", price: "" });
    }
  };

  const handleDeleteItem = (id) => {
    setItems(items.filter((item) => item.id !== id));
  };

  const handleSort = () => {
    setSortAsc(!sortAsc);
    setItems([...items].sort((a, b) => (sortAsc ? b.quantity - a.quantity : a.quantity - b.quantity)));
  };

  const handleEditClick = (item) => {
    setEditingItem(item);
  };

  const handleSaveEdit = (id) => {
    setItems(
      items.map((item) =>
        item.id === id
          ? { ...item, ...editingItem }
          : item
      )
    );
    setEditingItem(null);
  };

  const handleEditChange = (e, field) => {
    setEditingItem({ ...editingItem, [field]: e.target.value });
  };

  const filteredItems = filter
    ? items.filter((item) => item.category.toLowerCase() === filter.toLowerCase())
    : items;

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Inventory Management</h1>
      <div className="flex gap-4 mb-4">
        <input
          type="text"
          placeholder="Item Name"
          value={newItem.name}
          onChange={(e) => setNewItem({ ...newItem, name: e.target.value })}
          className="border p-2"
        />
        <input
          type="text"
          placeholder="Category"
          value={newItem.category}
          onChange={(e) => setNewItem({ ...newItem, category: e.target.value })}
          className="border p-2"
        />
        <input
          type="number"
          placeholder="Quantity"
          value={newItem.quantity}
          onChange={(e) => setNewItem({ ...newItem, quantity: e.target.value })}
          className="border p-2"
        />
        <input
          type="number"
          placeholder="Price"
          value={newItem.price}
          onChange={(e) => setNewItem({ ...newItem, price: e.target.value })}
          className="border p-2"
        />
        <button onClick={handleAddItem} className="bg-blue-500 text-white p-2">
          Add Item
        </button>
      </div>

      <div className="flex gap-4 mb-4">
        <input
          type="text"
          placeholder="Filter by Category"
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
          className="border p-2"
        />
        <button onClick={handleSort} className="bg-gray-500 text-white p-2">
          Sort by Quantity ({sortAsc ? "Ascending" : "Descending"})
        </button>
      </div>

      <table className="table-auto w-full border">
        <thead>
          <tr className="bg-gray-200">
            <th className="border p-2">Item Name</th>
            <th className="border p-2">Category</th>
            <th className="border p-2">Quantity</th>
            <th className="border p-2">Price</th>
            <th className="border p-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          {filteredItems.map((item) => (
            <tr
              key={item.id}
              className={item.quantity < 10 ? "bg-red-100" : ""}
            >
              <td className="border p-2">
                {editingItem?.id === item.id ? (
                  <input
                    type="text"
                    value={editingItem.name}
                    onChange={(e) => handleEditChange(e, "name")}
                    className="border p-1"
                  />
                ) : (
                  item.name
                )}
              </td>
              <td className="border p-2">
                {editingItem?.id === item.id ? (
                  <input
                    type="text"
                    value={editingItem.category}
                    onChange={(e) => handleEditChange(e, "category")}
                    className="border p-1"
                  />
                ) : (
                  item.category
                )}
              </td>
              <td className="border p-2">
                {editingItem?.id === item.id ? (
                  <input
                    type="number"
                    value={editingItem.quantity}
                    onChange={(e) => handleEditChange(e, "quantity")}
                    className="border p-1"
                  />
                ) : (
                  item.quantity
                )}
              </td>
              <td className="border p-2">
                {editingItem?.id === item.id ? (
                  <input
                    type="number"
                    value={editingItem.price}
                    onChange={(e) => handleEditChange(e, "price")}
                    className="border p-1"
                  />
                ) : (
                  `$${item.price}/unit`
                )}
              </td>
              <td className="border p-2">
                {editingItem?.id === item.id ? (
                  <button
                    onClick={() => handleSaveEdit(item.id)}
                    className="bg-green-500 text-white px-2 py-1 mr-2"
                  >
                    Save
                  </button>
                ) : (
                  <button
                    onClick={() => handleEditClick(item)}
                    className="bg-yellow-500 text-white px-2 py-1 mr-2"
                  >
                    Edit
                  </button>
                )}
                <button
                  onClick={() => handleDeleteItem(item.id)}
                  className="bg-red-500 text-white px-2 py-1"
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Inventory;
