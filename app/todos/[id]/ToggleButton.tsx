"use client";

import { useState } from "react";
import { Todo } from "../../types";

export default function ToggleButton({ todo }: { todo: Todo }) {
  const [currentTodo, setCurrentTodo] = useState(todo);
  const [isLoading, setIsLoading] = useState(false);

  const toggleStatus = async () => {
    setIsLoading(true);

    try {
      const res = await fetch(`https://jsonplaceholder.typicode.com/todos/${currentTodo.id}`, {
        method: "PATCH",
        headers: {
          "Content-type": "application/json; charset=UTF-8",
        },
        body: JSON.stringify({
          completed: !currentTodo.completed,
        }),
      });

      if (res.ok) {
        const updatedTodo = await res.json();
        setCurrentTodo(updatedTodo);   // Update UI immediately
      } else {
        alert("Failed to update status");
      }
    } catch (error) {
      console.error(error);
      alert("Something went wrong");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <button
      onClick={toggleStatus}
      disabled={isLoading}
      className={`flex-1 font-medium py-4 rounded-2xl transition-all ${
        currentTodo.completed
          ? "bg-amber-600 hover:bg-amber-700 text-white"
          : "bg-emerald-600 hover:bg-emerald-700 text-white"
      } disabled:opacity-70 disabled:cursor-not-allowed`}
    >
      {isLoading ? "Updating..." : currentTodo.completed ? "Mark as Pending" : "Mark as Completed"}
    </button>
  );
}