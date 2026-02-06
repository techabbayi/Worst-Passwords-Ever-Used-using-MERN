import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

const ToolCard = ({ icon, title, description, link, color = 'blue' }) => {
  const colorClasses = {
    blue: 'from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700',
    green: 'from-green-500 to-green-600 hover:from-green-600 hover:to-green-700',
    purple: 'from-purple-500 to-purple-600 hover:from-purple-600 hover:to-purple-700',
    orange: 'from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700',
    red: 'from-red-500 to-red-600 hover:from-red-600 hover:to-red-700',
    cyan: 'from-cyan-500 to-cyan-600 hover:from-cyan-600 hover:to-cyan-700',
  };

  return (
    <motion.div
      whileHover={{ scale: 1.03 }}
      whileTap={{ scale: 0.98 }}
      className="h-full"
    >
      <Link to={link} className="block h-full">
        <div className={`h-full bg-gradient-to-br ${colorClasses[color]} p-6 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 text-white`}>
          <div className="flex items-center gap-3 mb-3">
            <div className="text-3xl">{icon}</div>
            <h3 className="text-xl font-bold">{title}</h3>
          </div>
          <p className="text-white/90 text-sm leading-relaxed">{description}</p>
        </div>
      </Link>
    </motion.div>
  );
};

export default ToolCard;
