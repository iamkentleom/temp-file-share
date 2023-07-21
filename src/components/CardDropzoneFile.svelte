<script>
  import { files, values, folder } from "../stores";
  import { Icon, X } from "svelte-hero-icons";
  import { scale, slide } from "svelte/transition";
  import { getFileIcon, getFileId, prettyFileSize } from "../utils/files";
  import { status as STATUS } from "../utils/constants";
  import { nanoid } from "nanoid";
  import {
    storage,
    ref,
    uploadBytesResumable,
    getDownloadURL,
    deleteObject,
  } from "../firebase/storage";

  export let file;

  const storageRef = ref(storage, `${$folder}/${file.name}`);

  const uploadTask = uploadBytesResumable(storageRef, file);

  // 0: done, 1: pending, 2: uploading
  let status = 1;

  const icon = getFileIcon(file);

  const deleteFile = (file) => {
    files.set($files.filter((el) => getFileId(el) !== getFileId(file)));
    $values.value = null;
    uploadTask.cancel();
    deleteObject(storageRef)
      .then(() => {
        console.log(`Deleted ${$folder}/${file.name}.`);
        if ($files.length === 0) {
          folder.set(nanoid(12));
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };

  // from https://css-tricks.com/building-progress-ring-quickly/
  let percent = 0;
  const circumference = 46 * 2 * Math.PI;

  uploadTask.on(
    "state_changed",
    (snapshot) => {
      status = 2;
      percent = Math.round(
        (snapshot.bytesTransferred / snapshot.totalBytes) * 100
      );
    },
    (error) => {
      console.log(error);
    },
    () => {
      status = 0;
      getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
        console.log("File available at", downloadURL);
      });
    }
  );

  $: fileSize = prettyFileSize(file.size);
  $: offset = circumference - (percent / 100) * circumference;
</script>

<div
  in:scale
  out:slide
  class="group transition w-full border border-blue-100 hover:border-blue-400 rounded-lg p-2 flex items-center justify-between bg-blue-50"
  title={file.name}
>
  <div class="grid grid-cols-5 md:grid-cols-6 content-center grow pl-1">
    {#if status === STATUS.DONE}
      <div
        class="bg-blue-200 max-w-[64px] sm:max-w-none sm:w-4/5 aspect-square rounded-full flex items-center justify-center"
      >
        <div>
          <Icon src={icon} size="24" class="text-blue-800" />
        </div>
      </div>
    {/if}
    {#if status === STATUS.PENDING}
      <span class="loader sm:w-4/5 aspect-square" />
    {/if}
    {#if status === STATUS.UPLOADING}
      <div class="flex justify-start items-center">
        <div
          class="relative max-w-[64px] sm:max-w-none sm:w-4/5 aspect-square grid place-items-center"
        >
          <svg class="w-full aspect-square">
            <circle
              class="stroke-blue-800 stroke-[4] -rotate-90 origin-center transition-all"
              fill="transparent"
              style="stroke-dasharray: {circumference}% {circumference}%; stroke-dashoffset: {offset}%;"
              r="46%"
              cx="50%"
              cy="50%"
            />
          </svg>
          <p
            class="absolute top-1/2 -translate-y-1/2 text-sm text-blue-800 font-bold"
          >
            {percent}%
          </p>
        </div>
      </div>
    {/if}
    <div class="col-span-4 md:col-span-5 ml-3 sm:ml-0">
      <p class="text-base sm:text-lg font-bold w-full truncate">
        {file.name}
      </p>
      <p class="text-gray-600 text-sm sm:text-base">
        {status === 1 ? "Pending..." : status === 2 ? "Uploading..." : fileSize}
      </p>
    </div>
  </div>
  <button
    on:click={() => deleteFile(file)}
    class="bg-blue-200 hover:border-blue-400 ml-2 mr-1 p-1 border border-blue-200 rounded-full visible md:invisible group-hover:visible transition"
  >
    <Icon src={X} size="20" class="text-blue-800" />
  </button>
</div>

<style>
  .loader {
    @apply border border-b-transparent border-r-transparent border-blue-800;
    border-width: 0.25rem;
    border-radius: 50%;
    display: inline-block;
    box-sizing: border-box;
    animation: rotation 1s linear infinite;
  }

  @keyframes rotation {
    0% {
      transform: rotate(0deg);
    }
    100% {
      transform: rotate(360deg);
    }
  }
</style>
