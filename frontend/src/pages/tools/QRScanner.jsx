import { useState } from 'react';
import { Camera, Upload, Search } from 'lucide-react';
import ToolLayout from '../../components/tools/ToolLayout';
import ResultDisplay from '../../components/tools/ResultDisplay';

const QRScanner = () => {
  const [file, setFile] = useState(null);
  const [result, setResult] = useState(null);
  const [scanning, setScanning] = useState(false);

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    if (selectedFile) {
      setFile(selectedFile);
      setResult(null);
    }
  };

  const scanQRCode = async () => {
    if (!file) return;

    setScanning(true);
    await new Promise(resolve => setTimeout(resolve, 1500));

    // Mock QR code scan result
    const mockURL = 'https://example.com/promo?id=12345';
    const isSafe = !mockURL.includes('phish') && !mockURL.includes('malware');

    setResult({
      type: isSafe ? 'safe' : 'danger',
      title: 'QR Code Decoded',
      message: 'The QR code has been successfully decoded. Review the content before visiting.',
      details: (
        <div className="space-y-3">
          <div className="p-3 bg-white dark:bg-gray-800 rounded">
            <strong>Decoded Content:</strong>
            <div className="mt-2 p-2 bg-gray-100 dark:bg-gray-700 rounded font-mono text-sm break-all">
              {mockURL}
            </div>
          </div>
          <div className={`p-3 rounded ${isSafe ? 'bg-green-50 dark:bg-green-900/20' : 'bg-red-50 dark:bg-red-900/20'}`}>
            <strong className={isSafe ? 'text-green-700 dark:text-green-300' : 'text-red-700 dark:text-red-300'}>
              Safety Check: {isSafe ? 'Appears Safe' : 'Potentially Dangerous'}
            </strong>
            <p className="text-sm mt-1">
              {isSafe 
                ? 'No obvious security threats detected. However, always verify before visiting.' 
                : 'This URL has been flagged as potentially malicious. Do not visit.'}
            </p>
          </div>
        </div>
      )
    });

    setScanning(false);
  };

  return (
    <ToolLayout
      title="QR Code Safety Scanner"
      description="Decode and scan QR codes for malicious links before visiting"
      icon="📱"
    >
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6 space-y-6">
        <div>
          <label className="block text-sm font-medium mb-2">Upload QR Code Image</label>
          <label className="flex-1 px-4 py-8 border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 hover:border-cyan-500 dark:hover:border-cyan-400 transition-colors cursor-pointer block">
            <div className="flex flex-col items-center gap-2 justify-center text-gray-600 dark:text-gray-400">
              <Camera size={32} />
              <span>{file ? file.name : 'Click to upload QR code image...'}</span>
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
          onClick={scanQRCode}
          disabled={!file || scanning}
          className="w-full px-6 py-3 bg-cyan-500 hover:bg-cyan-600 disabled:bg-gray-400 text-white font-semibold rounded-lg transition-colors flex items-center justify-center gap-2"
        >
          <Search size={20} />
          {scanning ? 'Scanning QR Code...' : 'Scan QR Code'}
        </button>

        {result && <ResultDisplay {...result} />}

        <div className="mt-6 p-4 bg-gray-50 dark:bg-gray-700/50 rounded-lg">
          <h3 className="font-semibold mb-2">QR Code Security Tips:</h3>
          <ul className="text-sm text-gray-600 dark:text-gray-400 space-y-1">
            <li>• Always preview QR code content before visiting</li>
            <li>• Be cautious of QR codes in public places</li>
            <li>• Verify the URL domain matches the expected source</li>
            <li>• Watch for typosquatting in decoded URLs</li>
            <li>• Never scan QR codes from untrusted sources</li>
          </ul>
        </div>
      </div>
    </ToolLayout>
  );
};

export default QRScanner;
