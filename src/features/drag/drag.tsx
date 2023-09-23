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
  SortableContext,
  sortableKeyboardCoordinates,
  verticalListSortingStrategy,
} from '@dnd-kit/sortable';

import { Button } from '@/components/ui/button';

import { SortableItem } from './sortableItem';

export default function Drag({
  onChange,
}: {
  onChange: (album: FileList[]) => void;
}) {
  const [album, setAlbum] = useState<{ [key: string]: FileList | undefined }>(
    {}
  );
  const [items, setItems] = useState(Object.keys(album));
  // console.log(items);

  useEffect(() => {
    onChange(
      items
        .map((item) => album[item])
        .filter((item) => item !== undefined) as FileList[]
    );
  }, [album, items]);

  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  function handleDelete(index: string) {
    console.log('deleted');

    if (items.length < 2) {
      setAlbum({});
      setItems((state) => state.filter((item) => item !== index));
      return;
    }

    setAlbum((state) => ({
      ...state,
      [index]: undefined,
    }));

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
              onAddition={setAlbum}
            />
          ))}
        </div>
      </SortableContext>
      <Button
        type="button"
        onClick={() => setItems((state) => [...state, `${Math.random()}`])}
        className=" self-start"
      >
        Add album
      </Button>
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
