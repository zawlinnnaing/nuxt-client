export default function ({store, redirect, route}) {
  if (Number(route.params.id) === Number(store.state.auth.user.id)) {
    return redirect({name: 'profile'});
  }
}
