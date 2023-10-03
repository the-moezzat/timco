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

  // const fileArr = useMemo(
  //   () =>
  //     alb.map((album, index) => ({
  //       id: index,
  //       album,
  //     })),
  //   [alb]
  // );

  const [fileArr, setFileArr] = useState(() =>
    alb.map((album, index) => ({
      id: index,
      album,
    }))
  );
  function getAlbum(id: number): string[] | undefined {
    return fileArr.find((album) => album.id === id)?.album;
  }

  const [order, setOrder] = useState(() => fileArr.map((album) => album.id));

  useEffect(() => {
    onChange(order.map((id) => getAlbum(id) as string[]));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [order, fileArr]);

  function handleSortImage(id: number, newAlbum: string[]) {
    setFileArr((prevFileArr) => {
      const fileIndex = prevFileArr.findIndex((file) => file.id === id);
      const updatedFile = {
        ...prevFileArr[fileIndex],
        album: newAlbum,
      };
      const updatedFileArr = [...prevFileArr];
      updatedFileArr.splice(fileIndex, 1, updatedFile);
      return updatedFileArr;
    });
  }

  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  return (
    <DndContext
      sensors={sensors}
      collisionDetection={closestCenter}
      onDragEnd={handleDragEnd}
    >
      <SortableContext items={order} strategy={verticalListSortingStrategy}>
        <div className=" space-y-2">
          {order.map((id, index) => (
            <SortableItem
              key={id}
              id={id}
              index={index}
              album={getAlbum(id) as string[]}
              onChange={(album) => {
                handleSortImage(id, album);
              }}
            />
          ))}
        </div>
      </SortableContext>
    </DndContext>
  );

  function handleDragEnd(event: DragEndEvent) {
    const { active, over } = event;

    if (active.id !== over?.id) {
      setOrder((order) => {
        const oldIndex = order.indexOf(active?.id as number);
        const newIndex = order.indexOf(over?.id as number);

        return arrayMove(order, oldIndex, newIndex);
      });
    }
  }
}
