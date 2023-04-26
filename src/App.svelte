<script>
  import Toast from "./components/Toast.svelte";
  import NavBar from "./components/NavBar.svelte";
  import Card from "./components/Card.svelte";
  import About from "./components/About.svelte";
  import Footer from "./components/Footer.svelte";
  import { auth, signInAnonymously } from "./firebase/auth";

  signInAnonymously(auth)
    .then(() => {
      console.log("Logged in anonymously.");
    })
    .catch((e) => {
      console.log("Code: ", e.code);
      console.log("Message: ", e.message);
    });
</script>

<div id="main" class="flex flex-col min-h-full relative">
  <Toast />
  <NavBar />
  <Card />
  <About />
  <Footer />
</div>
