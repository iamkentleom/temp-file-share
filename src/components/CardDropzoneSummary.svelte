<script>
  import { files } from "../stores";
  import { Icon, PlusCircle } from "svelte-hero-icons";
  import { prettyFileSize } from "../utils/files";

  $: totalFiles = $files.length;
  $: totalFilesSize = [...$files]
    .map((file) => file.size)
    .reduce((prev, current) => prev + current, 0);
  $: fileSize = prettyFileSize(totalFilesSize);
</script>

<div class="flex justify-between items-center pt-2 px-1">
  <p class="pl-4">
    {totalFiles}
    {totalFiles > 1 ? "files" : "file"}, {fileSize} in total
  </p>
  <button
    type="button"
    class="rounded-lg text-blue-800 hover:bg-blue-100 font-bold flex items-center"
  >
    <label for="files" class="block px-4 py-2 cursor-pointer">
      Select more <Icon src={PlusCircle} size="24" class="inline pl-1" />
    </label>
  </button>
</div>
