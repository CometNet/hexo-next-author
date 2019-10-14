/* global hexo */

'use strict';

const {i18n} = require('./i18n')(hexo, __dirname);

function createAuthorPostMeta(name) {
  let authors = hexo.theme.config.authors || {};
  let postMeta = `<span>${name}</span>`;
  let coauthor = authors[name];

  if (!coauthor) return postMeta;

  if (coauthor.nick) {
    postMeta = `<span>${coauthor.nick}</span>`;
  }
  if (coauthor.link) {
    postMeta = `<a href="${coauthor.link}">${postMeta}</a>`;
  }

  return postMeta;
}

hexo.extend.helper.register('coauthor_post_meta', function(names) {
  if (!Array.isArray(names)) {
    return createAuthorPostMeta(names);
  }
  return names.map(name => createAuthorPostMeta(name)).join(' ');
});

hexo.extend.filter.register('theme_inject', function(injects) {
  let authors = hexo.theme.config.authors || {};

  i18n('languages', 'author');

  injects.postMeta.raw('post-meta-coauthor', `
  {%- if post.author %}
  <span class="post-meta-item">
    <span class="post-meta-item-icon">
      <i class="fa fa-copyright"></i>
    </span>
    <span class="post-meta-item-text">{{ __('author') + __('symbol.colon') }}</span>
    {{- coauthor_post_meta(post.author) }}
  </span>
  {%- endif %}
  `, {}, {}, authors.post_meta_order);

});
