import { rectSortingStrategy, SortableContext } from "@dnd-kit/sortable";
import { styleContainer } from "../styles.css";
import { ITaskItem, Task } from "./Task";
import { useDroppable } from "@dnd-kit/core";

export interface ISegmentItem {
  id: string,
  title: string,
  tasks: ITaskItem[]
}
export function Segment({segmentItem}: {segmentItem: ISegmentItem}) {
  const { setNodeRef } = useDroppable({ id: segmentItem.id });
  return (
    <SortableContext id={segmentItem.id} items={segmentItem.tasks} strategy={rectSortingStrategy}>
      <div ref={setNodeRef} className={styleContainer}>
        <h2>{segmentItem.title}</h2>
        <div>
          {segmentItem.tasks.map((taskItem) => {
            return (
              <Task key={taskItem.id} taskItem={taskItem} />
            );
          })}
        </div>
      </div>
    </SortableContext>
    
  );
}