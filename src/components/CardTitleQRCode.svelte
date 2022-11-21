<script>
  // qrcode component from https://svelte.dev/repl/72d3ca877047468db8bb3a68f25a8b92?version=3.14.1
  import { onMount } from "svelte";
  import { Icon, Upload, Duplicate } from "svelte-hero-icons";
  import { showToast } from "../components/Toast.svelte";
  import { scale } from "svelte/transition";

  export let codeValue;

  let qrcode;

  const copy = () => {
    navigator.clipboard.writeText(codeValue);
    showToast("download link copied to clipboard");
  };

  onMount(() => {
    let script = document.createElement("script");
    script.src =
      "https://cdn.rawgit.com/davidshimjs/qrcodejs/gh-pages/qrcode.min.js";
    document.head.append(script);

    script.onload = function () {
      qrcode = new QRCode("qrcode", {
        text: codeValue,
        width: 240,
        height: 240,
        colorDark: "#1e40af",
        colorLight: "#ffffff",
        correctLevel: QRCode.CorrectLevel.H,
      });
    };
  });
</script>

<div transition:scale>
  <div id="qrcode" class="w-60 h-60" />
  <div class="flex items-center justify-between mt-2">
    <a
      href={codeValue}
      title="go to download link"
      class="text-xl text-blue-800 hover:underline hover:bg-blue-100 px-1 rounded"
      target="_blank"
      rel="noreferrer"
      >d/{codeValue.split("/")[codeValue.split("/").length - 1]}</a
    >
    <div class="space-x-1 flex items-center">
      <button
        title="share download link"
        on:click={() => showToast("feature coming soon...")}
        ><Icon
          src={Upload}
          size="32"
          class="text-blue-800 hover:bg-blue-100 p-1 rounded"
        /></button
      ><button title="copy download link" on:click={copy}
        ><Icon
          src={Duplicate}
          size="32"
          class="text-blue-800 hover:bg-blue-100 p-1 rounded"
        /></button
      >
    </div>
  </div>
</div>
