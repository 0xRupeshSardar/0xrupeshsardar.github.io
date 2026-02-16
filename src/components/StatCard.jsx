import { motion } from 'framer-motion';

const StatCard = ({ icon, label, value, trend, delay = 0 }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay, duration: 0.5 }}
      whileHover={{ y: -5, transition: { duration: 0.2 } }}
      className="relative group"
    >
      <div className="glass-effect rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 border border-zinc-200/50 dark:border-zinc-800/50">
        {/* Icon */}
        <div className="mb-4 inline-flex items-center justify-center w-12 h-12 rounded-xl bg-primary-100 dark:bg-primary-900/30 text-primary-600 dark:text-primary-400 group-hover:scale-110 transition-transform duration-300">
          {icon}
        </div>

        {/* Label */}
        <div className="text-sm font-medium text-zinc-600 dark:text-zinc-400 mb-2">
          {label}
        </div>

        {/* Value */}
        <div className="text-3xl font-bold text-zinc-900 dark:text-zinc-50 mb-2">
          {value}
        </div>

        {/* Trend */}
        {trend && (
          <div className={`text-xs font-medium ${
            trend.positive 
              ? 'text-green-600 dark:text-green-400' 
              : 'text-red-600 dark:text-red-400'
          }`}>
            {trend.positive ? '↗' : '↘'} {trend.value}
          </div>
        )}

        {/* Hover Effect */}
        <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-primary-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
      </div>
    </motion.div>
  );
};

export default StatCard;
