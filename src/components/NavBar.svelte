<script>
  import { Icon, ArrowSmRight } from "svelte-hero-icons";
</script>

<nav
  class="w-full max-w-screen-2xl mx-auto px-8 py-6 flex justify-between items-center"
>
  <a href="." class="text-xl font-extrabold hover:text-gray-700"
    >TempFileShare</a
  >
  <a
    href="#about"
    class="group transition text-white px-2 hover:text-gray-300 flex items-center gap-1"
    >About <Icon
      src={ArrowSmRight}
      size="20"
      class="inline group-hover:translate-x-1 transition"
    /></a
  >
</nav>
