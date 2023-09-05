import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';

const markdown = `Just a link: https://reactjs.com.`;

function Blog() {
  return (
    <div>
      <ReactMarkdown children={markdown} remarkPlugins={[remarkGfm]} />
    </div>
  );
}

export default Blog;
