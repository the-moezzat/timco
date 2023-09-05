import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet';

export default function AddBlog() {
  return (
    <div className=" z-50 ">
      <Sheet>
        <SheetTrigger>Open</SheetTrigger>
        <SheetContent className="w-full" side={'bottom'}>
          <SheetHeader>
            <SheetTitle>Add blog</SheetTitle>
          </SheetHeader>
        </SheetContent>
      </Sheet>
    </div>
  );
}
