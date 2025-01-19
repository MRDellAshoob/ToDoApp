export type TodoItemTypes = {
  title: string;
  start_date: string;
  end_date: string;
  is_completed: boolean;
  description: string;
  createdAt: string;
  updatedAt: string;
  _id?: string;
};

export interface TodoListItemProps {
  todo: TodoItemTypes;
  onUpdate: (todo: TodoItemTypes) => void;
  onEdit: (todo: TodoItemTypes) => void;
}

export interface TabContentProps {
    content: [];
    tabType: number;
    onUpdateTodo: (updatedItem: TodoItemTypes, tabType: number) => void;
    onCreateTodo: () => void;
} 

export interface TabStatusItem {
    title: string;
    badgeContent: number;
    active: boolean;
    isFirst: boolean;
    id: number;
}

export interface TabPanelProps {
    children?: React.ReactNode;
    index: number;
    value: number;
  }

 export interface TabStatusItem {
    title: string;
    badgeContent: number;
    active: boolean;
    isFirst: boolean;
    id: number;
  }
  

  



