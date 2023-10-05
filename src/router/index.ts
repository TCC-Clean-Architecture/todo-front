import { createRouter, createWebHistory } from 'vue-router';
import { useAuthStore } from '@/stores/auth';

const router = createRouter({
	history: createWebHistory(import.meta.env.BASE_URL),
	routes: [
		{
			path: '/:pathMatch(.*)*',
			redirect: '/',
		},
		{
			path: '/login',
			name: 'Login',
			component: () => import('../views/LoginView.vue'),
			meta: { requiresAuth: false },
		},
		{
			path: '/register',
			name: 'Register',
			component: () => import('../views/RegisterView.vue'),
			meta: { requiresAuth: false },
		},
		{
			path: '/lists',
			alias: '/',
			name: 'Lists',
			component: () => import('../views/ListsView.vue'),
			meta: { requiresAuth: true },
			children: [
				{
					path: ':id',
					name: 'ListsViewList',
					component: () => import('../views/ListView.vue'),
					meta: { requiresAuth: true },
				},
			],
		},
	],
	linkActiveClass: 'link--active',
	linkExactActiveClass: 'link--exact-active',
});

router.beforeEach((to, from, next) => {
	const authStore = useAuthStore();

	if (to.meta.requiresAuth && !authStore.isAutenticated) {
		next('login');
	} else next();
});

export default router;
