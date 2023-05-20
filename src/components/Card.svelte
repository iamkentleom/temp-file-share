<script>
  import CardTitle from "./CardTitle.svelte";
  import CardDropzone from "./CardDropzone.svelte";
</script>

<div
  class="w-full max-w-lg lg:max-w-screen-lg mx-auto min-h-[640px] my-8 p-4 rounded-xl grid grid-cols-1 lg:grid-cols-2 bg-white shadow-xl"
>
  <CardTitle />
  <CardDropzone />
</div>
