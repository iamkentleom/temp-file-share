<script>
  import { downloadFilesMeta } from "../stores";
  import { Icon, FolderDownload } from "svelte-hero-icons";
  import { analytics, logEvent } from "../firebase/analytics";
  import { storage, ref, listAll, getBlob } from "../firebase/storage";
  import JSZip from "jszip";
  import FileSaver from "file-saver";
  import { prettyFileSize } from "../utils/files";
  import { showToast } from "../components/Toast.svelte";

  export let length;
  export let folder;

  let isLoading = false;

  // const getBlob = async (fileRef) => {
  //   const url = await getDownloadURL(fileRef);
  //   const res = await fetch(url);
  //   const blob = await res.json();
  //   return blob;
  // };

  const downloadAllFiles = async () => {
    try {
      isLoading = true;
      const folderRef = ref(storage, folder);
      const zip = new JSZip();

      const files = (await listAll(folderRef)).items;

      for (let file of files) {
        const fileRef = ref(storage, file.fullPath);
        const blob = await getBlob(fileRef);

        zip.file(file.name, blob);
      }

      zip
        .generateAsync({
          type: "blob",
          compression: "DEFLATE",
          compressionOptions: { level: 5 },
        })
        .then((content) => {
          FileSaver.saveAs(content, `tempfileshare-${folder}.zip`);
        });

      logEvent(analytics, "download_folder", { files: files.length });
    } catch (error) {
      console.log(error);
      showToast("error in downloading all files");
    } finally {
      isLoading = false;
    }
  };

  $: count = Math.min($downloadFilesMeta.length, length);
  $: size = prettyFileSize(
    $downloadFilesMeta.reduce((a, b) => a + (b?.size ?? 0), 0) /
      ($downloadFilesMeta.length / length)
  );
</script>

<div class="text-sm sm:text-base flex justify-between items-center pt-2 px-1">
  <p class="pl-3 md:pl-4 py-2">
    {count}
    {count > 1 ? "files" : "file"}, {size} in total
  </p>
  <button
    type="button"
    on:click={downloadAllFiles}
    class="hover:bg-blue-100 md:px-4 {isLoading
      ? 'cursor-not-allowed'
      : 'cursor-pointer'}"
    disabled={isLoading}
  >
    <p>
      Download all<span class="hidden sm:inline">&nbsp;files</span>
    </p>
    {#if !isLoading}
      <Icon src={FolderDownload} size="24" class="inline pl-1" />
    {:else}
      <span class="loader w-3 md:w-4 aspect-square ml-1 md:ml-2" />
    {/if}
  </button>
</div>

<style>
  button {
    @apply flex items-center px-3 py-2;
    @apply rounded-lg text-blue-800 font-bold;
  }
  .loader {
    @apply border border-b-transparent border-r-transparent border-blue-800;
    border-width: 2px;
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
