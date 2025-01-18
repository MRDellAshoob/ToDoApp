"use client";
import React, { useState } from "react";
import AxiosInstance from "@/utils/axiosInstance";
import { showSuccessToast, showErrorToast } from "@/utils/toast";
import { Box } from "@mui/material";
import styles from "./TodoList.module.scss";
import CheckboxField from "@/components/global/BaseCheckboxField";
import { formatTimeRange, isStartDateToday } from "@/helpers/dateTimeHelper";

type TodoItem = {
  title: string;
  start_date: string;
  end_date: string;
  is_completed: boolean;
  description: string;
  createdAt: string;
  updatedAt: string;
  _id: string;
};

interface TodoListItemProps {
  todo: TodoItem;
  onUpdate: (todo: TodoItem) => void;
}

const TodoListItem: React.FC<TodoListItemProps> = ({ todo, onUpdate }) => {
  const [isCompleted, setIsCompleted] = useState<boolean>(false);
  const completeTask = async (todo: TodoItem) => {
    try {
      const response = await AxiosInstance.put(`/todos/update/${todo._id}`, {
        is_completed: !todo.is_completed,
      });
      if (response) {
        setIsCompleted(response.is_completed);
        const updatedTodo = {
          ...todo,
          is_completed: response.is_completed,
        };
        onUpdate(updatedTodo);
        showSuccessToast("Task Updated Successfully");
      }
    } catch (error) {
      showErrorToast("Error on updating task");
      console.error("Error fetching data:", error);
    } finally {
    }
  };

  const handleCheckboxChange = (checked: boolean, item: TodoItem) => {
    completeTask(item);
    // .then(() => {
    //   item.is_completed = todo.is_completed;
    //   setIsCompleted(todo.is_completed); // Update state if needed
    // });
  };
  return (
    <Box sx={{ width: "100%" }}>
      <Box
        sx={{
          backgroundColor: "#fff",
          borderRadius: "15px",
          padding: "16px 20px",
          marginBottom: "20px",
        }}
      >
        <div className={styles.todo_card}>
          <div className={styles.todo_card_content}>
            <div className={styles.todo_card_content_head}>
              <span className={styles.todo_card_title}>
                {todo.is_completed ? <del>{todo.title}</del> : todo.title}
              </span>
              <span className={styles.todo_card_desc}>{todo.description}</span>
            </div>
            <div>
              <CheckboxField
                checked={todo.is_completed}
                onChange={(e: any) =>
                  handleCheckboxChange(e.target.checked, todo)
                }
              />
            </div>
          </div>
          <div className={styles.todo_card_content_footer}>
            <span className={styles.todo_card_task_day}>
              {isStartDateToday(todo.start_date) ? "Today" : "Tomorrow"}
            </span>
            <span className={styles.todo_card_task_datetime}>
              {formatTimeRange(todo.start_date, todo.start_date)}
            </span>
          </div>
        </div>
      </Box>
    </Box>
  );
};

export default TodoListItem;
