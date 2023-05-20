<script>
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

  getMetadata(fileRef)
    .then((res) => {
      icon = getFileIcon(res?.contentType ?? "");
      fileSize = prettyFileSize(res?.size ?? 0);
      metadata = res;
      downloadFilesMeta.set([...$downloadFilesMeta, res]);
    })
    .catch((error) => {
      console.log(error);
    });

  getDownloadURL(fileRef)
    .then((downloadURL) => {
      url = downloadURL;
    })
    .catch((error) => {
      console.log(error);
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
  <!-- <a
    href={url}
    class="bg-blue-200 hover:border-blue-400 ml-2 mr-1 p-2 border border-blue-200 rounded-full invisible group-hover:visible transition"
    title="Download {file.name}"
    target="_blank"
    download
  >
    <Icon src={Download} size="24" class="text-blue-800" />
  </a> -->
</a>
