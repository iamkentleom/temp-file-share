<script>
  import AboutCard from "./AboutCard.svelte";
</script>

<div id="about" class="max-w-screen-2xl mx-auto my-32">
  <div class="flex flex-col items-center justify-center">
    <p class="font-extrabold text-blue-800">ABOUT</p>
    <h2 class="text-3xl font-bold">Share files like never before</h2>
    <p>it's this easy</p>
    <div class="grid grid-cols-2 gap-x-40 gap-y-16 py-12">
      <AboutCard id="one" />
      <AboutCard id="two" />
      <AboutCard id="three" />
      <AboutCard id="four" />
    </div>
  </div>
</div>
