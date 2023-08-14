<script>
  import { onMount } from "svelte";
  import { folder } from "../stores";
  import { Icon, Upload, Duplicate, Qrcode } from "svelte-hero-icons";
  import { showToast } from "./Toast.svelte";

  let url = "#";
  let qrcode;
  let showQRCode = false;

  const toggleQRCode = () => {
    showQRCode = !showQRCode;
  };

  const share = async () => {
    try {
      await navigator.share({
        url,
        text: "TempFileShare - Download shared files",
      });
    } catch (error) {
      console.log(error);
      if (error.code === "NotAllowedError") {
        showToast("feature coming soon...");
      }
    }
  };
  const copy = () => {
    navigator.clipboard.writeText(url);
    showToast("download link copied to clipboard");
  };

  onMount(() => {
    url = `${window.location.origin}/d/${$folder}`;
    let script = document.createElement("script");
    script.src = "https://cdn.jsdelivr.net/npm/qrcodejs@1.0.0/qrcode.min.js";
    document.head.append(script);

    script.onload = function () {
      qrcode = new QRCode("mobile-qrcode", {
        text: url,
        width: 208,
        height: 208,
        colorDark: "#1e40af",
        colorLight: "#eff6ff",
        correctLevel: QRCode.CorrectLevel.H,
      });
    };
  });
</script>

<div
  class="md:hidden flex flex-col items-center p-2 bg-blue-50 border border-blue-100 text-white rounded-md transition-all"
>
  <div class="flex items-center justify-between w-full">
    <a
      href={url}
      title="go to download link"
      class="mono text-sm text-blue-800 hover:underline hover:bg-blue-100 px-1 rounded"
      target="_blank"
      rel="noreferrer">d/{$folder}</a
    >
    <div class="space-x-1 flex items-center">
      <button title="share download link" on:click={share}>
        <Icon
          src={Upload}
          size="28"
          class="text-blue-800 hover:bg-blue-100 p-1 rounded"
        />
      </button>
      <button title="copy download link" on:click={copy}>
        <Icon
          src={Duplicate}
          size="28"
          class="text-blue-800 hover:bg-blue-100 p-1 rounded"
        />
      </button>
      <button title="show qr code" on:click={toggleQRCode}>
        <Icon
          src={Qrcode}
          size="28"
          class="text-blue-800 hover:bg-blue-100 p-1 rounded"
        />
      </button>
    </div>
  </div>
  <div
    id="mobile-qrcode"
    class="{showQRCode
      ? 'h-52 my-6'
      : 'h-0'} w-52 overflow-hidden transition-all"
  />
</div>
