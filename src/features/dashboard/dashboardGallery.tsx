import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';

function DashboardGallery() {
  return (
    <div>
      <header className="flex items-center justify-between">
        <h1 className="text-5xl font-bold">Gallery</h1>
        <Dialog>
          <DialogTrigger>
            <Button>Upload new memories</Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Upload new memories</DialogTitle>
              <DialogDescription>
                This action cannot be undone. This will permanently delete your
                account and remove your data from our servers.
              </DialogDescription>
            </DialogHeader>
            <Input
              type="file"
              onChange={(e) => console.log(e.target.files?.item(1))}
              multiple
            />
          </DialogContent>
        </Dialog>
      </header>
    </div>
  );
}

export default DashboardGallery;
