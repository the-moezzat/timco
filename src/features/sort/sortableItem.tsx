import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { DotsSixVertical } from '@phosphor-icons/react';
// import { Button } from '@/components/ui/button';
// import { Trash } from '@phosphor-icons/react';

export function SortableItem({
  id,
}: {
  id: string;
  index: number;
  onDelete: (index: string) => void;
}) {
  const { attributes, listeners, setNodeRef, transform, transition } =
    useSortable({ id: id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  return (
    <div ref={setNodeRef} style={style} {...attributes} {...listeners}>
      <div className="flex gap-2">
        <div className=" cursor-grab active:first-line:cursor-grabbing">
          <DotsSixVertical size={32} />
        </div>
        <div className="text-sm bg-white border p-2 rounded-md flex-1">
          Item {JSON.parse(id).length}
        </div>
        {/* <Button
          type="button"
          size={'icon'}
          variant={'destructive'}
          className="text-xl"
          onMouseDown={() => {
            onDelete(id);
            console.log('deleted');
          }}
        >
          <Trash />
        </Button> */}
      </div>
    </div>
  );
}
