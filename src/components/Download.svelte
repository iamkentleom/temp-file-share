<script>
  import DownloadTitle from "./DownloadTitle.svelte";
  import DownloadFiles from "./DownloadFiles.svelte";
  export let params;
</script>

<svelte:head>
  <title>Download files - TempFileShare</title>
</svelte:head>
<div
  class="w-full max-w-screen-lg mx-auto min-h-[560px] sm:min-h-[640px] my-8 p-4 rounded-xl grid grid-cols-1 lg:grid-cols-2 bg-white shadow-xl"
>
  <DownloadTitle folder={params.id} />
  <DownloadFiles folder={params.id} />
</div>
