import { addElement } from '../../utils/helpers';
import { Component } from '../component';
import html from './homepage.tpl.html';
import { ProductList } from '../productList/productList';
import { SearchTagList } from '../searchTagList/searchTagList';
import { tagsData } from '../../utils/tagsData';

class Homepage extends Component {
  popularProducts: ProductList;
  searchTagList: SearchTagList;

  constructor(props: any) {
    super(props);

    this.searchTagList = new SearchTagList(tagsData);
    this.searchTagList.attach(this.view.searchTags);

    this.popularProducts = new ProductList();
    this.popularProducts.attach(this.view.popular);
  }

  render() {
    this.searchTagList.render();
    
    fetch('/api/getPopularProducts')
      .then((res) => res.json())
      .then((products) => {
        this.popularProducts.update(products);
      });

    const isSuccessOrder = new URLSearchParams(window.location.search).get('isSuccessOrder');
    if (isSuccessOrder != null) {
      const $notify = addElement(this.view.notifies, 'div', { className: 'notify' });
      addElement($notify, 'p', {
        innerText:
          'Заказ оформлен. Деньги спишутся с вашей карты, менеджер может позвонить, чтобы уточнить детали доставки'
      });
    }
  }
}

export const homepageComp = new Homepage(html);
