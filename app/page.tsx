'use client';

import { useState } from "react";
import { 
  DndContext, 
  closestCenter, 
  KeyboardSensor, 
  PointerSensor, 
  useSensor, 
  useSensors, 
  DragEndEvent
} from "@dnd-kit/core";
import { 
  arrayMove, 
  SortableContext, 
  sortableKeyboardCoordinates, 
  verticalListSortingStrategy 
} from "@dnd-kit/sortable";
import { styleContainer, styleContainerWrapper, styleItem, styleWrapper } from "./styles.css";
import { SortableItem } from "./ui/SortableItem";

export default function Home() {
  // status: 0 = 未着手, 1 = 進行中, 2 = 完了
  const [tasks, setTasks] = useState([
    { id: 1, title: "Task 1", status: 0, sortNo: 1 },
    { id: 2, title: "Task 2", status: 1, sortNo: 2 },
    { id: 3, title: "Task 3", status: 2, sortNo: 3 },
    { id: 4, title: "Task 4", status: 0, sortNo: 4 },
    { id: 5, title: "Task 5", status: 1, sortNo: 5 },
    { id: 6, title: "Task 6", status: 2, sortNo: 6 },
  ]);
  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );
  const handleDragEnd = (event: DragEndEvent) => {
    const {active, over} = event;
    if(active.id !== over?.id) {
      setTasks((items) => {
        const oldIndex = items.findIndex((item) => item.id === active.id)
        const newIndex = items.findIndex((item) => item.id === over?.id)
        return arrayMove(items, oldIndex, newIndex)
      });
    }
  };

  return (
    <div className={styleWrapper}>
      <h1>My Todo</h1>
      <DndContext
        sensors={sensors}
        collisionDetection={closestCenter}
        onDragEnd={handleDragEnd}
      >
        <SortableContext
          items={tasks}
          strategy={verticalListSortingStrategy}
        >
          <div className={styleContainerWrapper}>
            <div className={styleContainer}>
              <div>
                {tasks.map((element) => (
                  <SortableItem key={element.id} {...element} />
                ))}
              </div>
            </div>
          </div>
        </SortableContext>
      </DndContext>
    </div>
  );
}
