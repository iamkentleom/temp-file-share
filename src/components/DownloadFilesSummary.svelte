<script>
  import { downloadFilesMeta } from "../stores";
  import { Icon, FolderDownload } from "svelte-hero-icons";
  import { prettyFileSize } from "../utils/files";

  $: count = $downloadFilesMeta.length;
  $: size = prettyFileSize(
    $downloadFilesMeta.reduce((a, b) => a + (b?.size ?? 0), 0)
  );
</script>

<div class="flex justify-between items-center pt-2 px-1">
  <p class="pl-4">
    {count}
    {count > 1 ? "files" : "file"}, {size} in total
  </p>
  <button
    type="button"
    class="rounded-lg text-blue-800 hover:bg-blue-100 font-bold flex items-center"
  >
    <p class="block px-4 py-2 cursor-pointer">
      Download all files <Icon
        src={FolderDownload}
        size="24"
        class="inline pl-1"
      />
    </p>
  </button>
</div>
