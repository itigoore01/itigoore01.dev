import type { PlopTypes } from '@turbo/gen';

export default function generator(plop: PlopTypes.NodePlopAPI) {
  plop.setGenerator('post', {
    description: 'Adds a new post',
    prompts: [
      {
        type: 'input',
        name: 'slug',
        message: 'What is the slug of the post?',
      },
    ],
    actions: [
      {
        type: 'add',
        path: 'src/app/posts/contents/{{ kebabCase slug }}/post.tsx',
        templateFile: 'templates/post.hbs',
        data: {
          date: new Date().toISOString(),
        },
      },
      {
        type: 'add',
        skipIfExists: true,
        path: 'src/app/posts/contents/index.ts',
        templateFile: 'templates/index.hbs',
      },
      {
        type: 'add',
        skipIfExists: true,
        path: 'src/app/posts/contents/post-meta.ts',
        templateFile: 'templates/post-meta.hbs',
      },
      {
        type: 'append',
        path: 'src/app/posts/contents/index.ts',
        pattern: /> = {(?<insertion>)/gs,
        template:
          "  '{{ kebabCase slug }}': () => import('./{{ kebabCase slug }}/post'),",
      },
    ],
  });
}
