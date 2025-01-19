"use client";
import React from "react";
import AxiosInstance from "@/utils/axiosInstance";
import { showSuccessToast, showErrorToast } from "@/utils/toast";
import { Box } from "@mui/material";
import styles from "./TodoList.module.scss";
import CheckboxField from "@/components/global/BaseCheckboxField";
import { formatTimeRange, isStartDateToday } from "@/helpers/dateTimeHelper";
import { TodoItemTypes, TodoListItemProps } from "./types/TodoTypes";

const TodoListItem: React.FC<TodoListItemProps> = ({
  todo,
  onUpdate,
  onEdit,
}) => {
  const completeTask = async (todo: TodoItemTypes) => {
    try {
      const { data } = await AxiosInstance.put(`/todos/update/${todo._id}`, {
        is_completed: !todo.is_completed,
      });
      if (data) {
        const updatedTodo = {
          ...todo,
          is_completed: data.is_completed,
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

  const handleCheckboxChange = (checked: boolean, item: TodoItemTypes) => {
    completeTask(item);
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
              <span
                onClick={() => onEdit(todo)}
                className={styles.todo_card_title}
              >
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
