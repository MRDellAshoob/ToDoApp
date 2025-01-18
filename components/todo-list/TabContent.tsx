import React from "react";
import { Box } from "@mui/material";
import { Add } from "@mui/icons-material";
import StatusTabs from "./components/TodoListStatusTabs";
import TodoItem from "./TodoListItem";
import styles from "./TodoList.module.scss";
interface TabContentProps {
  content: string;
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
const TabContent: React.FC<TabContentProps> = ({ content }) => {
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
        <TodoItem />
      </Box>
    </div>
  );
};

export default TabContent;
