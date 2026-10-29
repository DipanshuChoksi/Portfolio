import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';

export default function RenderMarkdown({ title, content }: { title?: string; content: string }) {
    return (
        <div className="prose prose-lg dark:prose-invert max-w-none border border-transparent p-4">
            {title && <h1 className="mb-6 font-bold text-4xl">{title}</h1>}
            <ReactMarkdown
                remarkPlugins={[remarkGfm]}
                components={{
                    table: ({ node, ...props }) => (
                        <div className="my-6 w-full overflow-x-auto rounded-lg border border-border">
                            <table className="w-full my-0 border-collapse text-sm" {...props} />
                        </div>
                    ),
                    thead: ({ node, ...props }) => (
                        <thead className="bg-muted/50 border-b border-border" {...props} />
                    ),
                    th: ({ node, ...props }) => (
                        <th className="px-4 py-3 text-left font-semibold text-foreground border-r last:border-r-0 border-border" {...props} />
                    ),
                    td: ({ node, ...props }) => (
                        <td className="px-4 py-3 align-top border-t border-r last:border-r-0 border-border" {...props} />
                    ),
                }}
            >
                {content}
            </ReactMarkdown>
        </div>
    );
}
