import { useState } from "react";
import apiRequest from "../api/apiRequest";

export const useTodos = () => {
  const [todos, setTodos] = useState([]);
  const [newContent, setNewContent] = useState("");
  const [editingId, setEditingId] = useState(null);
  const [tempContent, setTempContent] = useState("");
  const [isLoading, setIsLoading] = useState(true);

  const isTodosEmpty = todos.length === 0;

  async function getTodos() {
    setIsLoading(true);
    try {
      const res = await apiRequest.get("/todos/");
      setTodos(res.data.data);
    } catch (error) {
      console.log("列表讀取失敗Ｑ＿Ｑ", error);
    }
    setIsLoading(false);
  }

  async function addTodos() {
    const isNewContentEmpty = !newContent.trim();
    if (isNewContentEmpty) return;

    const itemToAdd = {
      content: newContent,
    };
    try {
      await apiRequest.post("/todos/", itemToAdd);
      setNewContent("");
      getTodos();
    } catch (error) {
      console.log("新增失敗ＱＱ", error);
    }
  }

  async function toggleTodoStatus(id) {
    try {
      await apiRequest.patch(`/todos/${id}/toggle`);
      getTodos();
    } catch (error) {
      console.log("更新狀態失敗Q_Q", error);
    }
  }

  async function deleteTodo(id) {
    try {
      const res = await apiRequest.delete(`/todos/${id}`);
      if (res.data.status) {
        getTodos();
      }
    } catch (error) {
      console.log(error);
    }
  }

  function startEditing(id, currentContent) {
    setEditingId(id);
    setTempContent(currentContent);
  }

  function cancelEditing() {
    setEditingId(null);
    setTempContent("");
  }

  async function saveEditing(id) {
    if (!tempContent.trim()) {
      cancelEditing();
      return;
    }

    try {
      const dataForUpdate = {
        content: tempContent,
      };
      const res = await apiRequest.put(`/todos/${id}`, dataForUpdate);
      console.log(res.data.message);
      setEditingId(null);
      getTodos();
    } catch (error) {
      console.log("編輯失敗ＱＱ", error);
    }
  }

  return {
    todos,
    isLoading,
    isTodosEmpty,
    newContent,
    editingId,
    tempContent,
    setNewContent,
    setTempContent,
    getTodos,
    addTodos,
    toggleTodoStatus,
    deleteTodo,
    startEditing,
    cancelEditing,
    saveEditing,
  };
};
