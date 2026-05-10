import JSZip from 'jszip';
import { saveAs } from 'file-saver';

export async function downloadFiles(files, projectName = 'generated-website') {
  if (files.length === 1) {
    const file = files[0];
    const blob = new Blob([file.content], { type: 'text/plain' });
    saveAs(blob, file.filename);
    return;
  }

  const zip = new JSZip();
  for (const file of files) {
    zip.file(file.filename, file.content);
  }

  const blob = await zip.generateAsync({ type: 'blob' });
  saveAs(blob, `${projectName}.zip`);
}
