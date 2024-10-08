import axios, {
	AxiosInstance,
	AxiosResponse,
	InternalAxiosRequestConfig,
} from "axios";
import ToastService from "../services/toast.service";

export class AxiosInterceptor {
	private axiosInstance: AxiosInstance;

	constructor() {
		this.axiosInstance = axios.create();

		this.axiosInstance.interceptors.request.use(
			this.handleRequest,
			this.handleRequestError
		);

		this.axiosInstance.interceptors.response.use(
			this.handleResponse,
			this.handleResponseError
		);
	}

	private handleRequest(
		config: InternalAxiosRequestConfig
	): InternalAxiosRequestConfig {
		return config;
	}

	private handleRequestError(error: any) {
		console.log("handle request error");
		Promise.reject(error);
	}

	private handleResponse(response: AxiosResponse): AxiosResponse {
		return response;
	}

	private handleResponseError(error: any) {
		console.log("handle response error", error);
		ToastService.showError(error.response.data.message);
		Promise.reject(error);
	}

	public getAxiosInstance(): AxiosInstance {
		return this.axiosInstance;
	}
}
