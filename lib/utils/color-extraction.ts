// lib/utils/color-extraction.ts
export function extractDominantColors(imageData: ImageData, colorCount: number = 5): string[] {
  const pixels: [number, number, number][] = [];
  const data = imageData.data;
  const step = Math.max(1, Math.floor(data.length / 4 / 5000)); // Sample for performance
  
  for (let i = 0; i < data.length; i += 4 * step) {
    if (data[i+3] < 128) continue; // Skip transparent
    pixels.push([data[i], data[i+1], data[i+2]]);
  }
  return kMeans(pixels, colorCount);
}

function kMeans(pixels: [number, number, number][], k: number): string[] {
  if (pixels.length === 0) return [];
  let centroids = pixels.sort(() => Math.random() - 0.5).slice(0, k);
  let changed = true;
  let iterations = 0;
  
  while (changed && iterations < 15) {
    changed = false; iterations++;
    const clusters: [number, number, number][][] = Array.from({ length: k }, () => []);
    
    for (const pixel of pixels) {
      let minDist = Infinity, bestCluster = 0;
      for (let i = 0; i < k; i++) {
        const dist = Math.sqrt(Math.pow(pixel[0]-centroids[i][0],2) + Math.pow(pixel[1]-centroids[i][1],2) + Math.pow(pixel[2]-centroids[i][2],2));
        if (dist < minDist) { minDist = dist; bestCluster = i; }
      }
      clusters[bestCluster].push(pixel);
    }
    
    for (let i = 0; i < k; i++) {
      if (clusters[i].length === 0) continue;
      const r = Math.round(clusters[i].reduce((s, p) => s + p[0], 0) / clusters[i].length);
      const g = Math.round(clusters[i].reduce((s, p) => s + p[1], 0) / clusters[i].length);
      const b = Math.round(clusters[i].reduce((s, p) => s + p[2], 0) / clusters[i].length);
      if (centroids[i][0] !== r || centroids[i][1] !== g || centroids[i][2] !== b) {
        centroids[i] = [r, g, b]; changed = true;
      }
    }
  }
  
  // Final assignment for sorting by cluster size
  const clusters: [number, number, number][][] = Array.from({ length: k }, () => []);
  for (const pixel of pixels) {
    let minDist = Infinity, bestCluster = 0;
    for (let i = 0; i < k; i++) {
      const dist = Math.sqrt(Math.pow(pixel[0]-centroids[i][0],2) + Math.pow(pixel[1]-centroids[i][1],2) + Math.pow(pixel[2]-centroids[i][2],2));
      if (dist < minDist) { minDist = dist; bestCluster = i; }
    }
    clusters[bestCluster].push(pixel);
  }
  
  return centroids
    .map((c, i) => ({ color: c, count: clusters[i].length }))
    .sort((a, b) => b.count - a.count)
    .map(s => "#" + s.color.map(x => x.toString(16).padStart(2, "0")).join(""));
}
