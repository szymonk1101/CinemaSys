import { Injectable, TemplateRef } from '@angular/core';

@Injectable({
	providedIn: 'root'
})
export class ToastService {
	toasts: any[] = [];

	show(textOrTpl: string | TemplateRef<any>, options: any = {}) {
		this.toasts.push({ textOrTpl, ...options });
	}

	remove(toast) {
		this.toasts = this.toasts.filter(t => t !== toast);
	}

	success(textOrTpl: string | TemplateRef<any>, options: any = {}) {
		options.classname = 'bg-success text-light';
		this.toasts.push({ textOrTpl, ...options });
	}
	
	error(textOrTpl: string | TemplateRef<any>, options: any = {}) {
		options.classname = 'bg-danger text-light';
		this.toasts.push({ textOrTpl, ...options });
	}
}
