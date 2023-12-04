import { ViewTemplate } from '../../utils/viewTemplate';
import { View } from '../../utils/view';
import html from './searchTag.tpl.html';

export class SearchTag {
  view: View;
  searchTag: string;

  constructor(searchTag: string) {
    this.searchTag = searchTag;
    this.view = new ViewTemplate(html).cloneView();
  }

  attach($root: HTMLElement) {
    $root.appendChild(this.view.root);
  }

  render(separator?: string) {
    this.view.link.setAttribute('href', `/catalog`);
    this.view.link.textContent = this.searchTag;
    if(separator) this.view.separator.textContent = separator;
  }
}