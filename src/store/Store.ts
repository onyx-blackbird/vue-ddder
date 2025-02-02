import { reactive, readonly } from 'vue';

export abstract class Store<T extends Object> {

	protected state: T;

	constructor(data: T) {
		this.state = reactive(data) as T;
	}

	public getState(): T {
		return readonly(this.state) as T;
	}

}
