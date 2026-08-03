"use server";

function splitTextIntoChunks(text: string, maxLength: number = 200): string[] {
  const chunks: string[] = [];
  let currentChunk = "";

  // Split by punctuation marks first to preserve natural pauses
  const sentences = text.match(/[^.!?]+[.!?]+(\s|$)|[^.!?]+(\s|$)/g) || [text];

  for (const sentence of sentences) {
    if ((currentChunk + sentence).length > maxLength) {
      if (currentChunk) {
        chunks.push(currentChunk.trim());
        currentChunk = "";
      }
      // If a single sentence exceeds the length limit, split by words
      if (sentence.length > maxLength) {
        const words = sentence.split(/\s+/);
        for (const word of words) {
          if ((currentChunk + " " + word).length > maxLength) {
            chunks.push(currentChunk.trim());
            currentChunk = word;
          } else {
            currentChunk += (currentChunk ? " " : "") + word;
          }
        }
      } else {
        currentChunk = sentence;
      }
    } else {
      currentChunk += sentence;
    }
  }

  if (currentChunk) {
    chunks.push(currentChunk.trim());
  }

  return chunks.filter((c) => c.length > 0);
}

export async function downloadTtsAudio(text: string, lang: string): Promise<{ success: boolean; data?: string; error?: string }> {
  try {
    if (!text || !text.trim()) {
      return { success: false, error: "Text is empty" };
    }

    const cleanLang = lang.split("-")[0] || "en";
    const chunks = splitTextIntoChunks(text.trim());
    const audioBuffers: Buffer[] = [];

    const userAgent =
      "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36";

    for (const chunk of chunks) {
      const url = `https://translate.google.com/translate_tts?ie=UTF-8&tl=${cleanLang}&client=tw-ob&q=${encodeURIComponent(
        chunk
      )}`;

      const response = await fetch(url, {
        headers: {
          "User-Agent": userAgent,
        },
      });

      if (!response.ok) {
        throw new Error(`Failed to fetch audio chunk: ${response.statusText}`);
      }

      const arrayBuffer = await response.arrayBuffer();
      audioBuffers.push(Buffer.from(arrayBuffer));
    }

    // Concatenate all chunks together into one single MP3 file buffer
    const finalBuffer = Buffer.concat(audioBuffers);
    const base64Data = finalBuffer.toString("base64");

    return {
      success: true,
      data: `data:audio/mp3;base64,${base64Data}`,
    };
  } catch (error: any) {
    console.error("TTS Downloader Action Error:", error);
    return {
      success: false,
      error: error.message || "Failed to generate download file",
    };
  }
}
