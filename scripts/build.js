const { build } = require('vite');
const { join } = require('path');

const mode = (process.env.MODE = process.env.MODE || 'production');

(async () => {
  try {
    const totalTimeLabel = 'Total bundling time';
    console.time(totalTimeLabel);

    const timeLabel = 'Bundling time';
    console.time(timeLabel);

    await build({ configFile: join('src', 'renderer', 'vite.config.js'), mode });

    console.timeEnd(timeLabel);
    console.log('\n'); // Just for pretty print
    console.timeEnd(totalTimeLabel);
  } catch (e) {
    console.error(e);
    process.exit(1);
  }
})();
