export default function ({store, redirect}) {
  if (!store.getters['payment']) {
    redirect('/')
  }
}
