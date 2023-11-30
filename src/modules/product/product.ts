import { ViewTemplate } from '../../utils/viewTemplate';
import { View } from '../../utils/view';
import { formatPrice } from '../../utils/helpers'
import html from './product.tpl.html';
import { ProductData } from 'types';
import { analyticService } from '../../services/analytic.service';

type ProductComponentParams = { [key: string]: any };

export class Product {
  view: View;
  product: ProductData;
  params: ProductComponentParams;

  constructor(product: ProductData, params: ProductComponentParams = {}) {
    this.product = product;
    this.params = params;
    this.view = new ViewTemplate(html).cloneView();
  }

  attach($root: HTMLElement) {
    $root.appendChild(this.view.root);
  }

  render() {
    const { id, name, src, salePriceU } = this.product;

    this.view.root.setAttribute('href', `/product?id=${id}`);
    this.view.img.setAttribute('src', src);
    this.view.title.innerText = name;
    this.view.price.innerText = formatPrice(salePriceU);

    if (this.params.isHorizontal) this.view.root.classList.add('is__horizontal');

    const observer = new IntersectionObserver(
      (entries, observer) => {
        entries.forEach(entry => {
          if(entry.isIntersecting) {
            const type = Object.keys(this.product.log).length === 0 ? "viewCard" : "viewCardPromo";
            fetch(`/api/getProductSecretKey?id=${id}`)
              .then((res) => res.json())
              .then((secretKey) => {
                analyticService.postAnalyticsData(type, {...this.product, secretKey: secretKey})
              });
            observer.unobserve(entry.target);
          }
        })
      },
      {}
    );
    observer.observe(this.view.root);
  }
}