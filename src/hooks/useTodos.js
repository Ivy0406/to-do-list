import { useState } from "react";
import apiRequest from "../api/apiRequest";

export const useTodos = () => {
  const [todos, setTodos] = useState([]);
  const [newContent, setNewContent] = useState("");
  const [editingId, setEditingId] = useState(null);
  const [tempContent, setTempContent] = useState("");

  async function handleGetTodos() {
    try {
      const res = await apiRequest.get("/todos/");
      setTodos(res.data.data);
    } catch (error) {
      console.log("列表讀取失敗Ｑ＿Ｑ", error);
    }
  }

  async function handleAddTodos() {
    const isNewContentEmpty = !newContent.trim();
    if (isNewContentEmpty) return;

    const itemToAdd = {
      content: newContent,
    };
    try {
      await apiRequest.post("/todos/", itemToAdd);
      setNewContent("");
      handleGetTodos();
    } catch (error) {
      console.log("新增失敗ＱＱ", error);
    }
  }

  async function handleTodoStatus(id) {
    try {
      await apiRequest.patch(`/todos/${id}/toggle`);
      handleGetTodos();
    } catch (error) {
      console.log("更新狀態失敗Q_Q",error);
    }
  }

  async function handleDeleteTodo(id) {
    try {
      const res = await apiRequest.delete(`/todos/${id}`);
      if (res.data.status) {
        handleGetTodos();
      }
    } catch (error) {
      console.log(error);
    }
  }

  function handleStartEditing(id, currentContent) {
    setEditingId(id);
    setTempContent(currentContent);
  }

  function handleCancelEditing() {
    setEditingId(null);
    setTempContent("");
  }

  async function handleSaveEditing(id) {
    if (!tempContent.trim()) {
      handleCancelEditing();
      return;
    }

    try {
      const dataForUpdate = {
        content: tempContent,
      };
      const res = await apiRequest.put(`/todos/${id}`, dataForUpdate);
      console.log(res.data.message);
      setEditingId(null);
      handleGetTodos();
    } catch (error) {
      console.log("編輯失敗ＱＱ", error);
    }
  }

  return {
    todos,
    newContent,
    editingId,
    tempContent,
    setNewContent,
    setTempContent,
    handleGetTodos,
    handleAddTodos,
    handleTodoStatus,
    handleDeleteTodo,
    handleStartEditing,
    handleCancelEditing,
    handleSaveEditing,
  }
};
