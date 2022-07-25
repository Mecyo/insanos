<template>
  <v-navigation-drawer
    id="core-navigation-drawer"
    v-model="drawer"
    :dark="barColor !== 'rgba(228, 226, 226, 1), rgba(255, 255, 255, 0.7)'"
    :expand-on-hover="expandOnHover"
    :right="$vuetify.rtl"
    src="../../../../assets/back2.jpg"
    mobile-breakpoint="960"
    app
    width="260"
    v-bind="$attrs"
  >
    <template v-slot:img="props">
      <v-img
        :gradient="`to bottom, ${barColor}`"
        v-bind="props"
      />
    </template>

    <v-divider class="mb-1" />

    <v-list
      dense
      nav
    >
      <v-list-item>
        <v-list-item-avatar
          class="align-self-center"
          color="white"
          contain
        >
          <v-img
            src="../../../../assets/icone.jpg"
            max-height="32"
          />
        </v-list-item-avatar>

        <v-list-item-content>
          <v-list-item-title
            class="display-1"
            v-text="title"
          />
        </v-list-item-content>
      </v-list-item>
    </v-list>

    <v-divider class="mb-2" />

    <v-list
      expand
      nav
    >
      <!-- Style cascading bug  -->
      <!-- https://github.com/vuetifyjs/vuetify/pull/8574 -->
      <div />

      <template v-for="(item, i) in preparedItems">
        <base-item-group
          v-if="item.children & item.hasPermission"
          :key="`group-${i}`"
          :item="item"
        >
          <!--  -->
        </base-item-group>

        <base-item
          v-else-if="item.hasPermission"
          :key="`item-${i}`"
          :item="item"
        />
      </template>

      <!-- Style cascading bug  -->
      <!-- https://github.com/vuetifyjs/vuetify/pull/8574 -->
      <div />
    </v-list>

  </v-navigation-drawer>
</template>

<script>
  // Utilities
import { mapState, } from 'vuex';
import menuItems from './MenuItems';
import router from '@/router/index';

  export default {
    name: 'DashboardCoreDrawer',

    props: {
      expandOnHover: {
        type: Boolean,
        default: false,
      },
    },
    created() {
      this.preparedItems = this.prepareMenuItems(menuItems);
    },
    data: () => ({
      preparedItems: [],
    }),

    computed: {
      ...mapState(['barColor', 'barImage']),
      drawer: {
        get () {
          return this.$store.state.drawer
        },
        set (val) {
          this.$store.commit('SET_DRAWER', val)
        },
      },
      computedItems () {
        var permissions = this.$store.state.user.permissoes;
        
        var mainRoute = this.$router.options.routes.find(route => route.path === '/app');
        var allRoutes = mainRoute.children;
        var permittedPaths = allRoutes.filter(r => permissions.some(p => r.meta && r.meta.requireRoles && r.meta.requireRoles.includes(p)));
        var permittedItems = this.items.filter(i => permittedPaths.map(p => p.path).includes(i.to));
        return permittedItems.map(this.mapItem);

        //return this.items.map(this.mapItem);
      },
      title () {
        const store = this.$store;
        const state = store.state;
        const user = state.user;
        return user && user.nome ? `Olá, ${user.nome.split(" ")[0]}` : 'Olá, visitante';
      },
      profile () {
        return {
          avatar: true,
          title: this.$t('avatar'),
        }
      },
    },

    methods: {
      hasPermission(user, roles) {
        return user.permissoes.some(role => roles.includes(role));
      },
      /**
       *  Prepara o item de menus pegando informações das rotas dentro de /app
       */
      prepareMenuItems(itemsOrder) {
        const data = [];

        // pega as rotas que estão dentro do main
        const mainRoute = router.options.routes.find(routerItem =>
          routerItem.path === '/app');

        const mainChildrenRoutes = mainRoute.children;
        itemsOrder.forEach((itemMenu) => {
          const preparedItem = this.mergeItemWithRouter(
            mainChildrenRoutes,
            Object.assign({}, itemMenu),
          );

          preparedItem.items = [];

          itemMenu.items.forEach((subItemMenu) => {
            preparedItem.items.push(this.mergeItemWithRouter(
              mainChildrenRoutes,
              Object.assign({}, subItemMenu),
            ));
          });

          data.push(preparedItem);
        });

        return data;
      },
      /**
       * Metodo que faz o merge das informações contida no roteamento com as informações
       * contidas na declaração dos itens de menu
       */
      mergeItemWithRouter(mainChildrenRoutes, item) {
        let routerMatched;

        item.exact = true;

        if (item.requireRoles) {
          item.hasPermission = this.hasPermission(
            this.$store.state.user,
            item.requireRoles,
          );
        } else {
          item.hasPermission = true;
        }

        mainChildrenRoutes.find((routerItem) => {
          const found = item.path === routerItem.path;
          if (found) {
            routerMatched = Object.assign({}, routerItem, { path: `/app/${routerItem.path}` });
            return true;
          }

          return false;
        });

        if (routerMatched) {
          let hasPermission = true;

          if (routerMatched.meta.requireRoles) {
            hasPermission = this.hasPermission(
              this.$store.state.user,
              routerMatched.meta.requireRoles,
            );
          }
          item = Object.assign({}, item, {
            path: routerMatched.path,
            hasPermission,
          });
        }

        return item;
      },
      mapItem (item) {
        return {
          ...item,
          children: item.children ? item.children.map(this.mapItem) : undefined,
          title: this.$t(item.title),
        }
      },
    },
  }
</script>

<style lang="sass">
  @import '~vuetify/src/styles/tools/_rtl.sass'

  #core-navigation-drawer
    .v-list-group__header.v-list-item--active:before
      opacity: .24

    .v-list-item
      &__icon--text,
      &__icon:first-child
        justify-content: center
        text-align: center
        width: 20px

        +ltr()
          margin-right: 24px
          margin-left: 12px !important

        +rtl()
          margin-left: 24px
          margin-right: 12px !important

    .v-list--dense
      .v-list-item
        &__icon--text,
        &__icon:first-child
          margin-top: 10px

    .v-list-group--sub-group
      .v-list-item
        +ltr()
          padding-left: 8px

        +rtl()
          padding-right: 8px

      .v-list-group__header
        +ltr()
          padding-right: 0

        +rtl()
          padding-right: 0

        .v-list-item__icon--text
          margin-top: 19px
          order: 0

        .v-list-group__header__prepend-icon
          order: 2

          +ltr()
            margin-right: 8px

          +rtl()
            margin-left: 8px
</style>
