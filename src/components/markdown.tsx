import ReactMarkdown from 'react-markdown';
import styled from 'styled-components';

export const Markdown = styled(ReactMarkdown)`
  h1 {
    font-family: inherit;
    scrollbar-width: thin;
    scrollbar-color: transparent transparent transparent #212529;
    color: #212529;
    margin-right: 0.5rem;
    font-size: 2.25rem; /* Equivalent to text-4xl in Tailwind */
    font-weight: 800; /* Equivalent to font-extrabold in Tailwind */
    letter-spacing: -0.025em; /* Equivalent to tracking-tight in Tailwind */
  }

  h2 {
    color: #343a40;
    font-family: inherit;
    scrollbar-width: thin;
    scrollbar-color: transparent transparent transparent #343a40;
    border-bottom-width: 1px;
    border-bottom-style: solid;
    padding-bottom: 0.5rem;
    font-size: 1.875rem; /* Equivalent to text-3xl in Tailwind */
    font-weight: 600; /* Equivalent to font-semibold in Tailwind */
    letter-spacing: -0.025em; /* Equivalent to tracking-tight in Tailwind */
    transition-property: background-color, border-color, color, fill, stroke;
    transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
    transition-duration: 150ms;
    margin-top: 18px;
  }

  h3 {
    color: #343a40;
    font-family: inherit;
    scrollbar-width: thin;
    scrollbar-color: transparent transparent transparent #343a40;
    font-size: 1.5rem; /* Equivalent to text-2xl in Tailwind */
    font-weight: 600; /* Equivalent to font-semibold in Tailwind */
    letter-spacing: -0.025em; /* Equivalent to tracking-tight in Tailwind */
    margin-top: 18px;
  }

  h4 {
    margin-top: 18px;
    color: #343a40;
    font-family: inherit;
    scrollbar-width: thin;
    scrollbar-color: transparent transparent transparent #000000;
    font-size: 1.25rem; /* Equivalent to text-xl in Tailwind CSS */
    font-weight: 600; /* Equivalent to font-semibold in Tailwind CSS */
    letter-spacing: -0.025em; /* Equivalent to tracking-tight in Tailwind CSS */
  }

  p {
    font-family: inherit;
    color: #495057;
    line-height: 1.75rem; /* Equivalent to leading-7 in Tailwind */
  }

  p:nth-child(n + 2) {
    font-family: inherit;
    margin-top: 1.5rem; /* Targets second and subsequent <p> elements */
  }

  a:link,
  a:visited {
    font-family: inherit;
    color: #007bff;
    text-decoration: underline;
  }

  ul {
    color: #495057;
    font-family: inherit;
    margin-top: 1.5rem; /* Equivalent to my-6 in Tailwind CSS */
    margin-left: 1.5rem; /* Equivalent to ml-6 in Tailwind CSS */
    list-style-type: disc; /* Equivalent to list-disc in Tailwind CSS */
  }

  ul > li {
    color: #495057;
    font-family: inherit;
    margin-top: 0.5rem; /* Equivalent to [&>li]:mt-2 in Tailwind CSS */
  }

  code {
    font-family: inherit;
    position: relative;
    display: inline-block;
    border-radius: 0.25rem; /* Equivalent to rounded in Tailwind CSS */
    background-color: #f0f0f0; /* Equivalent to bg-muted in Tailwind CSS */
    padding: 0.3rem 0.6rem; /* Equivalent to px-[0.3rem] py-[0.2rem] in Tailwind CSS */
    font-family: monospace; /* Equivalent to font-mono in Tailwind CSS */
    font-size: 0.875rem; /* Equivalent to text-sm in Tailwind CSS */
    font-weight: 600; /* Equivalent to font-semibold in Tailwind CSS */
  }

  blockquote {
    font-family: inherit;
    margin-top: 1.5rem; /* Equivalent to mt-6 in Tailwind CSS */
    border-left: 2px solid #000; /* Equivalent to border-l-2 in Tailwind CSS */
    padding-left: 1.5rem; /* Equivalent to pl-6 in Tailwind CSS */
    font-style: italic; /* Equivalent to italic in Tailwind CSS */
    color: #495057;
  }

  table {
    color: #343a40;
    font-family: inherit;
    width: 100%;
  }

  table th {
    font-family: inherit;
    margin: 0; /* Equivalent to m-0 in Tailwind CSS */
    border-top: 1px solid #000; /* Equivalent to border-t in Tailwind CSS */
    padding: 0; /* Equivalent to p-0 in Tailwind CSS */
    background-color: #f0f0f0; /* Equivalent to even:bg-muted in Tailwind CSS */
    text-align: center; /* Default text alignment for th elements */

    /* Custom alignments based on attributes */
    text-align: left;
  }

  table th[align='center'] {
    font-family: inherit;
    text-align: center;
  }

  table th[align='right'] {
    font-family: inherit;
    text-align: right;
  }

  table td {
    font-family: inherit;
    margin: 0; /* Equivalent to m-0 in Tailwind CSS */
    border-top: 1px solid #000; /* Equivalent to border-t in Tailwind CSS */
    padding: 0; /* Equivalent to p-0 in Tailwind CSS */
    background-color: #f0f0f0; /* Equivalent to even:bg-muted in Tailwind CSS */
    text-align: center; /* Default text alignment for td elements */

    /* Custom alignments based on attributes */
    text-align: left;
  }

  table td[align='center'] {
    font-family: inherit;
    text-align: center;
  }

  table td[align='right'] {
    font-family: inherit;
    text-align: right;
  }

  table th,
  table td {
    font-family: inherit;
    border: 1px solid #000; /* Equivalent to border in Tailwind CSS */
    padding: 0.5rem 1rem; /* Equivalent to px-4 py-2 in Tailwind CSS */
    font-weight: bold; /* Equivalent to font-bold in Tailwind CSS */
  }

  table tbody tr:nth-child(even) {
    font-family: inherit;
    background-color: #f0f0f0; /* Equivalent to even:bg-muted in Tailwind CSS */
  }

  @media (min-width: 1024px) {
    h1 {
      font-family: inherit;
      font-size: 2.5rem; /* Equivalent to lg:text-5xl in Tailwind for large screens */
    }
  }
`;
