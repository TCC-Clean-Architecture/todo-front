import { createRouter, createWebHistory } from 'vue-router';

const router = createRouter({
	history: createWebHistory(import.meta.env.BASE_URL),
	routes: [
		{
			path: '/:pathMatch(.*)*',
			redirect: '/',
		},
		{
			path: '/dashboard',
			alias: '/',
			name: 'Dashboard',
			component: () => import('../views/HomeView.vue'),
		},
	],
	linkActiveClass: 'link--active',
	linkExactActiveClass: 'link--exact-active',
});

export default router;
