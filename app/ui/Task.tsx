import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { styleItem } from "../styles.css";

export interface ITaskItem {
  id: string
  title: string
}

export function Task({taskItem}: {taskItem: ITaskItem}) {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
  } = useSortable({id: taskItem.id});

  const style = {
    transform: CSS.Transform.toString(transform),
  };
  return (
    <div ref={setNodeRef} style={style} {...attributes} {...listeners} className={styleItem}>
      <h3>{taskItem.title}</h3>
    </div>
  );
}