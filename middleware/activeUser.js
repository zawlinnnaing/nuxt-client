export default function ({store,redirect}) {
  if (!store.state.auth.user.active){
    return redirect({name: 'errors-inactive'})
  }
}
