export class QueryInput {
  page?:            number; // 1
  perPage?:         number; // 20
  orderBy?:         string; // orderBy=id
  sortedBy?:        string; // sortedBy=desc
  include?:         string; // include=branch,image

  search?:          string; // search=age:17;email:john@gmail.com
  searchFields?:    string; // searchFields=name:like;email:=
  searchJoin?:      string; // searchJoin=and

  constructor(
    page?:          number,
    perPage?:       number,
    orderBy?:       string,
    sortedBy?:      string,
    include?:       string,

    search?:        string,
    searchFields?:  string,
    searchJoin?:    string
  ) {
    if (page          != null) { this.page          = page;         }
    if (perPage       != null) { this.perPage       = perPage;      }
    if (orderBy       != null) { this.orderBy       = orderBy;      }
    if (sortedBy      != null) { this.sortedBy      = sortedBy;     }
    if (include       != null) { this.include       = include;      }

    if (search        != null) { this.search        = search;       }
    if (searchFields  != null) { this.searchFields  = searchFields; }
    if (searchJoin    != null) { this.searchJoin    = searchJoin;   }
  }
}
