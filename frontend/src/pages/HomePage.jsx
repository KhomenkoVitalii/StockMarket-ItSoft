import { useEffect, useState } from "react";
import ReactMarkdown from 'react-markdown';
import './HomePage.scss';

const HomePage = () => {
    const [markdownContent, setMarkdownContent] = useState('');

    useEffect(() => {
        fetch('http://localhost:5173/README.md')
            .then(response => response.text())
            .then(text => setMarkdownContent(text))
            .catch(error => console.error('Error fetching Markdown file:', error));
    }, []);

    return (
        <div className="description">
            <ReactMarkdown>{markdownContent}</ReactMarkdown>
        </div>
    )
}

export default HomePage;