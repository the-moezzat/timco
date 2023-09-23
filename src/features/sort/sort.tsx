import { useEffect, useMemo, useState } from 'react';
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
  SortableContext,
  sortableKeyboardCoordinates,
  verticalListSortingStrategy,
} from '@dnd-kit/sortable';

import { SortableItem } from './sortableItem';

export default function Sort({
  onChange,
  albums,
}: {
  onChange: (album: string[][]) => void;
  albums: string[][];
}) {
  const alb = useMemo(() => albums, [albums]);

  const [items, setItems] = useState(() =>
    alb.map((album) => JSON.stringify(album))
  );
  // console.log(items);

  useEffect(() => {
    onChange(items.map((item) => JSON.parse(item)));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [items]);

  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  function handleDelete(index: string) {
    console.log('deleted');

    if (items.length < 2) {
      setItems((state) => state.filter((item) => item !== index));
      return;
    }

    setItems((state) => state.filter((item) => item !== index));
  }

  return (
    <DndContext
      sensors={sensors}
      collisionDetection={closestCenter}
      onDragEnd={handleDragEnd}
    >
      <SortableContext items={items} strategy={verticalListSortingStrategy}>
        <div className=" space-y-2 mb-2">
          {items.map((id, index) => (
            <SortableItem
              key={id}
              id={id}
              index={index}
              onDelete={handleDelete}
            />
          ))}
        </div>
      </SortableContext>
    </DndContext>
  );

  function handleDragEnd(event: DragEndEvent) {
    const { active, over } = event;

    if (active.id !== over?.id) {
      setItems((items) => {
        const oldIndex = items.indexOf(active?.id as string);
        const newIndex = items.indexOf(over?.id as string);

        return arrayMove(items, oldIndex, newIndex);
      });
    }
  }
}
