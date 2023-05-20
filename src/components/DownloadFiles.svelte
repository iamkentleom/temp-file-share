<script>
  import { downloadFilesMeta } from "../stores";
  import { storage, ref, listAll } from "../firebase/storage";
  import { navigate } from "svelte-routing";
  import DownloadFilesFile from "./DownloadFilesFile.svelte";
  import DownloadFilesSummary from "./DownloadFilesSummary.svelte";
  import { Icon, EmojiSad } from "svelte-hero-icons";
  import DownloadFolderBar from "./DownloadFolderBar.svelte";

  export let folder;

  const folderRef = ref(storage, folder);
  let files;

  listAll(folderRef)
    .then((res) => {
      downloadFilesMeta.set([]);
      files = Array.from(res.items);
      if (files.length === 0) navigate("/page-not-found", { replace: true });
    })
    .catch((error) => {
      console.log(error);
      navigate("/page-not-found", { replace: true });
    });
</script>

<div
  class="border-2 border-dashed border-blue-800 rounded-xl px-1 py-2 max-h-[640px] flex flex-col h-full {(files?.length ??
    0) === 0
    ? 'justify-center'
    : 'justify-between'}"
>
  {#if (files?.length ?? 0) !== 0}
    <div class="flex flex-col gap-2 grow overflow-y-auto px-1">
      <DownloadFolderBar />
      {#each files.reverse() as file, i (i)}
        <DownloadFilesFile {file} />
      {/each}
    </div>
    <DownloadFilesSummary length={files.length} />
  {:else}
    <div class="flex flex-col items-center my-12">
      <Icon src={EmojiSad} size="56" class="text-gray-600" />
      <p class="text-lg text-gray-700">Wow, such empty</p>
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
</style>
