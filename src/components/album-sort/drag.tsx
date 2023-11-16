import { useEffect, useState } from 'react';
import {
  DndContext,
  closestCenter,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
  DragEndEvent,
} from '@dnd-kit/core';
import {
  arrayMove,
  rectSortingStrategy,
  SortableContext,
  sortableKeyboardCoordinates,
} from '@dnd-kit/sortable';

import React from 'react';

export default function SortImage({
  album,
  onChange,
  render,
}: {
  album: string[];
  render: (items: string[]) => React.ReactNode;
  onChange: (album: string[]) => void;
}) {
  const [items, setItems] = useState(album);
  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  useEffect(() => {
    onChange(items);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [items]);

  return (
    <DndContext
      sensors={sensors}
      collisionDetection={closestCenter}
      onDragEnd={handleDragEnd}
    >
      <SortableContext items={items} strategy={rectSortingStrategy}>
        {/* <div className="grid grid-cols-4 gap-2"> */}
        {render(items)}
        {/* {items.map((id) => (
            <React.Fragment key={id}>
              {children}
              <SortableItem key={id} id={id} />
            </React.Fragment>
          ))} */}
        {/* </div> */}
      </SortableContext>
    </DndContext>
  );

  function handleDragEnd(event: DragEndEvent) {
    const { active, over } = event;

    if (active.id !== over?.id) {
      setItems((items) => {
        const oldIndex = items.indexOf(active.id as (typeof items)[0]);
        const newIndex = items.indexOf(over?.id as (typeof items)[0]);

        return arrayMove(items, oldIndex, newIndex);
      });
    }
  }
}
