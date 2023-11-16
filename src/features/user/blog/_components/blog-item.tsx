import { Link } from 'react-router-dom';
import { styled } from 'styled-components';
import { Database } from '@/types/schema';

interface BlogItemProps {
  post: Database['public']['Tables']['blog']['Row'];
}

const Thumbnail = styled.div<{ $src: string }>`
  width: 300px;
  height: 200px;
  background-image: url(${(props) => props.$src});
  background-size: cover;
  background-position: center;

  @media (max-width: 768px) {
    width: 100%;
  }
`;

export default function BlogItem({ post }: BlogItemProps) {
  const titleLink = post.title.replaceAll(' ', '_');

  return (
    <div className="grid grid-cols-[auto,1fr] gap-4 relative max-md:grid-cols-1 max-md:grid-rows-2">
      {/* {loading && (
        <div className="absolute inset-0 w-full h-full bg-gray-200/50 z-10 animate-pulse"></div>
      )} */}
      <Link to={`${titleLink}`}>
        {post.thumbnail && <Thumbnail $src={post.thumbnail} />}
      </Link>
      <div className="flex flex-col">
        <Link to={`${titleLink}`}>
          <div>
            <div className="flex gap-2">
              <p className="text-sm text-gray-500 mb-2">
                {new Date(post.created_at as string).toLocaleDateString(
                  undefined,
                  {
                    year: 'numeric',
                    month: 'short',
                    day: 'numeric',
                  }
                )}
              </p>
              <p className="text-gray-500 text-sm">
                #
                {post.category.charAt(0).toUpperCase() +
                  post.category.slice(1).toLowerCase()}
              </p>
            </div>
            <h2 className="text-3xl font-bold text-gray-700 max-md:text-2xl mb-2">
              {post.title}
            </h2>
            {post.content && (
              <p className="text-sm text-gray-700">
                {post.content
                  .split(' ')
                  .slice(0, 15)
                  .join(' ')
                  .replaceAll('//=//=//=//', '')}
                ....
              </p>
            )}
          </div>
        </Link>
      </div>
    </div>
  );
}
