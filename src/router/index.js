import Vue from "vue";
import VueRouter from "vue-router";
import Calendario from "../views/Calendario.vue";
import Configuracion from "../views/Configuracion.vue";
import MisReservaciones from "../views/MisReservaciones.vue";
import Login from "../views/Login.vue";
import CrearReservacion from "../views/CrearReservacion.vue";
import ReservacionesSingle from "../views/ReservacionesSingle.vue";
import Reservacion from "../views/Reservacion.vue";
import EditarReservacion from "../views/EditarReservacion.vue";
import EditarUsuario from "../views/EditarUsuario.vue";
import CrearUsuario from "../views/CrearUsuario.vue";
import BuscarCliente from "../views/BuscarCliente.vue";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "Calendario",
    component: Calendario,
  },
  {
    path: "/configuracion",
    name: "Configuracion",
    component: Configuracion,
  },
  {
    path: "/reservaciones",
    name: "MisReservaciones",
    component: MisReservaciones,
  },
  {
    path: "/login",
    name: "Login",
    component: Login,
  },
  {
    path: "/crear-reservacion",
    name: "CrearReservacion",
    component: CrearReservacion,
  },
  {
    path: "/reservaciones/:date",
    name: "ReservacionesSingle",
    component: ReservacionesSingle,
  },
  {
    path: "/reservacion/:id",
    name: "Reservacion",
    component: Reservacion,
  },
  {
    path: "/editar-reservacion/:id",
    name: "EditarReservacion",
    component: EditarReservacion,
  },
  {
    path: "/editar-usuario/:id",
    name: "EditarUsuario",
    component: EditarUsuario,
  },
  {
    path: "/crear-usuario",
    name: "CrearUsuario",
    component: CrearUsuario,
  },
  {
    path: "/buscar-cliente",
    name: "BuscarCliente",
    component: BuscarCliente,
  },
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});

export default router;
