<script>
  import { onMount } from "svelte";
  import { Router, Route } from "svelte-routing";
  import Toast from "./components/Toast.svelte";
  import NavBar from "./components/NavBar.svelte";
  import Card from "./components/Card.svelte";
  import Download from "./components/Download.svelte";
  import NotFound from "./components/NotFound.svelte";
  import About from "./components/About.svelte";
  import Footer from "./components/Footer.svelte";
  import { auth, signInAnonymously } from "./firebase/auth";

  export let url = "";

  onMount(async () => {
    try {
      const loggedIn = await signInAnonymously(auth);
      if (loggedIn) {
        console.log("Logged in anonymously");
      }
    } catch (error) {
      console.log("Code: ", error.code);
      console.log("Message: ", error.message);
    }
  });
</script>

<Router {url}>
  <div id="main" class="flex flex-col min-h-full relative">
    <div class="mx-4">
      <Toast />
      <NavBar />
      <Route path="/"><Card /></Route>
      <Route path="d/:id" let:params><Download {params} /></Route>
      <Route path="*"><NotFound /></Route>
      <About />
      <Footer />
    </div>
  </div>
</Router>
