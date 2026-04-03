import { motion } from 'framer-motion';

const StatCard = ({ icon, label, value, delay = 0 }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay, duration: 0.4 }}
      className="card-tech p-5"
    >
      <div className="flex items-center gap-3 mb-2">
        <div className="w-8 h-8 rounded-lg bg-zinc-100 dark:bg-zinc-800 flex items-center justify-center text-zinc-600 dark:text-zinc-400">
          {icon}
        </div>
        <span className="text-sm text-zinc-500 dark:text-zinc-400">{label}</span>
      </div>
      <div className="text-2xl font-bold text-zinc-900 dark:text-zinc-50">{value}</div>
    </motion.div>
  );
};

export default StatCard;
