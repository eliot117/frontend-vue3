import { createStore } from "vuex";
import { config } from "vuex-module-decorators";
import ClientesModule from "./modules/Clientes/ClientesModule";
import ArticulosModule from "./modules/Articulos/ArticulosModule";
import FacturasModule from './modules/Facturas/FacturasModule';
import PedidosModule from './modules/Pedidos/PedidosModule';

config.rawError = true;

const store = createStore({
  modules: {
    ClientesModule,
    ArticulosModule,
    FacturasModule,
    PedidosModule,
  },
});

export default store;
