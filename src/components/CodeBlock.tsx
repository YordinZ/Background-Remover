import { useMemo, useState } from "react";
import rawCode from "../code/background.py?raw";

const highlightCode = (line: string): string => {
  // 1) Comentarios primero (para no romperlos)
  const commentMatch = line.match(/#.*/);
  const comment = commentMatch ? commentMatch[0] : "";
  const codePart = commentMatch ? line.slice(0, commentMatch.index) : line;

  const highlighted = codePart
    // Strings (dobles o simples)
    .replace(/(".*?"|'.*?')/g, '<span class="text-green-400">$1</span>')
    // Keywords python
    .replace(
      /\b(from|import|def|return|if|else|elif|for|while|in|as|True|False|None)\b/g,
      '<span class="text-orange-400">$1</span>'
    )
    // Identificadores clave
    .replace(
      /\b(remove_background|remove|st|uploaded|result|image)\b/g,
      '<span class="text-blue-400">$1</span>'
    );

  // Adjuntar comentario al final (si existe)
  return comment
    ? highlighted + comment.replace(/#.*/g, '<span class="text-gray-600">$&</span>')
    : highlighted;
};

const CodeBlock = () => {
  const [copied, setCopied] = useState(false);

  const lines = useMemo(() => rawCode.replace(/\r\n/g, "\n").split("\n"), []);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(rawCode);
      setCopied(true);
      setTimeout(() => setCopied(false), 1200);
    } catch {
      // fallback silencioso
    }
  };

  return (
    <div className="relative group">
      <div className="bg-gray-900 rounded-xl overflow-hidden border border-gray-700 shadow-2xl">
        <div className="flex items-center gap-2 px-4 py-3 bg-gray-950 border-b border-gray-800">
          <div className="flex gap-1.5">
            <div className="w-3 h-3 rounded-full bg-red-500" />
            <div className="w-3 h-3 rounded-full bg-yellow-500" />
            <div className="w-3 h-3 rounded-full bg-green-500" />
          </div>

          <span className="text-sm text-gray-500 ml-2">background.py</span>

          <button
            onClick={handleCopy}
            className="ml-auto text-gray-500 hover:text-gray-300 text-xs transition-colors"
            type="button"
          >
            {copied ? "Copiado ✓" : "Copiar"}
          </button>
        </div>

        <div className="p-6 font-mono text-sm overflow-x-auto max-h-[520px] overflow-y-auto">
          <pre className="text-gray-300">
            <code>
              {lines.map((line, i) => (
                <div
                  key={i}
                  className="whitespace-pre hover:bg-gray-800/50 transition-colors rounded"
                >
                  <span className="inline-block w-8 text-gray-600 select-none text-right mr-4">
                    {i + 1}
                  </span>
                  <span dangerouslySetInnerHTML={{ __html: highlightCode(line) }} />
                </div>
              ))}
            </code>
          </pre>
        </div>
      </div>
    </div>
  );
};

export default CodeBlock;
