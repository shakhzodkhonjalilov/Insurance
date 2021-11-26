export default function({ store, redirect }) {
  if (!store.getters["hasUser"]) {
    redirect("/auth/login");
  }
}
