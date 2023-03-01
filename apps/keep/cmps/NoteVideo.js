export default {
  props: ['info'],
  template: `
  <h1>{{info.title}}</h1>
     <iframe width="200" height="180" :src="info.url" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe>
   
  `,
}
