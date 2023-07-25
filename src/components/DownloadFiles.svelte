<script>
  import { onMount } from "svelte";
  import { downloadFilesMeta } from "../stores";
  import { storage, ref, listAll } from "../firebase/storage";
  import { navigate } from "svelte-routing";
  import DownloadFilesFile from "./DownloadFilesFile.svelte";
  import DownloadFilesSummary from "./DownloadFilesSummary.svelte";
  import { Icon, Folder } from "svelte-hero-icons";
  import DownloadFolderBar from "./DownloadFolderBar.svelte";

  export let folder;

  const folderRef = ref(storage, folder);
  let files = [];

  const getFiles = async () => {
    try {
      const res = await listAll(folderRef);
      files = Array.from(res.items);

      if (!files?.length) throw new Error("Folder empty.");

      return;
    } catch (error) {
      console.log(error);

      if (error.code !== "storage/unauthorized") {
        navigate("/page-not-found", { replace: true });
        return;
      }
      await getFiles();
    }
  };

  onMount(async () => {
    downloadFilesMeta.set([]);
    await getFiles();
  });
</script>

<div
  class="border-2 border-dashed border-blue-800 rounded-xl px-1 py-2 max-h-[640px] flex flex-col h-full {(files?.length ??
    0) === 0
    ? 'justify-center'
    : 'justify-between'}"
>
  {#if files?.length}
    <div class="flex flex-col gap-2 grow overflow-y-auto px-1">
      <DownloadFolderBar {folder} />
      {#each files.reverse() as file, i (i)}
        <DownloadFilesFile {file} />
      {/each}
    </div>
    <DownloadFilesSummary length={files.length} {folder} />
  {:else}
    <div class="flex flex-col items-center my-12">
      <Icon src={Folder} size="56" class="text-gray-600" />
      <p class="text-lg text-gray-700">
        Loading files...
        <span class="loader w-3 md:w-4 aspect-square ml-1 md:ml-2" />
      </p>
    </div>
  {/if}
</div>

<style>
  ::-webkit-scrollbar {
    @apply rounded-full w-2;
  }

  ::-webkit-scrollbar-track {
    @apply bg-gray-200 rounded-full;
  }

  ::-webkit-scrollbar-thumb {
    @apply bg-blue-800 rounded-full;
  }

  ::-webkit-scrollbar-thumb:hover {
    @apply bg-blue-900;
  }

  .loader {
    @apply border border-b-transparent border-r-transparent border-gray-700;
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
