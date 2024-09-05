import Image from "next/image";
import styles from "./page.module.css";
"use client";

import { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";

/**  Fetch menu item by ID
 *  FETCH api to send requests
 */
async function deleteMenu(id) {
  const res = await fetch(`http://127.0.0/1:8000/api/memu/${id}/`, {
    method: "DELETE",
  });
  if (!res.ok) {
    throw new Error("Failed to retrieve menu");
  }
  return Promise.resolve();
}

/**
 * Fetches menu data from server
 * Returns json of response
 */

async function getData() {
  const res = await fetch("http://127.0.0.1:8000/api/menu");
  if (!res.ok) {
    throw new Error("Failed to fetch data");
  }
  return res.json();
}

/**
 * 
 * @param {
 * } param0 
 * @returns 
 */
const MenuItem = ({ id, name, price, onEdit, onDelete }) => {
  return (
    <div className="menu-item" data-id={id}>
      <div className="menu-item-info">
        <div className="menu-item-name">{name}</div>
        <div className="menu-item-price">${price.toFixed(2)}</div>
      </div>
      <div className="menu-item-actions">
        <button className="edit-button" onClick={onEdit}>
          Edit
        </button>
        <button
         className="delete-button"
         onClick={() => {
          deleteMenu(id).then(() => onDelete(id));
         }}
        >
          Delete
        </button>
      </div>
    </div>
  );
};

/**
 * Main page component
 */

export default function Page() {
  const [menuItems, setMenuItems] = useState(null);
  const router = useRouter();
  const params = useSearchParams();

  // State to dispay success message
  const [displaySuccessMessage, setDisplaySuccessMessage] = useState({
    show: false,
    type:"", // 'add' or 'update' type
  });

  // Fetch menu items on component mount
  useEffect(() => {
    const fetchData = async () => {
      const data = await getData();
      setMenuItems(data);
    };
    fetchData().catch(console.error);
  }, []);

  // Detect changes in URL parameters for success messages
  useEffect(() => {
    if(!!params.get("action")) {
      setDisplaySuccessMessage({
        type: params.get("action"),
        show: true,
      });
      router.replace("/");
    }
  }, [params, router]);

  // Automatically hide success message after 3 seconds
  useEffect(()=> {
    const timer = setTimeout(() => {
      if (displaySuccessMessage.show) {
        setDisplaySuccessMessage({ show: false, type: ""});
      }
    }, 3000);
    return () => clearTimeout(timeout);
    }, [displaySuccessMessage.show]);

    const handleDelete = (id) => {
      setMenuItems((items) => items.filter((item) => item.id !== id));
    };
    return (
      <div>
        <button className="add-button" onClick={() => router.push("/add")}>
          Add
        </button>
        {displaySuccessMessage.show && (
          <p className="success-message">
            {displaySuccessMessage.type === "add" ? "Added a" : "Modified a"} menu
            item.
          </p>
        )}
        {menuItems ? (
          menuItems.map((item) => (
            <MenuItem
             key={item.id}
             id={item.id}
             name={item.name}
             price={item.price}
             onEdit={() => router.push(`/update/${item.id}`)}
             onDelete={handleDelete}
             />
          ))
        ) : (
          <p>Loading...</p>
        )}
      </div>
    );
}