import { Action, Module, Mutation, VuexModule } from 'vuex-module-decorators';
import { Articulos, Articles } from './interfaces';
import { Mutations, Actions } from './enums/StoreEnums';
import Api from '@/helpers/Api';

@Module
export default class ArticulosModule extends VuexModule implements Articulos {
  articles = [] as Articles[];

  @Mutation
  [Mutations.SET_ARTICLE](data: Articles[]) {
    this.articles = data;
  }

  @Action
  async [Actions.GET_ALL_ARTICLE]() {
    return await Api.get("articulos").then((response) => {
      this.context.commit(Mutations.SET_ARTICLE, response.data);
    }).catch((error) => {
      console.log(error);
    });
  }

  get getArticles(): Articles[] {
    return this.articles;
  }
}
