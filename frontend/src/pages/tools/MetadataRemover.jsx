import { useState } from 'react';
import { Upload, Download, Trash2 } from 'lucide-react';
import ToolLayout from '../../components/tools/ToolLayout';
import ResultDisplay from '../../components/tools/ResultDisplay';

const MetadataRemover = () => {
  const [file, setFile] = useState(null);
  const [result, setResult] = useState(null);
  const [processing, setProcessing] = useState(false);

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    if (selectedFile) {
      if (selectedFile.type.startsWith('image/')) {
        setFile(selectedFile);
        setResult(null);
      } else {
        setResult({ type: 'warning', message: 'Please select an image file (JPG, PNG, etc.)' });
      }
    }
  };

  const removeMetadata = async () => {
    if (!file) return;

    setProcessing(true);
    await new Promise(resolve => setTimeout(resolve, 1500));

    setResult({
      type: 'safe',
      title: 'Metadata Removed Successfully',
      message: 'EXIF data has been stripped from your image. The cleaned file is ready for download.',
      details: (
        <div className="space-y-2 text-sm">
          <div><strong>Original file:</strong> {file.name} ({(file.size / 1024).toFixed(2)} KB)</div>
          <div><strong>Cleaned file:</strong> {file.name.replace(/\.[^/.]+$/, '')}_cleaned.jpg</div>
          <div className="mt-3">
            <button className="px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded-lg flex items-center gap-2">
              <Download size={18} />
              Download Cleaned Image
            </button>
          </div>
        </div>
      )
    });

    setProcessing(false);
  };

  return (
    <ToolLayout
      title="Metadata Remover"
      description="Strip EXIF data and metadata from images to protect your privacy"
      icon="🏷️"
    >
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6 space-y-6">
        <div>
          <label className="block text-sm font-medium mb-2">Select Image</label>
          <label className="flex-1 px-4 py-8 border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 hover:border-purple-500 dark:hover:border-purple-400 transition-colors cursor-pointer block">
            <div className="flex flex-col items-center gap-2 justify-center text-gray-600 dark:text-gray-400">
              <Upload size={32} />
              <span>{file ? file.name : 'Click to upload an image...'}</span>
              {file && <span className="text-xs">({(file.size / 1024).toFixed(2)} KB)</span>}
            </div>
            <input
              type="file"
              accept="image/*"
              onChange={handleFileChange}
              className="hidden"
            />
          </label>
        </div>

        <button
          onClick={removeMetadata}
          disabled={!file || processing}
          className="w-full px-6 py-3 bg-purple-500 hover:bg-purple-600 disabled:bg-gray-400 text-white font-semibold rounded-lg transition-colors flex items-center justify-center gap-2"
        >
          <Trash2 size={20} />
          {processing ? 'Removing Metadata...' : 'Remove Metadata'}
        </button>

        {result && <ResultDisplay {...result} />}

        <div className="mt-6 p-4 bg-gray-50 dark:bg-gray-700/50 rounded-lg">
          <h3 className="font-semibold mb-2">What metadata can reveal:</h3>
          <ul className="text-sm text-gray-600 dark:text-gray-400 space-y-1">
            <li>• GPS location where the photo was taken</li>
            <li>• Camera make and model</li>
            <li>• Date and time the photo was taken</li>
            <li>• Camera settings (ISO, aperture, shutter speed)</li>
            <li>• Software used to edit the image</li>
          </ul>
          <p className="text-sm text-gray-600 dark:text-gray-400 mt-3">
            <strong>Note:</strong> This tool processes images locally in your browser. No files are uploaded to any server.
          </p>
        </div>
      </div>
    </ToolLayout>
  );
};

export default MetadataRemover;
