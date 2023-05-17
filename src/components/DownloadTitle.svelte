<script>
  import logo from "../assets/logo.svg";
  import { Icon, PlusCircle, ArrowCircleDown, Folder } from "svelte-hero-icons";
  import { Link } from "svelte-routing";

  export let folder;
</script>

<div class="flex flex-col items-center justify-center p-2">
  <div class="flex flex-col items-center pb-8">
    <img src={logo} alt="logo" class="w-20 h-20" />
    <h1 class="text-4xl font-bold">TempFileShare</h1>
    <p class="text-lg">share disappering files to anyone</p>
  </div>
  <div>
    <h3
      class="flex items-center gap-1 cursor-default text-lg text-blue-800 hover:bg-blue-100 px-4 py-2 rounded-lg"
    >
      <Icon src={Folder} size="28" class="inline" />
      / {folder}
    </h3>
  </div>
  <!-- <div class="flex items-center gap-2">
    <Link
      to="/"
      class="px-4 py-2 rounded-lg bg-blue-800 hover:bg-blue-900 text-white focus-within:bg-blue-900"
      >New Upload <Icon src={PlusCircle} size="20" class="inline" /></Link
    >
    <Link
      to="/"
      class="px-4 py-2 rounded-lg hover:bg-blue-100 text-blue-800 focus-within:bg-blue-100"
    >
      Download All <Icon src={ArrowCircleDown} size="20" class="inline" />
    </Link>
  </div> -->
</div>
