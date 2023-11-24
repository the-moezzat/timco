import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '@/components/ui/alert-dialog';
import { Trash } from '@phosphor-icons/react';
import useDeletePost from '../_hooks/useDeletePost';

export default function DeletePost({ postId }: { postId: number }) {
  const { deletePost } = useDeletePost();

  return (
    <AlertDialog>
      <AlertDialogTrigger className="py-1.5 px-1.5 text-lg bg-red-100 hover:bg-red-200 transition-colors text-red-900 rounded-md border ">
        <Trash />
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
          <AlertDialogDescription>
            This action cannot be undone. This will permanently delete this post
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction
            className="bg-red-500 hover:bg-red-600 transition-colors"
            onClick={() => deletePost(postId)}
          >
            Continue
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
