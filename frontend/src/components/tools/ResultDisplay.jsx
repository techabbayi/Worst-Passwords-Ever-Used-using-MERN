import { CheckCircle, AlertTriangle, XCircle, Info } from 'lucide-react';

const ResultDisplay = ({ type = 'info', title, message, details }) => {
  const styles = {
    safe: {
      bg: 'bg-green-50 dark:bg-green-900/20',
      border: 'border-green-200 dark:border-green-800',
      text: 'text-green-800 dark:text-green-300',
      icon: <CheckCircle className="text-green-600 dark:text-green-400" size={24} />
    },
    warning: {
      bg: 'bg-yellow-50 dark:bg-yellow-900/20',
      border: 'border-yellow-200 dark:border-yellow-800',
      text: 'text-yellow-800 dark:text-yellow-300',
      icon: <AlertTriangle className="text-yellow-600 dark:text-yellow-400" size={24} />
    },
    danger: {
      bg: 'bg-red-50 dark:bg-red-900/20',
      border: 'border-red-200 dark:border-red-800',
      text: 'text-red-800 dark:text-red-300',
      icon: <XCircle className="text-red-600 dark:text-red-400" size={24} />
    },
    info: {
      bg: 'bg-blue-50 dark:bg-blue-900/20',
      border: 'border-blue-200 dark:border-blue-800',
      text: 'text-blue-800 dark:text-blue-300',
      icon: <Info className="text-blue-600 dark:text-blue-400" size={24} />
    }
  };

  const style = styles[type] || styles.info;

  return (
    <div className={`${style.bg} ${style.border} border rounded-lg p-6 ${style.text}`}>
      <div className="flex items-start gap-3">
        <div className="flex-shrink-0 mt-1">{style.icon}</div>
        <div className="flex-1">
          {title && <h3 className="font-bold text-lg mb-2">{title}</h3>}
          {message && <p className="mb-3">{message}</p>}
          {details && (
            <div className="mt-3 text-sm opacity-90">
              {details}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ResultDisplay;
