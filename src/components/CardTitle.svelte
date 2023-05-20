<script>
  import { files } from "../stores";
  import logo from "../assets/logo.svg";
  import CardTitleQRCode from "./CardTitleQRCode.svelte";
</script>

<div class="hidden lg:flex flex-col items-center justify-center p-2">
  <div class="flex flex-col items-center pb-8">
    <img src={logo} alt="logo" class="w-20 h-20" />
    <h1 class="text-4xl font-bold">TempFileShare</h1>
    <p class="text-lg">share disappering files to anyone</p>
  </div>
  {#if $files.length !== 0}
    <CardTitleQRCode />
  {/if}
</div>
