/**
 * Копирует content-types (schema.json и т.п.) из src в dist,
 * чтобы после tsc в dist были и .js, и схемы.
 * Вызывается из патча develop.js после tsUtils.compile.
 */
const path = require('path');
const fse = require('fs-extra');

async function copyContentTypes({ cwd, distDir }) {
  const srcApi = path.join(cwd, 'src', 'api');
  const distApi = path.join(distDir, 'src', 'api');
  if (!(await fse.pathExists(srcApi))) return;

  const apiDirs = await fse.readdir(srcApi, { withFileTypes: true });
  for (const fd of apiDirs) {
    if (!fd.isDirectory()) continue;
    const contentTypesSrc = path.join(srcApi, fd.name, 'content-types');
    if (!(await fse.pathExists(contentTypesSrc))) continue;
    const contentTypesDist = path.join(distApi, fd.name, 'content-types');
    await fse.ensureDir(path.dirname(contentTypesDist));
    await fse.copy(contentTypesSrc, contentTypesDist, { overwrite: true });
  }

  // Конфиг: копируем .json и папку env в dist/config
  const srcConfig = path.join(cwd, 'config');
  const distConfig = path.join(distDir, 'config');
  if (await fse.pathExists(srcConfig)) {
    await fse.ensureDir(distConfig);
    const configFiles = await fse.readdir(srcConfig, { withFileTypes: true });
    for (const f of configFiles) {
      const srcPath = path.join(srcConfig, f.name);
      const destPath = path.join(distConfig, f.name);
      if (f.isDirectory()) {
        if (f.name === 'env') await fse.copy(srcPath, destPath, { overwrite: true });
      } else if (f.name.endsWith('.json') || f.name.endsWith('.js')) {
        await fse.copy(srcPath, destPath, { overwrite: true });
      }
    }
  }
}

module.exports = copyContentTypes;
