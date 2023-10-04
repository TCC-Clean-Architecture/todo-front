import { createRouter, createWebHistory } from 'vue-router';

const router = createRouter({
	history: createWebHistory(import.meta.env.BASE_URL),
	routes: [
		{
			path: '/:pathMatch(.*)*',
			redirect: '/',
		},
		{
			path: '/lists',
			alias: '/',
			name: 'Lists',
			component: () => import('../views/ListsView.vue'),
			children: [
				{
					path: ':id',
					name: 'ListsViewList',
					component: () => import('../views/ListView.vue'),
				},
			],
		},
	],
	linkActiveClass: 'link--active',
	linkExactActiveClass: 'link--exact-active',
});

export default router;
