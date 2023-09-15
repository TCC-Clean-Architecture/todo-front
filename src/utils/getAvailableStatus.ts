interface IStatusObject {
	id: string;
	name: string;
}

type Status = () => IStatusObject;

const getAvailableStatus = (name: string) => {
	const statusList: Record<string, Status> = {
		todo: () => ({
			id: 'todo',
			name: 'A fazer',
		}),
		done: () => ({
			id: 'done',
			name: 'Pronto',
		}),
		inprogress: () => ({
			id: 'inprogress',
			name: 'Em progresso',
		}),
		default: () => ({
			id: 'unknown',
			name: 'Desconhecido',
		}),
	};
	return (statusList[name] || statusList.default)();
};

export default getAvailableStatus;
