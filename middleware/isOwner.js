export default function ({store, redirect, route}) {
  console.log('working middleware');
  if (route.params.id !== store.state.auth.user.id) {
    return redirect({name: 'index'});
  }
}
