<script>
  import { files, values } from "../stores";
  import { Icon, PlusCircle } from "svelte-hero-icons";
  import { scale } from "svelte/transition";
  import CardDropzoneFile from "./CardDropzoneFile.svelte";
  import CardDropzoneSummary from "./CardDropzoneSummary.svelte";
  import { showToast } from "../components/Toast.svelte";
  import CardToggle from "./CardToggle.svelte";
  import { getFileId } from "../utils/files";

  $: currentTotalFileSize = $files.reduce((a, b) => a + b.size, 0);

  // file limit in MB
  const fileLimitMB = 50;
  const fileLimitB = fileLimitMB * 1049000;

  let dragOverState = false;

  const addFile = (target) => {
    // limit total upload file size
    const upcomingTotalFileSize = [...target.files].reduce(
      (a, b) => a + b.size,
      0
    );
    if (currentTotalFileSize + upcomingTotalFileSize > fileLimitB) {
      showToast(`total file size must not exceed ${fileLimitMB}MB`);
      return;
    }
    // remove duplicates
    // https://dev.to/marinamosti/removing-duplicates-in-an-array-of-objects-in-js-with-sets-3fep
    const mergedFiles = [...$files, ...target.files];
    const uniqueFiles = [
      ...new Set(mergedFiles.map((file) => getFileId(file))),
    ].map((id) => mergedFiles.find((file) => getFileId(file) === id));
    files.set(uniqueFiles);
  };

  const over = (e) => {
    dragOverState = true;
  };
  const away = (e) => {
    dragOverState = false;
  };
  const drop = (e) => {
    dragOverState = false;
    addFile(e.dataTransfer);
  };
</script>

<!-- from https://css-tricks.com/drag-and-drop-file-uploading/#top-of-site -->
<form
  class="dropzone rounded-xl"
  class:bg-blue-100={dragOverState}
  enctype="multipart/form-data"
  on:submit|preventDefault
  on:drag|preventDefault
  on:dragstart|preventDefault
  on:dragend|preventDefault={away}
  on:dragover|preventDefault={over}
  on:dragenter|preventDefault={over}
  on:dragleave|preventDefault={away}
  on:drop|preventDefault={drop}
>
  <div
    class="border-2 border-dashed border-blue-800 rounded-xl px-1 py-2 max-h-[640px] flex flex-col justify-between h-full"
  >
    <input
      type="file"
      name="files"
      id="files"
      on:change={(e) => addFile(e.target)}
      bind:this={$values}
      multiple
    />
    {#if $files.length !== 0}
      <div class="flex flex-col gap-2 grow overflow-y-auto px-1">
        <CardToggle />
        {#each $files as file, i (i)}
          <CardDropzoneFile {file} />
        {/each}
      </div>
      <CardDropzoneSummary />
    {:else}
      <div in:scale={{ delay: 500 }} class="flex flex-col items-center m-auto">
        <Icon src={PlusCircle} size="36" class="text-blue-800 font-bold" />
        <p class="mt-2 text-gray-700 font-bold text-sm sm:text-base">
          Drag and drop files
        </p>
        <p class="text-gray-700 font-bold text-sm sm:text-base">- or -</p>
        <button
          type="button"
          class="p-0 mt-2 rounded-xl bg-blue-800 hover:bg-blue-900 hover:shadow-xl text-white hover:-translate-y-[2px] focus-within:-translate-y-[2px] focus-within:bg-blue-900 focus-within:shadow-xl"
        >
          <label
            for="files"
            class="block px-5 py-3 cursor-pointer text-sm sm:text-base"
            >Select files to upload</label
          >
        </button>
      </div>
    {/if}
  </div>
</form>

<style>
  input[type="file"] {
    @apply hidden;
  }
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
