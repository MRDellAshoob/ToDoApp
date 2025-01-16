import React from "react";
import { Box, Badge } from "@mui/material";
import { Add } from "@mui/icons-material";
import styles from "../TodoList.module.scss";
interface TabItem {
  title: string;
  badgeContent: number;
  active: boolean;
  isFirst: boolean;
}
interface StatusTabsProps {
  content: [];
}

const StatusTabs: React.FC<StatusTabsProps> = ({ content }) => {
  return (
    <div className={styles.status_tabs}>
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
        }}
      >
        {content.map((tab: TabItem, index: number) => (
          <div
            key={index}
            className={`${styles.status_tab} ${
              tab.isFirst ? styles.status_tab_first : ""
            }`}
          >
            <span
              className={`${styles.status_tab_title} ${
                tab.active ? styles.active : ""
              }`}
            >
              {tab.title}
            </span>
            <span
              className={`${styles.status_tab_badge} ${
                tab.active ? styles.active : ""
              }`}
            >
              {tab.badgeContent}
            </span>
          </div>
        ))}
      </Box>
    </div>
  );
};

export default StatusTabs;
