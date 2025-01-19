import React, { useState } from "react";
import { Box, Button, Typography } from "@mui/material";
import { Add } from "@mui/icons-material";
import { getFormattedTodayDate } from "@/helpers/dateTimeHelper";
import { showSuccessToast, showErrorToast } from "@/utils/toast";

import BaseModal from "@/components/global/BaseModal";
import {
  TodoItemTypes,
  TabContentProps,
  TabStatusItem,
} from "./types/TodoTypes";
import StatusTabs from "./components/TodoListStatusTabs";
import TodoItem from "./TodoListItem";
import styles from "./TodoList.module.scss";
import TaskForm from "./components/TaskForm";
import AxiosInstance from "@/utils/axiosInstance";

const TabContent: React.FC<TabContentProps> = ({
  content,
  tabType,
  onUpdateTodo,
  onCreateTodo,
}) => {
  const [showTaskModal, setShowTaskModal] = useState<boolean>(false);
  const [editTask, setEditTask] = useState<object>({});
  const [statusTabs, setStatusTabs] = useState<TabStatusItem[]>([
    {
      id: 1,
      title: "All",
      badgeContent: 35,
      active: true,
      isFirst: true,
    },
    {
      id: 2,
      title: "Open",
      badgeContent: 14,
      active: false,
      isFirst: false,
    },
    {
      id: 3,
      title: "Closed",
      badgeContent: 19,
      active: false,
      isFirst: false,
    },
    {
      id: 4,
      title: "Archived",
      badgeContent: 2,
      active: false,
      isFirst: false,
    },
  ]);
  const handleCompleteTask = (item: TodoItemTypes) => {
    onUpdateTodo(item, tabType);
  };
  const handleEditTask = (item: TodoItemTypes) => {
    setEditTask(item);
    setShowTaskModal(true);
  };

  const handleFormSubmit = async (formData: TodoItemTypes) => {
    try {
      if (formData._id) {
        const response = await AxiosInstance.put(
          `/todos/update/${formData._id}`,
          {
            ...formData,
          }
        );
        onUpdateTodo(formData, tabType);
        showSuccessToast("Task Updated Successfully");
      } else {
        const response = await AxiosInstance.post("/todos/create", {
          ...formData,
        });
        onCreateTodo();
        showSuccessToast(response.message);
      }

      setShowTaskModal(false);
      setEditTask({});
    } catch (error) {
      showErrorToast("Error fetching data");
      console.error("Error fetching data:", error);
    }
  };
  const handleClose = () => {
    setShowTaskModal(false);
    setEditTask({});
  };
  const openAddNewTaskModal = () => {
    setShowTaskModal(true);
  };

  const changeListStatus = (tabStatus: TabStatusItem) => {
    setStatusTabs((prevTabs) =>
      prevTabs.map((item) =>
        item.id === tabStatus.id
          ? { ...item, active: true }
          : { ...item, active: false }
      )
    );
  };
  return (
    <div className={styles.tab_content}>
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
          }}
        >
          <span color="primary" className={styles.tab_content_title}>
            Today’s Task
          </span>
          <span className={styles.tab_content_time}>
            {getFormattedTodayDate()}
          </span>
        </Box>
        <div>
          <button onClick={openAddNewTaskModal} className={styles.add_task_btn}>
            <Add sx={{ marginRight: "10px" }} />
            <span>New Task</span>
          </button>
        </div>
      </Box>
      <Box>
        <StatusTabs changeStatusTab={changeListStatus} tabs={statusTabs} />
      </Box>
      <Box>
        {content.length > 0 ? (
          content.map((item, index) => (
            <TodoItem
              key={index}
              onEdit={handleEditTask}
              onUpdate={handleCompleteTask}
              todo={item}
            />
          ))
        ) : (
          <p>No data available</p>
        )}
      </Box>
      <BaseModal
        showCloseButton={false}
        open={showTaskModal}
        onClose={handleClose}
        title={Object.keys(editTask).length ? "Edit Task" : "Add Task"}
      >
        <TaskForm
          initialValues={editTask}
          handleCloseModal={handleClose}
          onSubmit={handleFormSubmit}
        />
      </BaseModal>
    </div>
  );
};

export default TabContent;
