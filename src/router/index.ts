import { createRouter, createWebHashHistory, RouteRecordRaw } from 'vue-router'

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    name: 'Clientes',
    component: () => import('@/views/ClientesView.vue'),
  },
  {
    path: '/articulos',
    name: 'Articulos',
    component: () => import('../views/ArticulosView.vue'),
  },
  {
    path: '/facturas',
    name: 'Facturas',
    component: () => import("@/views/FacturasView.vue"),
  },
  {
    path: '/pedidos',
    name: 'Pedidos',
    component: () => import("@/views/PedidosView.vue"),
  },
];

const router = createRouter({
  history: createWebHashHistory(),
  routes,
});

export default router
