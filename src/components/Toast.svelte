<script context="module">
  import { toastState } from "../stores";
  import { fly } from "svelte/transition";

  let content = "";

  export function showToast(value) {
    content = value;
    toastState.set(true);
    setTimeout(() => {
      content = "";
      toastState.set(false);
    }, 3000);
  }
</script>

{#if $toastState}
  <div
    transition:fly={{ y: -16 }}
    class="fixed top-4 left-1/2 -translate-x-1/2 shadow-xl bg-slate-900 text-white rounded-xl px-6 py-3 text-center text-sm md:text-base"
  >
    {content}
  </div>
{/if}
