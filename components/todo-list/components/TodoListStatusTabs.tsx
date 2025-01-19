import React from "react";
import { Box } from "@mui/material";
import styles from "../TodoList.module.scss";
import { TabStatusItem } from "../types/TodoTypes";

interface StatusTabsProps {
  tabs: TabStatusItem[];
  changeStatusTab: (tab: TabStatusItem) => void;
}

const StatusTabs: React.FC<StatusTabsProps> = ({ tabs, changeStatusTab }) => {
  return (
    <div className={styles.status_tabs}>
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        {tabs.map((tab: TabStatusItem, index: number) => (
          <div
            onClick={() => changeStatusTab(tab)}
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
