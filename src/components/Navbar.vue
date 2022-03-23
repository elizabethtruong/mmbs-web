<template>
    <nav>
        <v-app-bar absolute app class="transparent"> 
            <v-app-bar-nav-icon class="grey--text" @click="drawer=!drawer"></v-app-bar-nav-icon>
            <img class="mr-3" :src="require('../assets/mm4-transparent.png')" height="50"/>
            <v-spacer></v-spacer>
            <v-btn to="/" depressed class="transparent">
                <span>Sign Out</span>
                <v-icon right>mdi-logout</v-icon>
            </v-btn>
        </v-app-bar>

        <v-navigation-drawer app v-model="drawer" color="rgb(30, 136, 229)">
            <v-list>
                <v-list-item 
                    v-for="link in links" 
                    :key="link.text"
                    router :to="link.route"
                >
                    <v-list-item-icon>
                        <v-icon class="white--text">{{ link.icon }}</v-icon>
                    </v-list-item-icon>
                    
                    <v-list-item-content>
                        <v-list-item-title style="text-align: left" class="white--text">{{ link.text }}</v-list-item-title>
                    </v-list-item-content>
                </v-list-item>
            </v-list>
        </v-navigation-drawer>
    </nav>
</template>

<script>
export default {
    data () {
        return {
            drawer: false,
            links: [
                { icon: 'mdi-calendar-month', text: 'Calendar', route: '/calendar'},
                { icon: 'mdi-format-list-numbered', text: 'Bookings', route: "/bList"},
                { icon: 'mdi-folder', text: "Documents", route: "/documents"}
            ]
        }
    }
}
</script>