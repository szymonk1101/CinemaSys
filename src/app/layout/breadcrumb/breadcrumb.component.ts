import { Component } from '@angular/core';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { distinctUntilChanged, filter, map } from 'rxjs/operators';

export interface BreadCrumb {
	label: string,
	url: string
};

@Component({
	selector: 'app-layout-breadcrumb',
	templateUrl: './breadcrumb.component.html',
	styles: [
	]
})
export class BreadcrumbComponent {

	breadcrumbs$ = this.router.events.pipe(
		filter(event => event instanceof NavigationEnd),
		distinctUntilChanged(),
		map(event => this.buildBreadCrumb(this.activatedRoute.root))
	);

	constructor(private router: Router, private activatedRoute: ActivatedRoute) { }

	buildBreadCrumb(route: ActivatedRoute, url: string = '', breadcrumbs: Array<BreadCrumb> = []): Array<BreadCrumb> {

		const children: ActivatedRoute[] = route.children;

		if (children.length === 0) {
			const newBreadcrumbs = [{label: 'Home', url: ''} , ...breadcrumbs];
			return newBreadcrumbs;
		}

		for (const child of children) {
			const routeURL: string = child.snapshot.url.map(segment => segment.path).join('/');
			if (routeURL !== '') {
				url += `/${routeURL}`;
			}

			const label = child.snapshot.data['breadcrumb'];
			if (label !== undefined && label !== null) {
				if(breadcrumbs.length == 0 || breadcrumbs[breadcrumbs.length - 1].url !== url) {
					breadcrumbs.push({ label, url });
				}
			}

			return this.buildBreadCrumb(route.firstChild, url, breadcrumbs);
		}
	}

}
