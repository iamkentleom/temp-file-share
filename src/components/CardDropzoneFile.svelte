<script>
  import { files, values } from "../stores";
  import {
    Icon,
    Code,
    Document,
    DocumentText,
    MusicNote,
    Photograph,
    VideoCamera,
    X,
  } from "svelte-hero-icons";
  import { scale, slide } from "svelte/transition";

  export let file;

  // 0: done, 1: pending, 2: uploading
  let status = 0;

  let icon;
  switch (file.type) {
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
      icon = VideoCamera;
      break;
    default:
      icon = Document;
  }

  const deleteFile = (file) => {
    files.set($files.filter((el) => el.lastModified !== file.lastModified));
    $values.value = null;
  };

  // from https://css-tricks.com/building-progress-ring-quickly/
  let percent = 66;
  const circumference = 46 * 2 * Math.PI;
  const offset = circumference - (percent / 100) * circumference;

  // rouding off from https://stackoverflow.com/questions/11832914/how-to-round-to-at-most-2-decimal-places-if-necessary
  $: prettyFileSize =
    file.size < 1049000
      ? `${Math.round((file.size / 1024 + Number.EPSILON) * 100) / 100} KB`
      : file.size >= 1049000 && file.size < 1074000000
      ? `${Math.round((file.size / 1049000 + Number.EPSILON) * 100) / 100} MB`
      : `${
          Math.round((file.size / 1074000000 + Number.EPSILON) * 100) / 100
        } GB`;
</script>

<div
  in:scale
  out:slide
  class="group transition w-full border border-blue-100 hover:border-blue-400 rounded-lg p-2 flex items-center justify-between bg-blue-50"
  title={file.name}
>
  <div class="grid grid-cols-6 content-center grow">
    {#if status === 0}
      <div
        class="bg-blue-200 p-4 w-4/5 aspect-square rounded-full flex items-center justify-center"
      >
        <div>
          <Icon src={icon} size="24" class="text-blue-800" />
        </div>
      </div>
    {/if}
    {#if status === 1}
      <span class="loader w-4/5 aspect-square" />
    {/if}
    {#if status === 2}
      <div class="flex flex-col justify-center items-center relative">
        <svg class="progress-ring w-4/5 aspect-square">
          <circle
            class="progress-ring-circle stroke-blue-800 stroke-[4] -rotate-90 origin-center"
            fill="transparent"
            style="stroke-dasharray: {circumference}% {circumference}%; stroke-dashoffset: {offset}%;"
            r="46%"
            cx="50%"
            cy="50%"
          />
        </svg>
        <p
          class="absolute top-1/2 -translate-y-1/2 text-sm text-blue-800 font-bold"
        >
          {percent}%
        </p>
      </div>
    {/if}
    <div class="col-span-5">
      <p class="text-lg font-bold w-full truncate">
        {file.name}
      </p>
      <p class="text-gray-600">
        {status === 2
          ? "Pending..."
          : status === 1
          ? "Uploading..."
          : prettyFileSize}
      </p>
    </div>
  </div>
  <button
    on:click={() => deleteFile(file)}
    class="bg-blue-200 hover:border-blue-400 ml-2 mr-1 p-1 border border-blue-200 rounded-full invisible group-hover:visible transition"
  >
    <Icon src={X} size="20" class="text-blue-800" />
  </button>
</div>

<style>
  .loader {
    @apply border border-b-transparent border-r-transparent border-blue-800;
    border-width: 0.25rem;
    border-radius: 50%;
    display: inline-block;
    box-sizing: border-box;
    animation: rotation 1s linear infinite;
  }

  @keyframes rotation {
    0% {
      transform: rotate(0deg);
    }
    100% {
      transform: rotate(360deg);
    }
  }
</style>
