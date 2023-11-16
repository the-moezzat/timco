import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';

export function AlbumSortItem({
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
    <div ref={setNodeRef} style={style} {...attributes} {...listeners}>
      <div className=" cursor-move">
        {children ? (
          children
        ) : (
          <img
            src={id}
            alt=""
            className="w-full h-24 object-cover rounded-md"
          />
          // <div className=" w-full h-24 bg-green-300 text-sm">{id}</div>
        )}
      </div>
    </div>
  );
}
