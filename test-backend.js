#!/usr/bin/env node

/**
 * Script para probar si el backend puede iniciar
 */

import { spawn } from 'child_process';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

console.log('🔍 Probando inicio del backend...\n');

const backendPath = path.join(__dirname, 'backend');

const process = spawn('npm', ['run', 'start:dev'], {
  cwd: backendPath,
  stdio: 'inherit',
  shell: true
});

process.on('error', (error) => {
  console.error('❌ Error:', error.message);
  process.exit(1);
});

process.on('exit', (code) => {
  if (code !== 0) {
    console.error(`\n❌ Backend terminó con código: ${code}`);
  }
  process.exit(code);
});

// Mantener el proceso corriendo
process.stdin.resume();

