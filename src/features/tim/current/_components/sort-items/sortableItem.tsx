import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { DotsSixVertical } from '@phosphor-icons/react';

export function SortableItem({
  id,
  children,
}: {
  id: string;
  children?: React.ReactNode;
}) {
  const { attributes, listeners, setNodeRef, transform, transition } =
    useSortable({ id: id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  return (
    <div ref={setNodeRef} style={style}>
      <div className="flex gap-2">
        <div
          className=" cursor-grab active:first-line:cursor-grabbing"
          {...listeners}
          {...attributes}
        >
          <DotsSixVertical size={32} />
        </div>
        {children}
      </div>
    </div>
  );
}
