import { ViewTemplate } from '../../utils/viewTemplate';
import { View } from '../../utils/view';
import html from './searchTagList.tpl.html';
import { SearchTag } from '../searchTag/searchTag';

export class SearchTagList {
  view: View;
  tags: string[];

  constructor(tagsData: string[]) {
    this.tags = tagsData;
    this.view = new ViewTemplate(html).cloneView();
  }

  attach($root: HTMLElement) {
    $root.innerHTML = '';
    $root.appendChild(this.view.root);
  }

  render() {
    this.view.root.innerHTML = "Например";

    this.tags.forEach((tag, index) => {
      if(index !== this.tags.length - 1){
        const searchTag = new SearchTag(tag);
        searchTag.render(",");
        searchTag.attach(this.view.root);

      } else {
        const searchTag = new SearchTag(tag);
        searchTag.render("или");
        searchTag.attach(this.view.root);
      }
    });
  }
}
