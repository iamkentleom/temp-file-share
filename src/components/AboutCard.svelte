<script>
  import { Icon, CloudUpload, Qrcode, Share, Trash } from "svelte-hero-icons";
  export let id;

  const content = {
    one: {
      icon: CloudUpload,
      title: "Upload file",
      description:
        "Upload files you wish to share. Files are uploaded to our server. No need for your own space.",
    },
    two: {
      icon: Qrcode,
      title: "Scan QRCode",
      description: "Scan generated QRCode to download the files.",
    },
    three: {
      icon: Share,
      title: "Share file",
      description: "Share the link to anyone. And they can download the file.",
    },
    four: {
      icon: Trash,
      title: "No worries",
      description:
        "Files are deleted after a day. So you'll never worry where your files go.",
    },
  };
</script>

<div class="max-w-sm">
  <Icon src={content[id].icon} size="48" class="text-blue-800" />
  <h3 class="text-2xl font-bold mt-1 mb-2">{content[id].title}</h3>
  <p class="text-lg max-w-xs">
    {content[id].description}
  </p>
</div>
