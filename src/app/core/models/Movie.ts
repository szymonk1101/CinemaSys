
/*export class Movie {

	constructor(
		private readonly _id: number = undefined, 
		private _title: string, 
		private _description: string, 
		private _duration: number, // minuty
		private _image: string = undefined) {
	}

	public get id(): number {
		return this._id;
	}

	public get title(): string {
		return this._title;
	}

	public set title(title: string) {
		this._title = title;
	}

	public get description(): string {
		return this._description;
	}

	public set description(description: string) {
		this._description = description;
	}

	public get duration(): number {
		return this.duration;
	}

	public set duration(duration: number) {
		this._duration = duration;
	}

	public get image(): string {
		return this._image;
	}

	public set image(image: string) {
		this._image = image;
	}
	
}*/

export interface Movie {
	id?: number;
	title: string;
	description: string;
	duration: number; // minuty
	image?: string;
}