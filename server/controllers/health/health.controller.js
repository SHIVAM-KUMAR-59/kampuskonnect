import os from 'os';

const bytes = (b) => `${(b / 1024 / 1024).toFixed(2)} MB`;

const healthController = (req, res) => {
  const mem = process.memoryUsage();
  const uptime = process.uptime();
  const h = Math.floor(uptime / 3600);
  const m = Math.floor((uptime % 3600) / 60);
  const s = Math.floor(uptime % 60);

  res.json({
    status: 'OK',
    environment: process.env.NODE_ENV || 'development',
    timestamp: new Date().toISOString(),
    uptime: `${h}h ${m}m ${s}s`,

    server: {
      hostname: os.hostname(),
      platform: process.platform,
      arch: process.arch,
      node: process.version,
      pid: process.pid,
      cpus: os.cpus().length,
    },

    memory: {
      system: {
        total: bytes(os.totalmem()),
        free: bytes(os.freemem()),
        used: bytes(os.totalmem() - os.freemem()),
      },
      process: {
        heapUsed: bytes(mem.heapUsed),
        heapTotal: bytes(mem.heapTotal),
        rss: bytes(mem.rss),
        external: bytes(mem.external),
      },
    },

    load: {
      average: os.loadavg().map((l) => parseFloat(l.toFixed(2))),
      cores: os.cpus().length,
    },
  });
};

export default healthController;