import { useState } from 'react';
import { CheckCircle, Upload } from 'lucide-react';
import ToolLayout from '../../components/tools/ToolLayout';
import ResultDisplay from '../../components/tools/ResultDisplay';

const ChecksumValidator = () => {
  const [file, setFile] = useState(null);
  const [expectedChecksum, setExpectedChecksum] = useState('');
  const [algorithm, setAlgorithm] = useState('SHA-256');
  const [result, setResult] = useState(null);
  const [calculating, setCalculating] = useState(false);

  const calculateChecksum = async () => {
    if (!file) {
      setResult({ type: 'warning', message: 'Please select a file to validate.' });
      return;
    }

    setCalculating(true);
    setResult(null);

    try {
      const arrayBuffer = await file.arrayBuffer();
      let hashBuffer;

      switch (algorithm) {
        case 'SHA-1':
          hashBuffer = await crypto.subtle.digest('SHA-1', arrayBuffer);
          break;
        case 'SHA-256':
          hashBuffer = await crypto.subtle.digest('SHA-256', arrayBuffer);
          break;
        case 'SHA-512':
          hashBuffer = await crypto.subtle.digest('SHA-512', arrayBuffer);
          break;
        default:
          hashBuffer = await crypto.subtle.digest('SHA-256', arrayBuffer);
      }

      const hashArray = Array.from(new Uint8Array(hashBuffer));
      const calculatedHash = hashArray.map(b => b.toString(16).padStart(2, '0')).join('');

      if (expectedChecksum) {
        const match = calculatedHash.toLowerCase() === expectedChecksum.toLowerCase().trim();
        setResult({
          type: match ? 'safe' : 'danger',
          title: match ? 'Checksum Match!' : 'Checksum Mismatch!',
          message: match 
            ? 'The file checksum matches the expected value. The file is intact and has not been tampered with.'
            : 'The file checksum does NOT match the expected value. The file may be corrupted or tampered with.',
          details: (
            <div className="space-y-2 mt-3">
              <div>
                <strong>Calculated {algorithm}:</strong>
                <div className="font-mono text-xs break-all mt-1 p-2 bg-white dark:bg-gray-800 rounded">
                  {calculatedHash}
                </div>
              </div>
              <div>
                <strong>Expected {algorithm}:</strong>
                <div className="font-mono text-xs break-all mt-1 p-2 bg-white dark:bg-gray-800 rounded">
                  {expectedChecksum}
                </div>
              </div>
            </div>
          )
        });
      } else {
        setResult({
          type: 'info',
          title: 'Checksum Calculated',
          message: `The ${algorithm} checksum for your file has been calculated.`,
          details: (
            <div>
              <strong>File: </strong>{file.name} ({(file.size / 1024).toFixed(2)} KB)
              <div className="font-mono text-xs break-all mt-2 p-3 bg-white dark:bg-gray-800 rounded">
                {calculatedHash}
              </div>
            </div>
          )
        });
      }
    } catch {
      setResult({
        type: 'danger',
        title: 'Error',
        message: 'Failed to calculate checksum. Please try again.'
      });
    } finally {
      setCalculating(false);
    }
  };

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    if (selectedFile) {
      setFile(selectedFile);
      setResult(null);
    }
  };

  return (
    <ToolLayout
      title="Checksum Validator"
      description="Verify file integrity by calculating and comparing checksums"
      icon="✓"
    >
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6 space-y-6">
        {/* File Upload */}
        <div>
          <label className="block text-sm font-medium mb-2">Select File</label>
          <div className="flex items-center gap-3">
            <label className="flex-1 px-4 py-3 border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white hover:border-blue-500 dark:hover:border-blue-400 transition-colors cursor-pointer">
              <div className="flex items-center gap-2 justify-center">
                <Upload size={20} />
                <span>{file ? file.name : 'Choose a file...'}</span>
              </div>
              <input
                type="file"
                onChange={handleFileChange}
                className="hidden"
              />
            </label>
          </div>
          {file && (
            <p className="text-xs text-gray-500 dark:text-gray-400 mt-2">
              File size: {(file.size / 1024).toFixed(2)} KB
            </p>
          )}
        </div>

        {/* Algorithm Selection */}
        <div>
          <label className="block text-sm font-medium mb-2">Hash Algorithm</label>
          <select
            value={algorithm}
            onChange={(e) => setAlgorithm(e.target.value)}
            className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 outline-none"
          >
            <option value="SHA-1">SHA-1</option>
            <option value="SHA-256">SHA-256</option>
            <option value="SHA-512">SHA-512</option>
          </select>
        </div>

        {/* Expected Checksum (Optional) */}
        <div>
          <label className="block text-sm font-medium mb-2">
            Expected Checksum (Optional)
          </label>
          <input
            type="text"
            value={expectedChecksum}
            onChange={(e) => setExpectedChecksum(e.target.value)}
            placeholder="Paste expected checksum to validate..."
            className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 outline-none font-mono text-sm"
          />
          <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
            Leave empty to only calculate the checksum
          </p>
        </div>

        <button
          onClick={calculateChecksum}
          disabled={!file || calculating}
          className="w-full px-6 py-3 bg-blue-500 hover:bg-blue-600 disabled:bg-gray-400 text-white font-semibold rounded-lg transition-colors flex items-center justify-center gap-2"
        >
          <CheckCircle size={20} />
          {calculating ? 'Calculating...' : expectedChecksum ? 'Validate Checksum' : 'Calculate Checksum'}
        </button>

        {/* Result Section */}
        {result && <ResultDisplay {...result} />}

        {/* Information */}
        <div className="mt-6 p-4 bg-gray-50 dark:bg-gray-700/50 rounded-lg">
          <h3 className="font-semibold mb-2">How to use:</h3>
          <ol className="text-sm text-gray-600 dark:text-gray-400 space-y-1 list-decimal list-inside">
            <li>Select the file you want to verify</li>
            <li>Choose the hash algorithm (usually provided by the source)</li>
            <li>Paste the expected checksum (from download page or documentation)</li>
            <li>Click "Validate Checksum" to compare</li>
          </ol>
          <p className="text-sm text-gray-600 dark:text-gray-400 mt-3">
            <strong>Note:</strong> Files are processed locally in your browser and never uploaded to any server.
          </p>
        </div>
      </div>
    </ToolLayout>
  );
};

export default ChecksumValidator;
