import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { styleItem } from "../styles.css";

interface ISortableItemProps {
  id: number
  title: string
  status: number
  sortNo: number
}

export function SortableItem(item: ISortableItemProps) {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
  } = useSortable({id: item.id});

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };
  return (
    <div ref={setNodeRef} style={style} {...attributes} {...listeners} className={styleItem}>
      <h3>{item.title}</h3>
    </div>
  );
}