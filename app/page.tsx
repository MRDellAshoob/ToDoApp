import type { Metadata } from "next";
import styles from "./page.module.css";
import TodoList from "@/components/todo-list/TodoList";

export const metadata: Metadata = {
  title: "ToDo-App",
  description: "MRDellAshoob",
};

export default function Home() {
  return (
    <div className={styles.container}>
      <TodoList />
    </div>
  );
}
