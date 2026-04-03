import { motion, AnimatePresence } from 'framer-motion';
import { useState, useEffect, useMemo } from 'react';
import { prepare, layout } from '@chenglou/pretext';
import { securityPayloads } from '../data/securityPayloads';
import Layout from '../components/Layout';
import TechBackground from '../components/TechBackground';

// Generate some sample data based on the payloads
const allPayloads = securityPayloads.map((payloadGen, i) => {
  const content = payloadGen();
  return {
    id: i,
    content,
    title: `Payload Insight ${i + 1}`
  };
});

const PretextMasonryGallery = () => {
  const [columns, setColumns] = useState(3);
  const [containerWidth, setContainerWidth] = useState(1000); // default
  const [searchTerm, setSearchTerm] = useState('');
  const [columnOverride, setColumnOverride] = useState(null);

  useEffect(() => {
    const handleResize = () => {
      const width = document.getElementById('grid-container')?.offsetWidth || window.innerWidth - 64;
      setContainerWidth(width);
      
      // Responsive columns if not overridden
      if (width < 640) setColumns(1);
      else if (width < 1024) setColumns(2);
      else setColumns(3);
    };

    handleResize(); // Initial call
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Use Pretext to calculate precise heights BEFORE rendering
  const masonryLayout = useMemo(() => {
    const activeColumns = columnOverride || columns;
    // Calculate column width with gaps
    const gap = 24; // 1.5rem
    const columnWidth = (containerWidth - (gap * (activeColumns - 1))) / activeColumns;

    const colHeights = Array(activeColumns).fill(0);
    const positionedItems = [];

    const filteredPayloads = allPayloads.filter(p => 
      p.content.toLowerCase().includes(searchTerm.toLowerCase()) || 
      p.title.toLowerCase().includes(searchTerm.toLowerCase())
    );

    filteredPayloads.forEach((payload) => {
      // 1. Prepare text with pretext (Run once per text)
      // For precision, match CSS font style: font-mono text-sm leading-relaxed
      const preparedTitle = prepare(payload.title, 'bold 16px system-ui, sans-serif');
      const preparedContent = prepare(payload.content, '14px monospace', { whiteSpace: 'pre-wrap' });

      // 2. Layout (Pure Math)
      const titleDims = layout(preparedTitle, columnWidth - 32, 24); // 32 is padding, 24 is line-height
      const contentDims = layout(preparedContent, columnWidth - 32, 22);

      // Base padding + Borders + title height + content height + gap between
      const itemHeight = 32 + titleDims.height + 16 + contentDims.height + 16; 

      // Find shortest column
      const shortestColIndex = colHeights.indexOf(Math.min(...colHeights));

      // Position item
      positionedItems.push({
        ...payload,
        width: columnWidth,
        height: itemHeight,
        x: shortestColIndex * (columnWidth + gap),
        y: colHeights[shortestColIndex],
      });

      // Update column height
      colHeights[shortestColIndex] += itemHeight + gap;
    });

    return {
      items: positionedItems,
      totalHeight: Math.max(...colHeights, 0),
    };
  }, [containerWidth, columns, searchTerm, columnOverride]);

  return (
    <Layout>
      <TechBackground />

      <div className="max-w-6xl mx-auto px-6 pt-24 pb-12 relative z-10" id="grid-container">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-12"
        >
          <h1 className="text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-cyan-300">
            Pretext Live Animation
          </h1>
          <p className="mt-4 mb-8 text-zinc-400 max-w-2xl">
            Type to filter or change columns below. Watch as <strong>@chenglou/pretext</strong> paired with Framer Motion instantly recalculates heights and smoothly rearranges everything without DOM reflow spikes!
          </p>

          <div className="flex flex-col sm:flex-row gap-4 items-center">
            <input 
              type="text"
              placeholder="Search payloads..."
              className="bg-zinc-900/80 border border-cyan-500/30 rounded-lg px-4 py-2 w-full sm:w-64 text-zinc-200 outline-none focus:border-cyan-400 transition-colors"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <div className="flex gap-2 bg-zinc-900/80 p-1 rounded-lg border border-cyan-500/20">
              {[1, 2, 3, 4].map(num => (
                <button
                  key={num}
                  className={`px-4 py-1.5 rounded-md text-sm font-semibold transition-colors ${(columnOverride || columns) === num ? 'bg-cyan-500/20 text-cyan-300' : 'text-zinc-500 hover:text-zinc-300'}`}
                  onClick={() => setColumnOverride(num)}
                >
                  {num} Col
                </button>
              ))}
              <button
                className={`px-4 py-1.5 rounded-md text-sm font-semibold transition-colors ${!columnOverride ? 'bg-cyan-500/20 text-cyan-300' : 'text-zinc-500 hover:text-zinc-300'}`}
                onClick={() => setColumnOverride(null)}
              >
                Auto {columns}
              </button>
            </div>
          </div>
        </motion.div>

        <div 
          className="relative w-full transition-all duration-500 ease-out"
          style={{ height: masonryLayout.totalHeight }}
        >
          <AnimatePresence>
            {masonryLayout.items.map((item, i) => (
              <motion.div
                key={item.id}
                layout
                initial={{ opacity: 0, scale: 0.8, x: item.x, y: item.y + 20 }}
                animate={{ 
                  opacity: 1, 
                  scale: 1,
                  x: item.x,
                  y: item.y,
                  width: item.width,
                  height: item.height
                }}
                exit={{ opacity: 0, scale: 0.8, filter: 'blur(5px)', transition: { duration: 0.2 } }}
                transition={{ 
                  type: "spring", 
                  stiffness: 250, 
                  damping: 25,
                  opacity: { delay: Math.min(i * 0.05, 0.5), duration: 0.3 }
                }}
                className="absolute top-0 left-0 bg-zinc-900/50 backdrop-blur-xl border border-cyan-500/20 rounded-xl p-4 overflow-hidden shadow-[0_0_20px_rgba(6,182,212,0.1)] hover:shadow-[0_0_30px_rgba(6,182,212,0.3)] hover:border-cyan-400/50 hover:bg-zinc-800/80 hover:z-20 cursor-pointer"
              >
                <h3 className="text-zinc-100 font-bold mb-4">{item.title}</h3>
                <div className="font-mono text-sm text-cyan-400/80 leading-[22px] break-all whitespace-pre-wrap">
                  {item.content}
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      </div>
    </Layout>
  );
};

export default PretextMasonryGallery;
