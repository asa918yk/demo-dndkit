'use client';

import { useState } from "react";
import { 
  DndContext, 
  KeyboardSensor, 
  PointerSensor, 
  useSensor, 
  useSensors, 
  DragEndEvent,
  DragOverEvent,
  closestCorners
} from "@dnd-kit/core";
import { 
  arrayMove, 
  sortableKeyboardCoordinates, 
} from "@dnd-kit/sortable";
import { styleContainerWrapper, styleWrapper } from "./styles.css";
import { ISegmentItem, Segment } from "./ui/Segment";

export default function Home() {
  // idはsegmentとitemで重複しないようにする
  const [data, setData] = useState<ISegmentItem[]>([
    {
      id: "segment1",
      title: "未進行",
      tasks: [
        { id: "item1", title: "Task 1" },
        { id: "item4", title: "Task 4" },
      ],
    },
    {
      id: "segment2",
      title: "進行中",
      tasks: [
        { id: "item2", title: "Task 2" },
        { id: "item5", title: "Task 5" },
      ],
    },
    {
      id: "segment3",
      title: "完了",
      tasks: [
        { id: "item3", title: "Task 3" },
        { id: "item6", title: "Task 6" },
      ],
    },
  ]);

  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  const findSegment = (id: string | null) => {
    if(!id) {
      return null;
    }
    // idがsegmentのものならそのまま返す
    if(data.some((segment) => segment.id === id)) {
      return data.find((segment) => segment.id === id) ?? null;
    }
    // idがitemのものならその親segmentを返す
    return data.find((segment) => segment.tasks.some((task) => task.id === id)) ?? null;
  }

  const handleDragEnd = (event: DragEndEvent) => {
    const {active, over} = event;
    const activeId = String(active.id);
    const overId = over ? String(over.id) : null;
    const activeSegment = findSegment(activeId);
    const overSegment = findSegment(overId);
    if(!activeSegment || !overSegment || activeSegment !== overSegment) {
      return null;
    }
    const activeIndex = activeSegment.tasks.findIndex((task) => task.id === activeId);
    const overIndex = activeSegment.tasks.findIndex((task) => task.id === overId);
    if(activeIndex === overIndex) {
      return null;
    }
    setData((prevState) => {
      return prevState.map((segment) => {
        if(segment.id === activeSegment.id) {
          segment.tasks = arrayMove(overSegment.tasks, activeIndex, overIndex);
        }
        return segment;
      });
    });
  };

  const handleDragOver = (event: DragOverEvent) => {
    const {active, over, delta} = event;
    const activeId = String(active.id);
    const overId = over ? String(over.id) : null;
    const activeSegment = findSegment(activeId);
    const overSegment = findSegment(overId);
    if(!activeSegment || !overSegment || activeSegment === overSegment) {
      return null;
    }
    setData((prevState) => {
      const activeItems = activeSegment.tasks;
      const overItems = overSegment.tasks;
      const activeIndex = activeItems.findIndex((task) => task.id === activeId);
      const overIndex = overItems.findIndex((task) => task.id === overId);
      const newIndex = () => {
        // 最後のカードの下に移動しているか確認
        const putOnLastItem = overIndex === overItems.length - 1 && delta.y > 0;
        const modifier = putOnLastItem ? 1 : 0;
        return overIndex >=0 ? overIndex + modifier : overItems.length + 1;
      }
      return prevState.map((s) => {
        // 移動元のsegmentのtasksから移動したitemを削除
        if(s.id === activeSegment.id) {
          s.tasks = activeItems.filter((t) => t.id !== activeId);
        } else if(s.id === overSegment.id) {
          s.tasks = [
            ...overItems.slice(0, newIndex()), // 挿入位置より前のitem
            activeItems[activeIndex], // ドラッグ中のitemを追加
            ...overItems.slice(newIndex(), overItems.length) // 挿入位置より後のitem
          ];
        }
        return s;
      })
    });
  }

  return (
    <div className={styleWrapper}>
      <h1>My Todo</h1>
      <DndContext
        id="dnd-context"
        sensors={sensors}
        collisionDetection={closestCorners}
        onDragEnd={handleDragEnd}
        onDragOver={handleDragOver}
      >
        <div className={styleContainerWrapper}>
          {data.map((group, index) => 
            <Segment key={index} segmentItem={group} />
          )}
        </div>
      </DndContext>
    </div>
  );
}
