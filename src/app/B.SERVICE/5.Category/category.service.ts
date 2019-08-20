import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {CategoryInfor} from '../../A.MODEL/1.Request/CategoryManager/Category-Infor';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {
  private categoryUrl = 'http://localhost:8080/api/category/';

  constructor(private http: HttpClient) {
  }

  getCategory(): Observable<CategoryInfor[]> {
    return this.http.get<CategoryInfor[]>(this.categoryUrl);
  }
}
