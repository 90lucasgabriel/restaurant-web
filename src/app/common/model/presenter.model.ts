export class Presenter<model> {
  data?:          model;
  meta?:          Meta;
}

export class Meta {
  pagination?:    Pagination;
}

export class Pagination {
  count?:         number;
  current_page?:  number;
  links?:         Link;
  per_page?:      number;
  total?:         number;
  total_pages?:   number;
}

export class Link {
  next?:          string;
  previous?:      string;
}
