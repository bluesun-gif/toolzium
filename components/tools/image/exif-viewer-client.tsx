"use client";
import { useState, useRef, useCallback } from "react";
import ToolPageHeader from "@/components/shared/tool-page-header";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { UploadCloud, Camera, MapPin, Image as ImageIcon, Code, Clock, Info, Download, Copy, Trash2 } from "lucide-react";

// The EXIF parsing function
function parseExif(buffer: ArrayBuffer): { tags: Record<string, any>, error?: string } {
  try {
    const dataView = new DataView(buffer);
    let offset = 0;

    if (dataView.byteLength < 4) return { tags: {}, error: "File too small to be an image" };
    
    // Check for JPEG SOI
    if (dataView.getUint16(offset) !== 0xFFD8) {
      // Very basic non-JPEG fallback
      return { tags: {}, error: "Currently only JPEG EXIF parsing is supported" };
    }
    offset += 2;

    let exifDataOffset = -1;
    while (offset < dataView.byteLength) {
      if (dataView.getUint16(offset) === 0xFFE1) {
        if (dataView.getUint32(offset + 4) === 0x45786966) { // "Exif"
          exifDataOffset = offset + 10;
          break;
        }
      }
      offset += 2 + dataView.getUint16(offset + 2);
    }

    if (exifDataOffset === -1) {
      return { tags: {}, error: "No EXIF data found in this image" };
    }

    const tiffOffset = exifDataOffset;
    const littleEndian = dataView.getUint16(tiffOffset) === 0x4949; // "II"
    
    if (dataView.getUint16(tiffOffset + 2, littleEndian) !== 0x002A) {
      return { tags: {}, error: "Invalid EXIF data" };
    }

    const firstIFDOffset = dataView.getUint32(tiffOffset + 4, littleEndian);
    
    const tags: Record<string, any> = {};

    const tagNames: Record<number, string> = {
      0x010f: "Make",
      0x0110: "Model",
      0x0112: "Orientation",
      0x0131: "Software",
      0x0132: "DateTime",
      0x829a: "ExposureTime",
      0x829d: "FNumber",
      0x8827: "ISOSpeedRatings",
      0x9003: "DateTimeOriginal",
      0x9004: "DateTimeDigitized",
      0x920a: "FocalLength",
      0xa001: "ColorSpace",
      0xa002: "ExifImageWidth",
      0xa003: "ExifImageHeight",
      0xa434: "LensModel",
      0x8298: "Copyright",
      0x011a: "XResolution",
      0x011b: "YResolution"
    };

    const gpsTagNames: Record<number, string> = {
      0x0001: "GPSLatitudeRef",
      0x0002: "GPSLatitude",
      0x0003: "GPSLongitudeRef",
      0x0004: "GPSLongitude",
      0x0005: "GPSAltitudeRef",
      0x0006: "GPSAltitude",
    };

    function readTagValue(entryOffset: number, type: number, count: number): any {
      const valueOffset = dataView.getUint32(entryOffset + 8, littleEndian);
      // If value fits in 4 bytes, it's stored directly in valueOffset field
      let dataOffset = tiffOffset + valueOffset;
      if (
        ((type === 1 || type === 2 || type === 7) && count <= 4) ||
        (type === 3 && count <= 2) ||
        (type === 4 && count === 1) ||
        (type === 9 && count === 1)
      ) {
        dataOffset = entryOffset + 8;
      }

      try {
        if (type === 2) { // ASCII
          let str = "";
          for (let i = 0; i < count - 1; i++) {
            const charCode = dataView.getUint8(dataOffset + i);
            if (charCode !== 0) str += String.fromCharCode(charCode);
          }
          return str;
        }

        if (type === 3) { // SHORT
          if (count === 1) return dataView.getUint16(dataOffset, littleEndian);
          const arr = [];
          for (let i = 0; i < count; i++) {
            arr.push(dataView.getUint16(dataOffset + i * 2, littleEndian));
          }
          return arr;
        }

        if (type === 4) { // LONG
          if (count === 1) return dataView.getUint32(dataOffset, littleEndian);
          const arr = [];
          for (let i = 0; i < count; i++) {
            arr.push(dataView.getUint32(dataOffset + i * 4, littleEndian));
          }
          return arr;
        }

        if (type === 5) { // RATIONAL
          if (count === 1) {
            return [dataView.getUint32(dataOffset, littleEndian), dataView.getUint32(dataOffset + 4, littleEndian)];
          }
          const arr = [];
          for (let i = 0; i < count; i++) {
            arr.push([
              dataView.getUint32(dataOffset + i * 8, littleEndian),
              dataView.getUint32(dataOffset + i * 8 + 4, littleEndian)
            ]);
          }
          return arr;
        }
        
        if (type === 10) { // SRATIONAL
          if (count === 1) {
            return [dataView.getInt32(dataOffset, littleEndian), dataView.getInt32(dataOffset + 4, littleEndian)];
          }
        }
      } catch (e) {
        return null;
      }
      return null;
    }

    function readIFD(dirOffset: number, tagDict: Record<number, string>) {
      if (dirOffset === 0) return;
      const numEntries = dataView.getUint16(tiffOffset + dirOffset, littleEndian);
      for (let i = 0; i < numEntries; i++) {
        const entryOffset = tiffOffset + dirOffset + 2 + i * 12;
        const tag = dataView.getUint16(entryOffset, littleEndian);
        const type = dataView.getUint16(entryOffset + 2, littleEndian);
        const count = dataView.getUint32(entryOffset + 4, littleEndian);
        
        const value = readTagValue(entryOffset, type, count);

        if (tag === 0x8769) { // Exif Offset
          readIFD(value, tagNames);
        } else if (tag === 0x8825) { // GPS Offset
          readIFD(value, gpsTagNames);
        } else {
          const tagName = tagDict[tag] || `Unknown_0x${tag.toString(16).toUpperCase()}`;
          if (value !== null && value !== undefined) {
            tags[tagName] = value;
          }
        }
      }
    }

    readIFD(firstIFDOffset, tagNames);
    return { tags };
  } catch (err) {
    return { tags: {}, error: "An error occurred while parsing EXIF data" };
  }
}

function formatValue(value: any): string {
  if (Array.isArray(value) && value.length === 2 && typeof value[0] === 'number') {
    // Looks like a RATIONAL
    if (value[1] === 1) return value[0].toString();
    // E.g. exposure time 1/400
    if (value[0] !== 0 && value[1] !== 0 && value[0] / value[1] > 0 && value[0] / value[1] < 1) {
      // simplify rational like 10/4000 to 1/400
      const gcd = (a: number, b: number): number => b ? gcd(b, a % b) : a;
      const d = gcd(value[0], value[1]);
      return `${value[0]/d}/${value[1]/d}`;
    }
    if (value[1] !== 0) {
      const num = value[0] / value[1];
      if (Number.isInteger(num)) return num.toString();
      return (Math.round(num * 100) / 100).toString();
    }
    return `${value[0]}/${value[1]}`;
  }
  if (Array.isArray(value)) {
    // Array of rationally or values
    if (value.length > 0 && Array.isArray(value[0])) {
      return value.map(v => `${v[0]}/${v[1]}`).join(", ");
    }
    return value.join(", ");
  }
  return String(value);
}

// Coordinate parsing for GPS
function formatGPSCoordinate(ref: string, coordArray: any[]) {
  if (!Array.isArray(coordArray) || coordArray.length !== 3) return "";
  const d = coordArray[0][0] / coordArray[0][1];
  const m = coordArray[1][0] / coordArray[1][1];
  const s = coordArray[2][0] / coordArray[2][1];
  return `${d.toFixed(4)}° ${m.toFixed(2)}' ${s.toFixed(2)}" ${ref || ""}`;
}

function getAspectRatio(width: number, height: number): string {
  const gcd = (a: number, b: number): number => (b ? gcd(b, a % b) : a);
  const divisor = gcd(width, height);
  const w = width / divisor;
  const h = height / divisor;
  if (w > 20 || h > 20) {
    return `${(width / height).toFixed(2)}:1`;
  }
  return `${w}:${h}`;
}

interface FileInfo {
  name: string;
  size: string;
  type: string;
  lastModified: string;
  width: number | null;
  height: number | null;
}

export default function ExifViewerClient() {
  const [imageSrc, setImageSrc] = useState<string | null>(null);
  const [fileName, setFileName] = useState<string>("");
  const [metadata, setMetadata] = useState<Record<string, any>>({});
  const [fileInfo, setFileInfo] = useState<FileInfo | null>(null);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [isDragging, setIsDragging] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFile = useCallback((file: File) => {
    setErrorMsg(null);
    setFileName(file.name);
    setMetadata({});
    setImageSrc(null);
    setFileInfo({
      name: file.name,
      size: `${(file.size / 1024).toFixed(1)} KB`,
      type: file.type || "unknown",
      lastModified: new Date(file.lastModified).toLocaleString(),
      width: null,
      height: null,
    });

    const objectUrl = URL.createObjectURL(file);
    setImageSrc(objectUrl);

    // Get image dimensions dynamically in the browser
    const img = new Image();
    img.src = objectUrl;
    img.onload = () => {
      setFileInfo((prev) => (prev ? { ...prev, width: img.width, height: img.height } : null));
    };

    const reader = new FileReader();
    reader.onload = (e) => {
      const buffer = e.target?.result as ArrayBuffer;
      const { tags, error } = parseExif(buffer);
      if (error) {
        // Suppress displaying general file warnings as full red blocks
        if (
          error !== "No EXIF data found in this image" &&
          error !== "Currently only JPEG EXIF parsing is supported"
        ) {
          setErrorMsg(error);
        }
      }
      setMetadata(tags);
    };
    reader.onerror = () => {
      setErrorMsg("Failed to read file.");
    };
    reader.readAsArrayBuffer(file);
  }, []);

  const onDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };
  
  const onDragLeave = () => setIsDragging(false);
  
  const onDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      handleFile(e.dataTransfer.files[0]);
    }
  };

  const clearImage = () => {
    setImageSrc(null);
    setMetadata({});
    setFileInfo(null);
    setFileName("");
    setErrorMsg(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(JSON.stringify(metadata, null, 2));
    alert("Metadata copied to clipboard!");
  };

  const downloadJSON = () => {
    const blob = new Blob([JSON.stringify(metadata, null, 2)], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `${fileName}-exif.json`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const hasGps = metadata.GPSLatitude && metadata.GPSLongitude;
  
  return (
    <>
      <ToolPageHeader 
        title="EXIF & Image Metadata Viewer" 
        description="Extract and view EXIF metadata, camera settings, and GPS locations directly in your browser." 
      />
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="md:col-span-1 space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Upload Image</CardTitle>
              <CardDescription>Your image never leaves your browser</CardDescription>
            </CardHeader>
            <CardContent>
              {!imageSrc ? (
                <div
                  className={`border-2 border-dashed rounded-xl p-8 text-center cursor-pointer transition-colors ${
                    isDragging ? "border-primary bg-primary/10" : "border-muted-foreground/25 hover:border-primary/50 hover:bg-accent/50"
                  }`}
                  onDragOver={onDragOver}
                  onDragLeave={onDragLeave}
                  onDrop={onDrop}
                  onClick={() => fileInputRef.current?.click()}
                >
                  <UploadCloud className="w-10 h-10 mx-auto mb-4 text-muted-foreground" />
                  <p className="text-sm font-medium mb-1">Click or drag image here</p>
                  <p className="text-xs text-muted-foreground">Supports JPG, TIFF (Limited)</p>
                  <input
                    type="file"
                    ref={fileInputRef}
                    onChange={(e) => e.target.files && e.target.files[0] && handleFile(e.target.files[0])}
                    className="hidden"
                    accept="image/jpeg,image/tiff,image/png,image/webp"
                  />
                </div>
              ) : (
                <div className="space-y-4">
                  <div className="relative aspect-video rounded-md overflow-hidden bg-muted flex items-center justify-center">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src={imageSrc} alt="Preview" className="max-w-full max-h-full object-contain" />
                  </div>
                  <div className="flex flex-col gap-2">
                    <p className="text-sm font-medium truncate">{fileName}</p>
                    <Button variant="destructive" onClick={clearImage} className="w-full">
                      <Trash2 className="w-4 h-4 mr-2" /> Clear Image
                    </Button>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
          
          {Object.keys(metadata).length > 0 && (
            <Card>
              <CardHeader>
                <CardTitle>Actions</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <Button variant="outline" className="w-full" onClick={copyToClipboard}>
                  <Copy className="w-4 h-4 mr-2" /> Copy as JSON
                </Button>
                <Button variant="outline" className="w-full" onClick={downloadJSON}>
                  <Download className="w-4 h-4 mr-2" /> Download JSON
                </Button>
              </CardContent>
            </Card>
          )}
        </div>

        <div className="md:col-span-2 space-y-6">
          {errorMsg && (
            <Card className="border-destructive/50 bg-destructive/10">
              <CardContent className="pt-6">
                <div className="flex items-center text-destructive">
                  <Info className="w-5 h-5 mr-2" />
                  <p>{errorMsg}</p>
                </div>
              </CardContent>
            </Card>
          )}

          {Object.keys(metadata).length > 0 ? (
            <div className="space-y-6">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                
                {/* Camera Info */}
                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-base flex items-center"><Camera className="w-4 h-4 mr-2"/> Camera Info</CardTitle>
                  </CardHeader>
                  <CardContent className="text-sm space-y-2">
                    <div className="flex justify-between border-b pb-1">
                      <span className="text-muted-foreground">Make</span>
                      <span className="font-medium">{metadata.Make || "N/A"}</span>
                    </div>
                    <div className="flex justify-between border-b pb-1">
                      <span className="text-muted-foreground">Model</span>
                      <span className="font-medium">{metadata.Model || "N/A"}</span>
                    </div>
                    <div className="flex justify-between border-b pb-1">
                      <span className="text-muted-foreground">Lens</span>
                      <span className="font-medium">{metadata.LensModel || "N/A"}</span>
                    </div>
                    <div className="flex justify-between border-b pb-1">
                      <span className="text-muted-foreground">Focal Length</span>
                      <span className="font-medium">{metadata.FocalLength ? `${formatValue(metadata.FocalLength)}mm` : "N/A"}</span>
                    </div>
                    <div className="flex justify-between border-b pb-1">
                      <span className="text-muted-foreground">Aperture</span>
                      <span className="font-medium">{metadata.FNumber ? `f/${formatValue(metadata.FNumber)}` : "N/A"}</span>
                    </div>
                    <div className="flex justify-between border-b pb-1">
                      <span className="text-muted-foreground">Shutter Speed</span>
                      <span className="font-medium">{metadata.ExposureTime ? `${formatValue(metadata.ExposureTime)}s` : "N/A"}</span>
                    </div>
                    <div className="flex justify-between pb-1">
                      <span className="text-muted-foreground">ISO</span>
                      <span className="font-medium">{metadata.ISOSpeedRatings || "N/A"}</span>
                    </div>
                  </CardContent>
                </Card>

                {/* Date/Time Info */}
                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-base flex items-center"><Clock className="w-4 h-4 mr-2"/> Date & Time</CardTitle>
                  </CardHeader>
                  <CardContent className="text-sm space-y-2">
                    <div className="flex justify-between border-b pb-1">
                      <span className="text-muted-foreground">Date Taken</span>
                      <span className="font-medium">{metadata.DateTimeOriginal || "N/A"}</span>
                    </div>
                    <div className="flex justify-between border-b pb-1">
                      <span className="text-muted-foreground">Date Digitized</span>
                      <span className="font-medium">{metadata.DateTimeDigitized || "N/A"}</span>
                    </div>
                    <div className="flex justify-between pb-1">
                      <span className="text-muted-foreground">Date Modified</span>
                      <span className="font-medium">{metadata.DateTime || "N/A"}</span>
                    </div>
                  </CardContent>
                </Card>

                {/* GPS Info */}
                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-base flex items-center"><MapPin className="w-4 h-4 mr-2"/> GPS Data</CardTitle>
                  </CardHeader>
                  <CardContent className="text-sm space-y-2">
                    {hasGps ? (
                      <>
                        <div className="flex justify-between border-b pb-1">
                          <span className="text-muted-foreground">Latitude</span>
                          <span className="font-medium">{formatGPSCoordinate(metadata.GPSLatitudeRef, metadata.GPSLatitude)}</span>
                        </div>
                        <div className="flex justify-between border-b pb-1">
                          <span className="text-muted-foreground">Longitude</span>
                          <span className="font-medium">{formatGPSCoordinate(metadata.GPSLongitudeRef, metadata.GPSLongitude)}</span>
                        </div>
                        <div className="flex justify-between pb-1">
                          <span className="text-muted-foreground">Altitude</span>
                          <span className="font-medium">
                            {metadata.GPSAltitude ? `${Array.isArray(metadata.GPSAltitude) ? metadata.GPSAltitude[0]/metadata.GPSAltitude[1] : metadata.GPSAltitude}m` : "N/A"}
                          </span>
                        </div>
                      </>
                    ) : (
                      <div className="text-center py-4 text-muted-foreground">No GPS data available</div>
                    )}
                  </CardContent>
                </Card>

                {/* Image Info */}
                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-base flex items-center"><ImageIcon className="w-4 h-4 mr-2"/> Image Info</CardTitle>
                  </CardHeader>
                  <CardContent className="text-sm space-y-2">
                    <div className="flex justify-between border-b pb-1">
                      <span className="text-muted-foreground">Width</span>
                      <span className="font-medium">{metadata.ExifImageWidth || "N/A"}</span>
                    </div>
                    <div className="flex justify-between border-b pb-1">
                      <span className="text-muted-foreground">Height</span>
                      <span className="font-medium">{metadata.ExifImageHeight || "N/A"}</span>
                    </div>
                    <div className="flex justify-between border-b pb-1">
                      <span className="text-muted-foreground">Color Space</span>
                      <span className="font-medium">{metadata.ColorSpace === 1 ? "sRGB" : metadata.ColorSpace || "N/A"}</span>
                    </div>
                    <div className="flex justify-between border-b pb-1">
                      <span className="text-muted-foreground">Software</span>
                      <span className="font-medium truncate max-w-[150px] text-right" title={metadata.Software}>{metadata.Software || "N/A"}</span>
                    </div>
                  </CardContent>
                </Card>

              </div>

              {/* All Raw Tags */}
              <Card>
                <CardHeader>
                  <CardTitle className="text-base flex items-center"><Code className="w-4 h-4 mr-2"/> All Raw Tags</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="overflow-x-auto">
                    <table className="w-full text-sm text-left">
                      <thead className="text-xs text-muted-foreground bg-muted/50 uppercase">
                        <tr>
                          <th className="px-4 py-2 rounded-tl-md">Tag Name</th>
                          <th className="px-4 py-2 rounded-tr-md">Value</th>
                        </tr>
                      </thead>
                      <tbody>
                        {Object.entries(metadata).map(([key, val]) => (
                          <tr key={key} className="border-b last:border-0 hover:bg-muted/20">
                            <td className="px-4 py-2 font-medium">{key}</td>
                            <td className="px-4 py-2 text-muted-foreground break-all">{formatValue(val)}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </CardContent>
              </Card>

            </div>
          ) : imageSrc ? (
            <div className="space-y-6">
              <Card className="border-yellow-500/30 bg-yellow-500/5">
                <CardContent className="pt-6">
                  <div className="flex items-start text-yellow-600 dark:text-yellow-500">
                    <Info className="w-5 h-5 mr-3 mt-0.5 flex-shrink-0" />
                    <div>
                      <p className="font-semibold text-sm">No camera EXIF metadata was found</p>
                      <p className="text-xs mt-1 text-muted-foreground leading-relaxed">
                        This is common for screenshots, PNG/WebP files, or images sent through WhatsApp, Facebook, or Instagram, which remove camera tags and GPS locations to protect user privacy. However, we found the general image properties below:
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {fileInfo && (
                <Card>
                  <CardHeader>
                    <CardTitle className="text-base flex items-center">
                      <ImageIcon className="w-4 h-4 mr-2" /> General Image Properties
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="text-sm grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="space-y-3">
                      <div className="flex justify-between border-b pb-1.5">
                        <span className="text-muted-foreground">File Name</span>
                        <span className="font-medium truncate max-w-[180px]" title={fileInfo.name}>{fileInfo.name}</span>
                      </div>
                      <div className="flex justify-between border-b pb-1.5">
                        <span className="text-muted-foreground">File Size</span>
                        <span className="font-medium">{fileInfo.size}</span>
                      </div>
                      <div className="flex justify-between border-b pb-1.5 sm:border-0 sm:pb-0">
                        <span className="text-muted-foreground">MIME Type</span>
                        <span className="font-medium">{fileInfo.type}</span>
                      </div>
                    </div>
                    <div className="space-y-3">
                      <div className="flex justify-between border-b pb-1.5">
                        <span className="text-muted-foreground">Dimensions</span>
                        <span className="font-medium">
                          {fileInfo.width && fileInfo.height ? `${fileInfo.width} × ${fileInfo.height} px` : "Loading..."}
                        </span>
                      </div>
                      <div className="flex justify-between border-b pb-1.5">
                        <span className="text-muted-foreground">Aspect Ratio</span>
                        <span className="font-medium">
                          {fileInfo.width && fileInfo.height ? getAspectRatio(fileInfo.width, fileInfo.height) : "Loading..."}
                        </span>
                      </div>
                      <div className="flex justify-between pb-1">
                        <span className="text-muted-foreground">Last Modified</span>
                        <span className="font-medium text-right text-xs max-w-[180px] truncate">{fileInfo.lastModified}</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              )}
            </div>
          ) : (
            <Card className="h-[400px] flex items-center justify-center text-muted-foreground">
              Upload an image to view its EXIF metadata.
            </Card>
          )}
        </div>
      </div>
    </>
  );
}
