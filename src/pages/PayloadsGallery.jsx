import { motion } from 'framer-motion';
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

  useEffect(() => {
    const handleResize = () => {
      const width = document.getElementById('grid-container')?.offsetWidth || window.innerWidth - 64;
      setContainerWidth(width);
      
      // Responsive columns
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
    // Calculate column width with gaps
    const gap = 24; // 1.5rem
    const columnWidth = (containerWidth - (gap * (columns - 1))) / columns;

    const colHeights = Array(columns).fill(0);
    const positionedItems = [];

    allPayloads.forEach((payload) => {
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
  }, [containerWidth, columns]);

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
            Pretext-Powered Masonry
          </h1>
          <p className="mt-4 text-zinc-400 max-w-2xl">
            This entire grid is perfectly laid out using <strong>@chenglou/pretext</strong>. 
            All text heights are calculated in JavaScript <em>before</em> the DOM is updated, 
            creating zero layout shift and immense performance gains.
          </p>
        </motion.div>

        <div 
          className="relative w-full"
          style={{ height: masonryLayout.totalHeight }}
        >
          {masonryLayout.items.map((item, i) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: i * 0.05, duration: 0.4 }}
              className="absolute top-0 left-0 bg-zinc-900/50 backdrop-blur-md border border-white/10 rounded-xl p-4 overflow-hidden"
              style={{
                width: item.width,
                height: item.height,
                transform: `translate(${item.x}px, ${item.y}px)`,
              }}
            >
              <h3 className="text-zinc-100 font-bold mb-4">{item.title}</h3>
              <div className="font-mono text-sm text-cyan-400/80 leading-[22px] break-all whitespace-pre-wrap">
                {item.content}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </Layout>
  );
};

export default PretextMasonryGallery;
