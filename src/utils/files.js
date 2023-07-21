import {
  Code,
  Document,
  DocumentText,
  MusicNote,
  Photograph,
  VideoCamera,
} from "svelte-hero-icons";

const getFileIcon = (file) => {
  let icon;
  const fileType = typeof file === "string" ? file : file.type;

  switch (fileType) {
    case "image/apng":
    case "image/avif":
    case "image/bmp":
    case "image/gif":
    case "image/jpeg":
    case "image/png":
    case "image/svg+xml":
    case "image/tiff":
    case "image/vnd.microsoft.icon":
    case "image/webp":
      icon = Photograph;
      break;
    case "application/pdf":
    case "application/rtf":
    case "application/vnd.amazon.ebook":
    case "application/vnd.apple.installer+xml":
    case "application/vnd.mozilla.xul+xml":
    case "application/vnd.ms-excel":
    case "application/vnd.ms-fontobject":
    case "application/vnd.ms-powerpoint":
    case "application/vnd.oasis.opendocument.presentation":
    case "application/vnd.oasis.opendocument.spreadsheet":
    case "application/vnd.oasis.opendocument.text":
    case "application/vnd.openxmlformats-officedocument.presentationml.presentation":
    case "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet":
    case "application/vnd.openxmlformats-officedocument.wordprocessingml.document":
    case "text/plain":
      icon = DocumentText;
      break;
    case "text/css":
    case "text/html":
    case "text/javascript":
    case "application/json":
    case "application/x-sh":
    case "application/xhtml+xml":
    case "application/xml":
      icon = Code;
      break;
    case "audio/3gpp":
    case "audio/3gpp2":
    case "audio/aac":
    case "audio/midi":
    case "audio/mpeg":
    case "audio/ogg":
    case "audio/opus":
    case "audio/wav":
    case "audio/webm":
      icon = MusicNote;
      break;
    case "video/3gpp":
    case "video/3gpp2":
    case "video/mp2t":
    case "video/mp4":
    case "video/mpeg":
    case "video/ogg":
    case "video/webm":
    case "video/x-msvideo":
    case "video/quicktime":
      icon = VideoCamera;
      break;
    default:
      icon = Document;
  }

  return icon;
};

const prettyFileSize = (filesize) => {
  // rounding off algorithm
  // from https://stackoverflow.com/questions/11832914/how-to-round-to-at-most-2-decimal-places-if-necessary
  return filesize < 1049000
    ? `${Math.round((filesize / 1024 + Number.EPSILON) * 100) / 100} KB`
    : filesize >= 1049000 && filesize < 1074000000
    ? `${Math.round((filesize / 1049000 + Number.EPSILON) * 100) / 100} MB`
    : `${Math.round((filesize / 1074000000 + Number.EPSILON) * 100) / 100} GB`;
};

const getFileId = (file) => {
  return `${file.lastModified}${file.size}${file.name}`;
};

export { getFileIcon, getFileId, prettyFileSize };
