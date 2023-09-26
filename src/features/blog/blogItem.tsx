import { Link } from 'react-router-dom';
import { styled } from 'styled-components';
import { Separator } from '@/components/ui/separator';

interface BlogItemProps {
  thumbnail: string;
  title: string;
  createdAt: string;
  content: string;
  id: string;
  children?: React.ReactNode;
  loading?: boolean;
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

export default function BlogItem({
  thumbnail,
  title,
  createdAt,
  children,
  loading,
  content,
}: BlogItemProps) {
  const titleLink = title.replaceAll(' ', '_');
  return (
    <div className="grid grid-cols-[auto,1fr] gap-4 relative max-md:grid-cols-1 max-md:grid-rows-2">
      {loading && (
        <div className="absolute inset-0 w-full h-full bg-gray-200/50 z-10 animate-pulse"></div>
      )}
      <Link to={`${titleLink}`}>
        <Thumbnail $src={thumbnail} />
      </Link>
      <div className="flex flex-col">
        <Link to={`${titleLink}`}>
          <div>
            <p className="text-sm text-gray-500 mb-2">
              {new Date(createdAt as string).toLocaleDateString(undefined, {
                year: 'numeric',
                month: 'short',
                day: 'numeric',
              })}
            </p>
            <h2 className="text-3xl font-bold text-gray-700 max-md:text-2xl mb-2">
              {title}
            </h2>
            <p className="text-sm text-gray-700">
              {content.split(' ').slice(0, 15).join(' ')}....
            </p>
          </div>
        </Link>
        {children && (
          <div className="mt-auto space-y-2">
            <Separator />
            {children}
          </div>
        )}
      </div>
    </div>
  );
}
