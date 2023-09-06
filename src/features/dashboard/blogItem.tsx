import { Link } from 'react-router-dom';
import { styled } from 'styled-components';
import { Separator } from '@/components/ui/separator';

interface BlogItemProps {
  thumbnail: string;
  title: string;
  createdAt: string;
  content: string;
  id: string;
}

const Thumbnail = styled.div<{ $src: string }>`
  width: 300px;
  height: 200px;
  background-image: url(${(props) => props.$src});
  background-size: cover;
  background-position: center;
`;

export default function BlogItem({
  thumbnail,
  title,
  createdAt,
  id,
}: BlogItemProps) {
  return (
    <div>
      <Link to={`${id}`} className="grid grid-cols-[auto,1fr] gap-4">
        <Thumbnail $src={thumbnail} />
        <div className="flex flex-col">
          <div>
            <p className="text-sm text-gray-500 mb-2">
              {new Date(createdAt as string).toLocaleDateString(undefined, {
                year: 'numeric',
                month: 'short',
                day: 'numeric',
              })}
            </p>
            <h2 className="text-3xl font-bold text-gray-700">{title}</h2>
            {/* <p>{content}</p> */}
          </div>
          <div className="mt-auto">
            <Separator />
            <p className="text-sm text-gray-500">Read More</p>
          </div>
        </div>
      </Link>
    </div>
  );
}
