<script>
  import { onMount } from "svelte";
  import { downloadFilesMeta } from "../stores";
  import { getFileIcon, prettyFileSize } from "../utils/files";
  import { slide } from "svelte/transition";
  import {
    storage,
    ref,
    getMetadata,
    getDownloadURL,
  } from "../firebase/storage";
  import { Icon, Download, Document } from "svelte-hero-icons";

  export let file;

  let metadata = {};
  let url = "#";
  let icon = Document;
  let fileSize = "0 B";
  const fileRef = ref(storage, file.fullPath);

  onMount(async () => {
    try {
      metadata = await getMetadata(fileRef);
      icon = getFileIcon(metadata?.contentType ?? "");
      fileSize = prettyFileSize(metadata?.size ?? 0);
      downloadFilesMeta.set([...$downloadFilesMeta, metadata]);

      url = await getDownloadURL(fileRef);
    } catch (error) {
      console.log(error);
    }
  });
</script>

<a
  in:slide
  class="group transition w-full border border-blue-100 hover:border-blue-400 rounded-lg p-2 flex items-center justify-between bg-blue-50 cursor-pointer"
  title={`Download ${file.name}`}
  href={url}
  target="_blank"
  download
>
  <div class="grid grid-cols-5 md:grid-cols-6 content-center grow">
    <div
      class="bg-blue-200 group-hover:bg-blue-800 transition-colors w-4/5 aspect-square rounded-full flex items-center justify-center"
    >
      <div>
        <Icon
          src={Download}
          size="24"
          class="text-blue-100 hidden group-hover:block"
        />
        <Icon
          src={icon}
          size="24"
          class="text-blue-800 block group-hover:hidden"
        />
      </div>
    </div>
    <div class="col-span-4 md:col-span-5">
      <p class="text-base sm:text-lg font-bold w-full truncate">
        {file.name}
      </p>
      <p class="text-sm sm:text-base text-gray-600">{fileSize}</p>
    </div>
  </div>
</a>
