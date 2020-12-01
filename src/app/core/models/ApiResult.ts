export interface ApiResult {
	readonly status: number;
	readonly message: string;
	readonly data?: any;
}