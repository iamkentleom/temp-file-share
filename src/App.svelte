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
  import MobileVersion from "./components/MobileVersion.svelte";

  export let url = "";

  signInAnonymously(auth)
    .then(() => {
      console.log("Logged in anonymously.");
    })
    .catch((e) => {
      console.log("Code: ", e.code);
      console.log("Message: ", e.message);
    });
</script>

<Router {url}>
  <div id="main" class="hidden lg:flex flex-col min-h-full relative">
    <Toast />
    <NavBar />
    <Route path="/"><Card /></Route>
    <Route path="d/:id" let:params><Download {params} /></Route>
    <Route path="*"><NotFound /></Route>
    <About />
    <Footer />
  </div>
  <div
    class="lg:hidden flex flex-col justify-center items-center min-h-full relative"
  >
    <MobileVersion />
  </div>
</Router>
