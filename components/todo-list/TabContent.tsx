import React from "react";
import { Box } from "@mui/material";
import { Add } from "@mui/icons-material";
import StatusTabs from "./components/TodoListStatusTabs";
import TodoItem from "./TodoListItem";
import styles from "./TodoList.module.scss";
interface TabContentProps {
  content: [];
  tabType: number;
  onUpdateTodo: (updatedItem: TodoItem, tabType: number) => void;
}
const statusTabs = [
  {
    title: "All",
    badgeContent: 35,
    active: true,
    isFirst: true,
  },
  {
    title: "Open",
    badgeContent: 14,
    active: false,
    isFirst: false,
  },
  {
    title: "Closed",
    badgeContent: 19,
    active: false,
    isFirst: false,
  },
  {
    title: "Archived",
    badgeContent: 2,
    active: false,
    isFirst: false,
  },
];

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

const TabContent: React.FC<TabContentProps> = ({
  content,
  tabType,
  onUpdateTodo,
}) => {
  console.log(content, "as;ldkas;dkas;das;dasl;dkas;dlkas;daskd;l");
  const handleCompleteTask = (item: TodoItem) => {
    onUpdateTodo(item, tabType);
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
          <span className={styles.tab_content_time}>Wednesday , 11 May</span>
        </Box>
        <div>
          <button className={styles.add_task_btn}>
            <Add sx={{ marginRight: "10px" }} />
            <span>New Task</span>
          </button>
        </div>
      </Box>
      <Box>
        <StatusTabs tabs={statusTabs} />
      </Box>
      <Box>
        {content.length > 0 ? (
          content.map((item, index) => (
            <TodoItem key={index} onUpdate={handleCompleteTask} todo={item} />
          ))
        ) : (
          <p>No data available</p>
        )}
      </Box>
    </div>
  );
};

export default TabContent;
