<script>
  import { Link } from "svelte-routing";
  import { Icon, ArrowSmRight } from "svelte-hero-icons";
</script>

<div
  class="w-full max-w-screen-lg mx-auto min-h-[640px] my-8 p-4 rounded-xl grid grid-cols-1 bg-white shadow-xl"
>
  <div
    class="border-2 border-dashed border-blue-800 h-full rounded-xl px-1 py-2 flex flex-col justify-center items-center"
  >
    <h1 class="text-8xl font-extrabold">404</h1>
    <h3 class="text-xl">Page not found.</h3>
    <Link
      to="/"
      class="group px-5 py-3 mt-2 rounded-xl text-blue-800 hover:text-blue-900"
      >Take me home <Icon
        src={ArrowSmRight}
        size="20"
        class="inline group-hover:translate-x-1 transition"
      /></Link
    >
  </div>
</div>
