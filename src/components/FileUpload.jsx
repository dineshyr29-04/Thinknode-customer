import { useRef, useState } from 'react';

const MAX_SIZE_MB = 10;
const ACCEPTED = 'image/*,.pdf,.doc,.docx,.zip,.rar,.txt';

function formatSize(bytes) {
  if (bytes < 1024) return `${bytes} B`;
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
  return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
}

function fileIcon(file) {
  if (file.type.startsWith('image/')) return '🖼️';
  if (file.type.includes('pdf')) return '📄';
  if (file.type.includes('word') || file.type.includes('document')) return '📝';
  if (file.type.includes('zip') || file.type.includes('rar')) return '📦';
  return '📎';
}

export default function FileUpload({ files, onChange }) {
  const inputRef = useRef(null);
  const [dragOver, setDragOver] = useState(false);

  const addFiles = (incoming) => {
    const valid = Array.from(incoming).filter(
      (f) => f.size <= MAX_SIZE_MB * 1024 * 1024,
    );
    onChange([...files, ...valid]);
  };

  const remove = (i) => onChange(files.filter((_, idx) => idx !== i));

  return (
    <div>
      {/* Drop zone */}
      <div
        onDragOver={(e) => { e.preventDefault(); setDragOver(true); }}
        onDragLeave={() => setDragOver(false)}
        onDrop={(e) => { e.preventDefault(); setDragOver(false); addFiles(e.dataTransfer.files); }}
        onClick={() => inputRef.current?.click()}
        className={`border-2 border-dashed rounded-xl p-8 text-center cursor-pointer transition-colors ${
          dragOver
            ? 'border-indigo-400 bg-indigo-50'
            : 'border-gray-200 hover:border-indigo-300 hover:bg-gray-50'
        }`}
      >
        <div className="text-3xl mb-2">☁️</div>
        <p className="text-slate-600 font-medium text-sm">
          Drag & drop files here or{' '}
          <span className="text-indigo-600 underline">browse</span>
        </p>
        <p className="text-slate-400 text-xs mt-1">
          Images, PDFs, documents — max {MAX_SIZE_MB} MB each
        </p>
        <input
          ref={inputRef}
          type="file"
          multiple
          accept={ACCEPTED}
          className="hidden"
          onChange={(e) => addFiles(e.target.files)}
        />
      </div>

      {/* Preview grid */}
      {files.length > 0 && (
        <div className="mt-4 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
          {files.map((file, i) => {
            const isImg = file.type.startsWith('image/');
            const preview = isImg ? URL.createObjectURL(file) : null;
            return (
              <div
                key={i}
                className="relative group rounded-xl border border-gray-100 overflow-hidden bg-gray-50"
              >
                {preview ? (
                  <img src={preview} alt={file.name} className="w-full h-24 object-cover" />
                ) : (
                  <div className="w-full h-24 flex items-center justify-center text-3xl">
                    {fileIcon(file)}
                  </div>
                )}
                <div className="p-2">
                  <p className="text-xs text-slate-700 truncate font-medium">{file.name}</p>
                  <p className="text-xs text-slate-400">{formatSize(file.size)}</p>
                </div>
                <button
                  type="button"
                  onClick={(e) => { e.stopPropagation(); remove(i); }}
                  className="absolute top-1.5 right-1.5 w-6 h-6 rounded-full bg-red-500 text-white text-xs flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity hover:bg-red-600"
                >
                  ×
                </button>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
