<script>
  import { Router, Route } from "svelte-routing";
  import Toast from "./components/Toast.svelte";
  import NavBar from "./components/NavBar.svelte";
  import Card from "./components/Card.svelte";
  import Download from "./components/Download.svelte";
  import NotFound from "./components/NotFound.svelte";
  import About from "./components/About.svelte";
  import Footer from "./components/Footer.svelte";
  import { auth, signInAnonymously } from "./firebase/auth";
  import { analytics } from "./firebase/analytics";

  export let url = "";

  signInAnonymously(auth)
    .then(() => {
      console.log("Logged in anonymously.");
    })
    .catch((e) => {
      console.log("Code: ", e.code);
      console.log("Message: ", e.message);
    });

  analytics();
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
