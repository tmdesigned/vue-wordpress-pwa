<template>
  <div id="app">

    <header class="site-header">
        <div class="home-title" v-if=" 'home' == $route.name ">
          <h1 class="site-title">Taylor Morgan</h1>
          <h3>@tmdesigned / Software Engineer</h3>
        </div>
      <nav id="nav" class="main-menu">
        <ul>
          <li class="hide-on-desktop">
            <linear-nav-button type="prev" />
          </li>
          <li>
            <router-link class="highlight-animation highlight-from-left" to="/" v-bind:class="{ 'active-link': 'home' == $route.name }" title="Home">
              <i class="fa fa-fw fa-home" aria-hidden="true"></i><span class="header-link-text link-text"> Home</span>
            </router-link>
          </li>
          <li>
            <router-link class="highlight-animation highlight-from-left" to="/about" v-bind:class="{ 'active-link': 'about' == $route.name }" title="About">
              <i class="fa fa-fw fa-info" aria-hidden="true"></i><span class="header-link-text link-text"> About</span>
            </router-link>
          </li>
          <li>
            <router-link class="highlight-animation highlight-from-left" to="/archive" v-bind:class="{ 'active-link': 'archive' == $route.name || 'post-home' == $route.name }" title="Archive">
              <i class="fa fa-fw fa-archive" aria-hidden="true"></i><span class="header-link-text link-text"> Archive</span>
            </router-link>
          </li>
          <li>
            <router-link class="highlight-animation highlight-from-left" to="/resume" v-bind:class="{ 'active-link': 'resume' == $route.name }" title="Resume">
              <i class="fa fa-fw fa-clock-o" aria-hidden="true"></i><span class="header-link-text link-text"> Resume</span>
            </router-link>
          </li>
          <li>
            <router-link class="highlight-animation highlight-from-left" to="/contact" v-bind:class="{ 'active-link': 'contact' == $route.name }" title="Contact">
              <i class="fa fa-fw fa-envelope" aria-hidden="true"></i><span class="header-link-text link-text"> Contact</span>
            </router-link>
          </li>
          <li class="hide-on-desktop">
            <linear-nav-button type="next" />
          </li>
        </ul>
      </nav> 
    </header>
    <div class="inner-content">
      <router-view :key="$route.fullPath" />
    </div>
    <div class="hide-on-mobile">
      <linear-nav />
    </div>
  </div>
</template>

<script>

import LinearNav from '@/components/LinearNav.vue';
import LinearNavButton from '@/components/LinearNavButton.vue';
import VueHead from 'vue-head';
import Vue from 'vue';

Vue.use( VueHead );



export default {
  components : {
    LinearNav,
    LinearNavButton
  },
  head: {
    title: function () {
      return {
        inner: "TMDesigned - Taylor Morgan Designed"
      }
    },
    meta: [
      { name: 'description', content: 'I\'m passionate about web development. Good web development. Websites that are crisp, clean, and run smoothly under the hood. This takes a diverse skill-set, and I love digging into new techniques and exploring what\'s new. See what I\'ve been digging into recently.', id: 'desc' }
    ]
  }
}

</script>

<style lang="scss">
  @import url('https://fonts.googleapis.com/css?family=Merriweather|Montserrat:400,400i,700,700i');
  @import url('https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css');
  
  $tablet : 672px;
  $desktop : 1185px;
  $desktopFromLeft : 1184px;

  body{
    margin: 0;
    box-sizing: border-box;
    word-break: break-word;
    font-family: 'Montserrat', sans-serif;
    line-height: 1.5;
  }

  body *{
    box-sizing: inherit;
    word-break: inherit;
  }

  h1 {
    font-family: 'Merriweather', serif;
  }

  img {
      max-width: 100%;
      height: auto;
  }

  a{
    text-decoration: none;
    &:link,&:visited{
      color: #333;
    }
    &:hover, &:active{

    }
  }

.hide-on-mobile{
  @media screen and (max-width: $desktopFromLeft ){
    display: none !important; 
  }
}

.hide-on-desktop{
  @media screen and (min-width: $desktop ){
    display: none !important;
  }
}

iframe, .table-overflow{
   overflow-x: scroll;
   max-width: 100%;
}

  pre{
    clear: both;
    background-color: #333;
    border: 0 !important;
    border-radius: 0 !important;
    color: #ccc;
    overflow-x: scroll;
    max-width: 100%;
    white-space: pre-wrap; 
  }
  article a{
    position: relative;
    text-decoration: underline;

    &:link,&:visited{
    }
    &:hover, &:active{
    }
  }
  

  #app {
    padding-bottom: 6em;
    @media screen and (min-width: $desktop){
      display: flex;
    }
  }



.arrow-text-left,
.arrow-text-right{
  text-transform:uppercase;
}
  .arrow-text-left{
    padding-left:.5em;
  }
  .arrow-text-right{
    padding-right:.5em;
  }

.linear-nav a{
  padding: .25em;
}

.linear-nav-button-inner{
  display:flex;
}

.linear-nav-next .link-text{
  order: -1;
}

  .linear-nav-prev, .linear-nav-next {
    @media screen and (min-width: $tablet){
        position: fixed;
        font-size:120%;
        top: 50%;
        transform: translateY( -50% );
        z-index: 5;
        padding: 1em;
    }
  }

  .linear-nav-prev {
      left: 0;
  }

  .linear-nav-next {
      right: 0;
  }

  .inner-content{
    max-width:100%;
    margin-left:.5em;
    margin-right:.5em;
    margin-top: 100px;
    @media screen and (min-width: $tablet){
      max-width: 32em;
      margin-left: auto;
      flex-grow: 1;
      margin-right: auto;
    }
    @media screen and (min-width: $desktop){
      max-width: 48em;
    }
  }

  header.site-header {
    position: fixed;
    background-color: #fff;
    padding-top: 1em;
    padding-bottom: 1em;
    font-size: 150%;
    left: 0;
    right: 0;
    top: 0;
    z-index:10;
    display: flex;
    flex-direction: column-reverse;
    @media screen and (min-width: $desktop){
      flex-direction: column;
      top: 1em;
      left: 2em;
      right: auto;
      flex-shrink: 0;
      background-color: transparent;
    }
  }

.site-header .linear-nav-button-inner {
    display: block;
}

.main-menu .highlight-animation {
  @media screen and (min-width: $desktop){
    display: inline-flex;
    align-items: center;
    gap: .4em;
  }
}

/* Nav links (header menu, Start/Prev/Next buttons) on desktop: titles always visible, hover emphasises the link instead */
.linear-nav-button-inner.highlight-animation {
  @media screen and (min-width: $desktop){
    align-items: center;
  }
}

.main-menu .highlight-animation .link-text,
.linear-nav-button-inner.highlight-animation .link-text {
  @media screen and (min-width: $desktop){
    opacity: .6;
    transition: opacity .3s;
  }
}

.main-menu .highlight-animation:hover .link-text,
.linear-nav-button-inner.highlight-animation:hover .link-text {
  @media screen and (min-width: $desktop){
    opacity: 1;
  }
}

.home-title {
    text-align: center;
    margin-top: 100px;
    @media screen and (min-width: $desktop){
      margin-top: 0;
      text-align:left;
    }
}

  .pagination-area{
    text-align: center;
  }

  .pagination{
    display: inline-flex;
    justify-content: space-between;
    margin: 1em auto;
    max-width:99%;
  }

  .archive-jump{
      display: flex;
      align-items: center;
      justify-content: center;
      gap: .5em;
      margin-bottom: 1em;
      flex-wrap: wrap;
    }
  .archive-jump-input{
      width: 4.5em;
    }
  .pagination-row{
      position: relative;
      display: flex;
      justify-content: center;
      align-items: center;
      /* fixed height so the toggle sits in the same place in list and gallery views */
      height: 3.5em;
    }
  .view-toggle-button{
      position: absolute;
      right: 0;
      top: 50%;
      transform: translateY(-50%);
      background: none;
      border: 0;
      padding: .25em .5em;
      font-size: 110%;
      color: #888;
      cursor: pointer;
      &:hover, &:focus{
        color: #333;
      }
    }
  ul.post-gallery{
      display: grid;
      grid-template-columns: repeat(2, 1fr);
      gap: .5em;
      @media screen and (min-width: $desktop){
        grid-template-columns: repeat(3, 1fr);
      }
    }
  .gallery-item{
      position: relative;
      display: block;
      aspect-ratio: 1 / 1;
      overflow: hidden;
      .gallery-image{
        width: 100%;
        height: 100%;
        background-size: cover;
        background-position: center center;
        transition: transform .3s;
      }
      .gallery-title{
        position: absolute;
        inset: 0;
        display: flex;
        align-items: center;
        justify-content: center;
        padding: .5em;
        text-align: center;
        color: #fff;
        background-color: rgba(0,0,0,.6);
        opacity: 0;
        transition: opacity .3s;
      }
      &:hover .gallery-title,
      &:focus .gallery-title{
        opacity: 1;
      }
      &:hover .gallery-image{
        transform: scale(1.05);
      }
    }
  .archive-nav{
      padding-left: 1em;
      padding-right: 1em;
      width: 300px;
      flex-shrink: 0;
      text-align: center;
      white-space: nowrap;
    }

  .disabled{
    color: #ddd;
    cursor: not-allowed;
  }

  .archive-next-page{
    margin-left:auto;
  }

  .main-menu {
      display: flex;
      
      @media screen and (min-width: $desktop){
        display:block;
      }
  }


  .main-menu ul {
    padding: 0;
    list-style: none;
    display: flex;
    margin: 0;
    justify-content: space-around;
    flex-wrap: wrap;
    width: 100%;
    @media screen and (min-width: $desktop){
      flex-direction: column;
      width: auto;
      align-items: flex-start;
    }
  }

  .main-menu ul li{
    @media screen and (min-width: $desktop){
      margin-bottom:1em;
            display: inline-block;

    }
  }

  .highlight-animation{
      position: relative;
      .link-text{
        opacity:0;
        display: none;
        @media screen and (min-width: $desktop){
          display:inline;
        }
      }
      &:hover{
        @media screen and (min-width: $desktop ){
          .link-text{
            opacity: 1;
            transition: .3s;
          }
        }
      }  
      &:hover::before{
        transform: scaleX(1);
      }
      &.disabled:hover::before{
        transform: scaleX(0);
      }
      &::before{
        content: " ";
        position: absolute;
        z-index: -1;
        background-color: #eee;
        top: -5px;
        bottom: -5px;
        transform: scaleX(0);
        transition-property: transform;
        transition-duration: 0.3s;
        transition-timing-function: ease-out;
      }

      /* Priority of slide from bottom effect when at top menu on mobile, 
         and always highlight active link on mobile (desktop has the labels instead) */
      @media screen and (max-width : $desktopFromLeft ){
        &.active-link::before{
          transform: scaleX(1) scaleY(1) !important;
        }
        .site-header &{
          &::before{
            transform: scaleX(1) scaleY(0);
            transform-origin: 50% 100%;
            top: 0;
            bottom: 0;
            left: 0px;
            right: 0px;
          }
          &:hover::before{
            transform: scaleX(1) scaleY(1);
          }
        }
      }
      
  }

  .highlight-shutter-out{
    &::before{
      top:0px;
      bottom:0px;
      left:0px;
      right:0px;
      transform-origin: 50%;
    }
  }

  .highlight-from-left{
      &::before{
        right: -10%;
        left: -2px;
        transform-origin: 0 50%;
      }
  }

  .highlight-from-right{
      &::before{
        left: -2px;
        right: -10%;
        transform-origin: 100% 50%;
      }
  }

  .main-menu a {
    // box-shadow: 0px 3px 3px -2px rgba(0,0,0,.1);
    padding: 0 .3em .3em .3em;
    border-bottom: 1px solid #eee;

    @media screen and (min-width: $desktop){
      padding: .25em;
      border-bottom: 0;
      box-shadow: none;
      
      &::after{
        content: "\A";
      }
    }
  }

  .post-featured-image {
    margin-bottom: 2em;
    max-width: 100%;
    text-align:center;
    margin: 2em 0;
    @media screen and (min-width: $tablet ){
      float: right;
      max-width: 50%;
      padding: 0 0 1.5em 2.5em;
      margin: 0;
      /* height: auto; */
    }
  }

  .post-title-area{
    h1{
      margin-top: 0;
    }
    margin-bottom: 1.5em;
    @media screen and (min-width: $tablet ){
      float: left;
      max-width: 50%;
      /* height: auto; */
    }    
  }

  article{
    clear:left;
  }

  article p{
    text-align: justify;
  }

  .sub-info {
    font-size: 90%;
    letter-spacing: 1px;
    text-transform: uppercase;
  }

ul.post-list {
    list-style: none;
    padding-left: 0;
}

article.post-list-item {
    display: flex;
    justify-content: space-between;
    flex-direction: column;
    cursor: pointer;
    margin: 2em .25em;
    padding: 1em;
    @media screen and (min-width: $tablet ){
      flex-direction: row;
    }
}

.post-list-item h3{
  @media screen and (min-width: $tablet ){
    margin-top:0;
  }
}

.post-thumbnail {
    background-size: cover;
    background-position: center center;
    flex-basis: 200px;
    @media screen and (min-width: $tablet ){
          flex-basis: 50%;
    }
    @media screen and (min-width: $desktop ){
          flex-basis: 30%;
    }
}

.post-date{
  margin: 1em 0;
}

.post-details {
    flex-basis: auto;
    @media screen and (min-width: $tablet ){
          flex-basis: 45%;
    }
    @media screen and (min-width: $desktop ){
          flex-basis: 65%;
    }
}

.button{
  cursor: pointer;
}

ul.related-posts {
    list-style: none;
    padding-left: 0;
}

li.related-post {
    margin: 1em;
}

.related-post .post-title {
    font-weight: bold;
}

.related-posts-area {
    padding: 1em;
    background-color: #f0f0f0;
    margin: 4em 0 2em 0;
}

</style>
