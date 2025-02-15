'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Card } from './card';

export const CardSlider = () => {
  return (
    <div className="w-full overflow-hidden py-12">
      <motion.div
        className="flex gap-6 card-slider"
        animate={{
          x: [0, -1000],
        }}
        transition={{
          duration: 20,
          repeat: Infinity,
          ease: "linear"
        }}
      >
        {[1, 2, 3, 4, 5].map((item) => (
          <Card key={item} className="min-w-[300px]">
            <div className="p-6">
              <h3 className="text-xl font-semibold mb-2">Feature {item}</h3>
              <p className="text-muted-foreground">
                Description for feature {item}
              </p>
            </div>
          </Card>
        ))}
      </motion.div>
    </div>
  );
};
