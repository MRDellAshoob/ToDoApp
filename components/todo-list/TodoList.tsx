"use client";
import React, { useState, useEffect } from "react";
import AxiosInstance from "@/utils/axiosInstance";
import { showSuccessToast, showErrorToast } from "@/utils/toast";
import {
  TabPanelProps,
  TodoFormItemTypes,
  TodoItemTypes,
} from "./types/TodoTypes";
import { isStartDateToday } from "@/helpers/dateTimeHelper";
import { Tabs, Tab, Box } from "@mui/material";
import styles from "./TodoList.module.scss";
import TabContent from "./TabContent";

function TabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      className={styles.tabpanel}
      hidden={value !== index}
      id={`tabpanel-${index}`}
      aria-labelledby={`tab-${index}`}
      {...other}
    >
      {value === index && <Box p={3}>{children}</Box>}
    </div>
  );
}

function a11yProps(index: number) {
  return {
    id: `tab-${index}`,
    "aria-controls": `tabpanel-${index}`,
  };
}

const TodoList: React.FC = () => {
  const [value, setValue] = useState(0);
  const [todaysTasks, setTodaysTasks] = useState<any>([]);
  const [tomorrowTasks, setTomorrowTasks] = useState<any>([]);
  const [loading, setloading] = useState<boolean>(true);

  const handleChangeTab = (event: React.ChangeEvent<{}>, newValue: number) => {
    setValue(newValue);
  };

  const updateTask = (updatedTask: TodoFormItemTypes, tab: number) => {
    if (tab) {
      setTomorrowTasks((prevTasks: any[]) =>
        prevTasks.map((task) =>
          task._id === updatedTask._id ? { ...task, ...updatedTask } : task
        )
      );
    } else {
      setTodaysTasks((prevTasks: any[]) =>
        prevTasks.map((task) =>
          task._id === updatedTask._id ? { ...task, ...updatedTask } : task
        )
      );
    }
  };

  const fetchData = async () => {
    try {
      const { data } = await AxiosInstance.get("/todos/fetch/all");
      data.data.forEach((task: any) => {
        if (isStartDateToday(task.start_date)) {
          setTodaysTasks((prev: any) => [...prev, task]);
        } else {
          setTomorrowTasks((prev: any) => [...prev, task]);
        }
      });
      showSuccessToast(data.message);
    } catch (error) {
      showErrorToast("Error fetching data");
      console.error("Error fetching data:", error);
    } finally {
      setloading(false);
    }
  };
  useEffect(() => {
    fetchData();
  }, []);

  return (
    <Box sx={{ width: "100%" }}>
      <Tabs
        className={styles.tabs}
        value={value}
        onChange={handleChangeTab}
        aria-label="todo list tabs"
      >
        <Tab
          className={styles.tab_title}
          label="Today’s Task"
          {...a11yProps(0)}
        />
        <Tab
          className={styles.tab_title}
          label="Tomorrow’s Task"
          {...a11yProps(1)}
        />
      </Tabs>
      <TabPanel value={value} index={0}>
        {!loading ? (
          <TabContent
            onCreateTodo={fetchData}
            content={todaysTasks}
            tabType={value}
            onUpdateTodo={updateTask}
          />
        ) : (
          <div>Loading...</div>
        )}
      </TabPanel>
      <TabPanel value={value} index={1}>
        {!loading ? (
          <TabContent
            onCreateTodo={fetchData}
            content={tomorrowTasks}
            tabType={value}
            onUpdateTodo={updateTask}
          />
        ) : (
          <div>Loading...</div>
        )}
      </TabPanel>
    </Box>
  );
};

export default TodoList;
