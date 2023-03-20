import { Action, Module, Mutation, VuexModule } from 'vuex-module-decorators';
import { Articulos, Articles, Article, ParamsUpdateArticle, ParamsArticle } from './interfaces';
import { Mutations, Actions } from './enums/StoreEnums';
import Api from '@/helpers/Api';
import Swal from 'sweetalert2';

@Module
export default class ArticulosModule extends VuexModule implements Articulos {
  articles = [] as Articles[];
  article = {} as Article;

  @Mutation
  [Mutations.SET_ARTICLES](data: Articles[]) {
    this.articles = data;
  }

  @Mutation
  [Mutations.SET_ARTICLE](data: Article) {
    this.article = data;
  }

  @Action
  async [Actions.GET_ALL_ARTICLE]() {
    return await Api.get("articulos").then((response) => {
      this.context.commit(Mutations.SET_ARTICLES, response.data);
    }).catch((error) => {
      console.log(error);
    });
  }

  @Action
  async [Actions.SAVE_ARTICLE](params: ParamsArticle) {
    return await Api.post("articulos", params).then((response) => {
      Swal.fire({
        title: "El articulo se ha guardado correctamente",
        icon: "success",
      });
    }).catch((error) => {
      console.log(error);
    });
  }

  @Action
  async [Actions.GET_ARTICLE](params: { id: number; }) {
    return await Api.get(`articulos/${params.id}`).then((response) => {
      this.context.commit(Mutations.SET_ARTICLE, response.data);
    }).catch((error) => {
      console.log(error);
    });
  }

  @Action
  async [Actions.UPDATE_ARTICLE](params: ParamsUpdateArticle) {
    return await Api.put(`articulos/${params.id}`, params).then((response) => {
      Swal.fire({
        title: "El articulo se ha actualizado correctamente",
        icon: "success",
      });
    }).catch((error) => {
      console.log(error);
    });
  }

  @Action
  async [Actions.DELETE_ARTICLE](params: { id: number; }) {
    return await Api.delete(`articulos/${params.id}`).then((response) => {
      Swal.fire({
        title: "El articulo se ha eliminado correctamente",
        icon: "success",
      });
    }).catch((error) => {
      console.log(error);
    });
  }

  get getArticles(): Articles[] {
    return this.articles;
  }

  get getArticulos(): Article {
    return this.article;
  }
}
