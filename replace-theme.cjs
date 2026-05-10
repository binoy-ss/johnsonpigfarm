const fs = require('fs');
const path = require('path');

const dir = './src/components';
const files = fs.readdirSync(dir).filter(f => f.endsWith('.jsx'));

const replacements = {
  'var(--matte-black)': 'var(--bg-base)',
  'var(--dark-surface)': 'var(--bg-surface)',
  'rgba(255,255,255,0.03)': 'rgba(0,0,0,0.03)',
  'rgba(255,255,255,0.05)': 'rgba(0,0,0,0.05)',
  'rgba(255,255,255,0.06)': 'rgba(0,0,0,0.06)',
  'rgba(255,255,255,0.08)': 'rgba(0,0,0,0.08)',
  'rgba(255,255,255,0.1)': 'rgba(0,0,0,0.1)',
  'rgba(255,255,255,0.15)': 'rgba(0,0,0,0.15)',
  'rgba(255,255,255,0.2)': 'rgba(0,0,0,0.2)',
  'rgba(255,255,255,0.3)': 'rgba(0,0,0,0.3)',
  'rgba(255,255,255,0.4)': 'rgba(0,0,0,0.4)',
  'rgba(0,0,0,0.2) 0%, rgba(0,0,0,0.8) 100%': 'rgba(255,255,255,0.4) 0%, rgba(255,255,255,0.8) 100%',
  'rgba(20,20,20,0.25)': 'rgba(255,255,255,0.5)',
  'rgba(10,10,10,0.8)': 'rgba(255,255,255,0.8)',
};

files.forEach(file => {
  const filePath = path.join(dir, file);
  let content = fs.readFileSync(filePath, 'utf8');
  
  for (const [key, value] of Object.entries(replacements)) {
    content = content.split(key).join(value);
  }
  
  // Specific color fixes
  content = content.replace(/color: 'var\(--white\)'/g, "color: 'var(--text-primary)'");
  content = content.replace(/color: 'var\(--matte-black\)'/g, "color: 'var(--bg-base)'");
  content = content.replace(/background: 'var\(--white\)'/g, "background: 'var(--text-primary)'");
  content = content.replace(/background: 'var\(--matte-black\)'/g, "background: 'var(--bg-base)'");
  content = content.replace(/color="var\(--white\)"/g, "color=\"var(--text-primary)\"");
  
  fs.writeFileSync(filePath, content);
});

console.log('Replaced themes in components');
