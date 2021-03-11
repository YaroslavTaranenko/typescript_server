export default class User {
	created: string;
	lastVisited: string;

	constructor(
        public name: string,
		public email: string,
		public password: string,
		public _id?: string
	) {
		let date = Date.now().toString();
		this.created = date;
		this.lastVisited = date;
	}
}
