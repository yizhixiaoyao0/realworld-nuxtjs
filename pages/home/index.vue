<template>
  <div class="home-page">
    <div class="banner">
      <div class="container">
        <h1 class="logo-font">conduit</h1>
        <p>A place to share your knowledge.</p>
      </div>
    </div>

    <div class="container page">
      <div class="row">
        <div class="col-md-9">
          <div class="feed-toggle">
            <ul class="nav nav-pills outline-active">
              <li class="nav-item" v-if='user'>
                <nuxt-link class="nav-link" :class='{active: tab === "your_feed"}' :to='{
                  name: "home",
                  query: {
                    tab: "your_feed"
                  }
                }'>Your Feed</nuxt-link>
              </li>
              <li class="nav-item">
                <nuxt-link class="nav-link" :class='{active: tab === "global_feed"}' :to='{
                  name: "home",
                }'>Global Feed</nuxt-link>
              </li>
              <li class="nav-item" v-if='tag'>
                <nuxt-link class="nav-link" :class='{active: tab === tag}' :to='{
                  name: "home",
                  query: {
                    tab: tag,
                    tag: tag
                  }
                }'># {{tag}}</nuxt-link>
              </li>
            </ul>
          </div>

          <div
            class="article-preview"
            v-for="article in articles"
            :key="article.slug"
          >
            <div class="article-meta">
              <nuxt-link
                :to="{
                  name: 'profile',
                  params: {
                    username: article.author.username,
                  },
                }"
                ><img :src="article.author.image"
              /></nuxt-link>
              <div class="info">
                <nuxt-link
                  :to="{
                    name: 'profile',
                    params: {
                      username: article.author.username,
                    },
                  }"
                  class="author"
                  >{{ article.author.username }}</nuxt-link
                >
                <span class="date">{{ article.createdAt | data('MMM DDM, YYYY')}}</span>
              </div>
              <button
                class="btn btn-outline-primary btn-sm pull-xs-right"
                :class="{ active: article.favorited }"
                :disabled='article.favoriteDisabled'
                @click='onFavorite'
              >
                <i class="ion-heart"></i> {{ article.favoritesCount }}
              </button>
            </div>
            <nuxt-link
              :to="{
                name: 'article',
                params: {
                  slug: article.slug,
                },
              }"
              class="preview-link"
            >
              <h1>{{ article.title }}</h1>
              <p>{{ article.description }}</p>
              <span>Read more...</span>
            </nuxt-link>
          </div>

          <nav>
            <ul class="pagination">
              <li
                class="page-item"
                v-for='item in totalPage'
                :key='item'
                :class='{active: item === page}'
              >
                <nuxt-link class="page-link ng-binding" :to='{
                  name: "home",
                  query: {
                    page: item,
                    tag: $route.query.tag,
                    tab: tab
                  }
                }'>{{item}}</nuxt-link>
              </li>
            </ul>
          </nav>
        </div>

        <div class="col-md-3">
          <div class="sidebar">
            <p>Popular Tags</p>

            <div class="tag-list">
              <nuxt-link :to='{
                name: "home",
                query: {
                  tab: "tag",
                  tag: item,
                }
              }' class="tag-pill tag-default" v-for='item in tags' :key='item'>
                {{item}}
              </nuxt-link>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { 
  getArticles,
  getYourFeedArticles,
  addFavorite,
  deleteFavorite 
} from "@/api/article";
import {getTags} from '@/api/tag';
import { mapState } from 'vuex'

export default {
  name: "HomeIndex",
  async asyncData({query}) {
    const page = Number.parseInt(query.page || 1);
    const limit = 10;
    const tab = query.tab || 'global_feed';
    const tag = query.tag;
    const loadArticles = tab === 'global_feed' ? getArticles : getYourFeedArticles;

    const [ articleRes, tagRes] = await Promise.all([
      loadArticles({
        limit: limit,
        offset: (page - 1) * limit,
        tag
      }),
      getTags()
    ])

    const {articles, articlesCount} = articleRes.data;

    const { tags } = tagRes.data;

    return {
      articles,
      articlesCount,
      limit,
      page,
      tags,
      tab,
      tag
    };
  },
  methods: {
    async onFavorite(article) {
      article.favoriteDisabled = true;
      if(article.favorited) {
        await deleteFavorite(article.slug);
        article.favorited = false;
        article.favoriteCount +=-1;
      } else {
        await addFavorite(article.slug);
        article.favorited = true;
        article.favoriteCount += 1;
      }

      article.favoriteDisabled = false;
    }
  },
  watchQuery: ['page', 'tag', 'tab'],
  computed: {
    ...mapState(['user']),
    totalPage() {
      return Math.ceil(this.articlesCount / this.limit)
    }
  }
};
</script>
