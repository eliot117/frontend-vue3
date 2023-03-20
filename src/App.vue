<template>
  <div class="container">
    <nav class="navbar navbar bg-white navbar-expand-lg bg-body-tertiary mt-2 rounded">
      <div class="container-fluid">
        <div class="collapse navbar-collapse" id="navbarNavAltMarkup">
          <div class="navbar-nav">
            <a class="nav-link active">
            <router-link to="/">
                Clientes
            </router-link>
            </a>
            <a class="nav-link">
              <router-link to="/articulos">
                Articulos
              </router-link>
            </a>
            <a class="nav-link">
              <router-link to="/pedidos">
                Pedidos
              </router-link>
            </a>
            <a class="nav-link">
              <router-link to="/facturas">
                Facturas
              </router-link>
            </a>
          </div>
        </div>
      </div>
    </nav>
  </div>
  <router-view/>
</template>

<style lang="scss">

@import url('https://fonts.googleapis.com/css2?family=Poppins:wght@400;600;800&display=swap');

#app {
  font-family: 'Poppins';
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

nav {
  padding: 30px;

  a {
    font-weight: bold;
    color: #2c3e50;

    &.router-link-exact-active {
      color: #42b983;
    }
  }
}
</style>
