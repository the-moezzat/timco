import { ArrowLineUpRight } from '@phosphor-icons/react';
import { PostType } from '../_types/types';
import { Link } from 'react-router-dom';
import EditPost from './edit-post';
import DeletePost from './delete-post';

interface Props {
  post: PostType;
}
export default function Post({ post }: Props) {
  const titleLink = post.title.replaceAll(' ', '_');
  return (
    <div className="border rounded-sm p-2 flex gap-4">
      {post.thumbnail && (
        <img
          src={post.thumbnail}
          alt={post.title}
          className="rounded-sm h-20 w-32 object-cover"
        />
      )}
      <div className="flex flex-col text-sm text-gray-600">
        <p className="">
          <span className="">
            #
            {post.category.charAt(0).toUpperCase() +
              post.category.slice(1).toLowerCase()}
          </span>{' '}
          {new Date(post.created_at as string).toLocaleDateString(undefined, {
            year: 'numeric',
            month: 'short',
            day: 'numeric',
          })}{' '}
        </p>
        <div className="flex gap-2 items-center">
          <p className="text-lg font-semibold ">{post.title}</p>

          {post.draft && (
            <span className=" bg-yellow-100 rounded-full text-sm text-yellow-950 px-3 py-0.5">
              Draft
            </span>
          )}

          <Link to={titleLink}>
            <ArrowLineUpRight className="text-xl" />
          </Link>
        </div>
        <p>{post.content?.replaceAll('//=//=//=//', '').slice(0, 70)}...</p>
      </div>

      <div className="ml-auto flex gap-2 items-center self-start">
        <EditPost defaultValues={post} />
        <DeletePost postId={post.id} />
        {/* <Button
          // asChild
          className="bg-red-50 focus:bg-red-100"
          onClick={() => deletePost(String(post.id))}
        >
          Delete
        </Button> */}

        {/* <DropdownMenu>
          <DropdownMenuTrigger>
            <DotsThree className="text-3xl" />
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            <DropdownMenuItem asChild>
              <EditPost defaultValues={post} />
            </DropdownMenuItem>
            <DropdownMenuItem
              // asChild
              className="bg-red-50 focus:bg-red-100"
              onClick={() => deletePost(String(post.id))}
            >
              Delete
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu> */}
      </div>
    </div>
  );
}
