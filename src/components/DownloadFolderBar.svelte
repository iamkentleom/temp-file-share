<script>
  import { Icon, Folder, PlusCircle } from "svelte-hero-icons";
  import { Link } from "svelte-routing";

  export let folder;
</script>

<div
  class="md:hidden flex justify-between items-center text-sm rounded-md bg-blue-50 border border-blue-100 p-2"
>
  <Link
    to={`/d/${folder}`}
    class="flex items-center gap-1 cursor-default rounded-md text-blue-800 hover:bg-blue-100 p-1"
  >
    <Icon src={Folder} size="20" class="inline" />
    / <span class="mono">{folder}</span>
  </Link>
  <Link
    to="/"
    class="flex items-center gap-1 rounded-md font-bold text-blue-800 hover:bg-blue-100 p-1"
  >
    New <Icon src={PlusCircle} size="16" class="inline" />
  </Link>
</div>
