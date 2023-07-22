<script>
  import logo from "../assets/logo.svg";
  import { Icon, Folder } from "svelte-hero-icons";

  export let folder;
</script>

<div class="hidden lg:flex flex-col items-center justify-center p-2">
  <div class="flex flex-col items-center pb-8">
    <img src={logo} alt="logo" class="w-20 h-20" />
    <h1 class="text-4xl font-bold">TempFileShare</h1>
    <p class="text-lg">share disappering files to anyone</p>
  </div>
  <div class="flex justify-between items-center">
    <h3
      class="flex items-center gap-1 cursor-default text-lg text-blue-800 hover:bg-blue-100 px-4 py-2 rounded-lg"
    >
      <Icon src={Folder} size="24" class="inline" />
      / <span class="mono">{folder}</span>
    </h3>
  </div>
</div>
